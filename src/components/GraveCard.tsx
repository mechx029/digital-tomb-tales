
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share, Copy, Heart, MessageSquare } from 'lucide-react';
import { Grave } from '@/data/mockGraves';
import { useToast } from '@/hooks/use-toast';

interface GraveCardProps {
  grave: Grave;
  onClick?: () => void;
  className?: string;
}

const GraveCard: React.FC<GraveCardProps> = ({ grave, onClick, className = '' }) => {
  const { toast } = useToast();
  const [reactions, setReactions] = useState(grave.reactions);
  const [hasReacted, setHasReacted] = useState<string | null>(null);

  const handleReaction = (type: keyof typeof reactions, emoji: string) => {
    if (hasReacted === type) {
      // Remove reaction
      setReactions(prev => ({
        ...prev,
        [type]: prev[type] - 1
      }));
      setHasReacted(null);
    } else {
      // Add new reaction, remove old if exists
      setReactions(prev => {
        const newReactions = { ...prev };
        if (hasReacted) {
          newReactions[hasReacted] -= 1;
        }
        newReactions[type] += 1;
        return newReactions;
      });
      setHasReacted(type);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/grave/${grave.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `RIP: ${grave.title}`,
          text: grave.epitaph,
          url: url,
        });
      } catch (error) {
        // Fallback to copy
        await copyToClipboard(url);
      }
    } else {
      await copyToClipboard(url);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Grave link copied! 💀",
        description: "Share this digital burial with the world",
      });
    } catch (error) {
      toast({
        title: "Failed to copy link",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <Card 
      className={`tombstone-shadow hover:ghost-glow transition-all duration-300 cursor-pointer bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 ${className}`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🪦</span>
              {grave.featured && (
                <Badge className="bg-accent text-accent-foreground pulse-glow">
                  Featured
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs">
                {grave.category}
              </Badge>
            </div>
            <h3 className="font-bold text-lg text-foreground leading-tight">
              {grave.title}
            </h3>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground flex items-center gap-4">
          <span>By {grave.author}</span>
          <span>•</span>
          <span>{formatTimestamp(grave.timestamp)}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-foreground/90 italic mb-4 leading-relaxed">
          "{grave.epitaph}"
        </p>

        {/* Reactions */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-2 ${hasReacted === 'skull' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={(e) => {
                e.stopPropagation();
                handleReaction('skull', '💀');
              }}
            >
              💀 {reactions.skull}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-2 ${hasReacted === 'fire' ? 'bg-accent/20 text-accent' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={(e) => {
                e.stopPropagation();
                handleReaction('fire', '🔥');
              }}
            >
              🔥 {reactions.fire}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-2 ${hasReacted === 'crying' ? 'bg-blue-500/20 text-blue-400' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={(e) => {
                e.stopPropagation();
                handleReaction('crying', '😭');
              }}
            >
              😭 {reactions.crying}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-2 ${hasReacted === 'clown' ? 'bg-yellow-500/20 text-yellow-400' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={(e) => {
                e.stopPropagation();
                handleReaction('clown', '🤡');
              }}
            >
              🤡 {reactions.clown}
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{totalReactions} reactions</span>
            <span>•</span>
            <span>{grave.shares} shares</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="text-primary hover:text-primary/80"
          >
            <Share className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraveCard;

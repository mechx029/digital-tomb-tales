
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
  style?: React.CSSProperties;
}

const GraveCard: React.FC<GraveCardProps> = ({ grave, onClick, className = '', style }) => {
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
      className={`group relative tombstone-shadow hover:ghost-glow transition-all duration-500 cursor-pointer bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border-slate-700/50 hover:border-green-500/50 overflow-hidden transform hover:scale-105 hover:-translate-y-2 ${className}`}
      onClick={onClick}
      style={style}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Floating spirits animation */}
      <div className="absolute -top-4 -right-4 text-2xl opacity-20 group-hover:opacity-60 transition-all duration-700 group-hover:animate-bounce">
        👻
      </div>
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl animate-pulse group-hover:animate-bounce">🪦</span>
              {grave.featured && (
                <Badge className="bg-red-600/80 text-red-100 pulse-glow animate-pulse">
                  ⚰️ Featured
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs bg-slate-700/50 text-slate-300 border-slate-600">
                {grave.category}
              </Badge>
            </div>
            <h3 className="font-bold text-xl text-slate-100 leading-tight group-hover:text-green-400 transition-colors duration-300">
              {grave.title}
            </h3>
          </div>
        </div>
        
        <div className="text-sm text-slate-400 flex items-center gap-4">
          <span>By {grave.author}</span>
          <span>•</span>
          <span>{formatTimestamp(grave.timestamp)}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0 relative z-10">
        <div className="relative p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 mb-4">
          <div className="absolute top-2 left-2 text-6xl opacity-10">"</div>
          <p className="text-slate-200 italic leading-relaxed text-center relative z-10 font-medium">
            {grave.epitaph}
          </p>
          <div className="absolute bottom-2 right-2 text-6xl opacity-10 rotate-180">"</div>
        </div>

        {/* Enhanced Reactions */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            className={`h-10 px-3 transition-all duration-300 transform hover:scale-110 ${
              hasReacted === 'skull' 
                ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/25' 
                : 'text-slate-400 hover:text-green-400 hover:bg-green-500/10'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleReaction('skull', '💀');
            }}
          >
            <span className="text-lg mr-1">💀</span>
            {reactions.skull}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className={`h-10 px-3 transition-all duration-300 transform hover:scale-110 ${
              hasReacted === 'fire' 
                ? 'bg-red-500/20 text-red-400 shadow-lg shadow-red-500/25' 
                : 'text-slate-400 hover:text-red-400 hover:bg-red-500/10'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleReaction('fire', '🔥');
            }}
          >
            <span className="text-lg mr-1">🔥</span>
            {reactions.fire}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className={`h-10 px-3 transition-all duration-300 transform hover:scale-110 ${
              hasReacted === 'crying' 
                ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/25' 
                : 'text-slate-400 hover:text-blue-400 hover:bg-blue-500/10'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleReaction('crying', '😭');
            }}
          >
            <span className="text-lg mr-1">😭</span>
            {reactions.crying}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className={`h-10 px-3 transition-all duration-300 transform hover:scale-110 ${
              hasReacted === 'clown' 
                ? 'bg-yellow-500/20 text-yellow-400 shadow-lg shadow-yellow-500/25' 
                : 'text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleReaction('clown', '🤡');
            }}
          >
            <span className="text-lg mr-1">🤡</span>
            {reactions.clown}
          </Button>
        </div>

        {/* Enhanced Actions */}
        <div className="flex items-center justify-between border-t border-slate-700/30 pt-4">
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <span className="text-red-400">❤️</span>
              {totalReactions} reactions
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Share className="w-3 h-3" />
              {grave.shares} shares
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="text-green-400 hover:text-green-300 hover:bg-green-500/10 transition-all duration-300 transform hover:scale-105"
          >
            <Share className="w-4 h-4 mr-1" />
            Share Grave
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraveCard;

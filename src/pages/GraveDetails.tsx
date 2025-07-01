
import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { mockGraves } from '@/data/mockGraves';
import { Share, Copy, ArrowLeft, ExternalLink } from 'lucide-react';

const GraveDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get grave from params or from location state (for new burials)
  const grave = location.state?.newGrave || mockGraves.find(g => g.id === id);
  const showSharePrompt = location.state?.showSharePrompt;
  
  const [reactions, setReactions] = useState(grave?.reactions || { skull: 0, fire: 0, crying: 0, clown: 0 });
  const [hasReacted, setHasReacted] = useState<string | null>(null);
  const [shareCount, setShareCount] = useState(grave?.shares || 0);

  if (!grave) {
    return (
      <div className="min-h-screen cemetery-bg flex items-center justify-center">
        <Card className="bg-card/80 backdrop-blur-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Grave Not Found</h2>
          <p className="text-muted-foreground mb-6">
            This digital burial doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/graveyard')}>
            Browse Other Graves
          </Button>
        </Card>
      </div>
    );
  }

  const handleReaction = (type: keyof typeof reactions) => {
    if (hasReacted === type) {
      setReactions(prev => ({
        ...prev,
        [type]: prev[type] - 1
      }));
      setHasReacted(null);
    } else {
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

  const graveUrl = `${window.location.origin}/grave/${grave.id}`;

  const handleShare = async (platform?: string) => {
    const shareText = `RIP: ${grave.title} - ${grave.epitaph}`;
    
    if (platform === 'twitter') {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(graveUrl)}&hashtags=InternetGraveyard,RIP`;
      window.open(twitterUrl, '_blank');
    } else if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(graveUrl);
        toast({
          title: "Link copied! 💀",
          description: "Share this grave with the world",
        });
      } catch (error) {
        toast({
          title: "Failed to copy link",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: `RIP: ${grave.title}`,
          text: grave.epitaph,
          url: graveUrl,
        });
      } catch (error) {
        // Fallback to copy
        await handleShare('copy');
      }
    } else {
      await handleShare('copy');
    }
    
    setShareCount(prev => prev + 1);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen cemetery-bg">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Graveyard
        </Button>

        {/* Share Prompt for New Burials */}
        {showSharePrompt && (
          <Card className="bg-primary/10 border-primary/30 mb-8 pulse-glow">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-primary mb-2">
                  🎉 Burial Complete!
                </h3>
                <p className="text-foreground mb-4">
                  Your digital regret has been laid to rest. Share it with the world!
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button onClick={() => handleShare('twitter')} className="bg-blue-500 hover:bg-blue-600">
                    Share on X/Twitter
                  </Button>
                  <Button onClick={() => handleShare('copy')} variant="outline">
                    <Copy className="mr-2 w-4 h-4" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Grave Card */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 tombstone-shadow mb-8">
          <CardHeader className="text-center py-8">
            <div className="mb-6">
              <span className="text-8xl block mb-4 float-animation">🪦</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
              {grave.featured && (
                <Badge className="bg-accent text-accent-foreground pulse-glow">
                  ⭐ Featured
                </Badge>
              )}
              <Badge variant="secondary">
                {grave.category}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {grave.packageType} burial
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {grave.title}
            </h1>
            
            <div className="text-muted-foreground space-y-1">
              <p>Buried by <span className="font-medium">{grave.author}</span></p>
              <p>{formatTimestamp(grave.timestamp)}</p>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            {/* Epitaph */}
            <div className="text-center mb-8">
              <blockquote className="text-xl md:text-2xl italic text-foreground/90 leading-relaxed border-l-4 border-primary pl-6">
                "{grave.epitaph}"
              </blockquote>
            </div>

            {/* Image if available */}
            {grave.image && (
              <div className="mb-8 text-center">
                <img
                  src={grave.image}
                  alt="Burial memorial"
                  className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
                />
              </div>
            )}

            {/* Reactions */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Button
                variant="ghost"
                size="lg"
                className={`h-12 px-4 ${hasReacted === 'skull' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => handleReaction('skull')}
              >
                💀 {reactions.skull}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className={`h-12 px-4 ${hasReacted === 'fire' ? 'bg-accent/20 text-accent' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => handleReaction('fire')}
              >
                🔥 {reactions.fire}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className={`h-12 px-4 ${hasReacted === 'crying' ? 'bg-blue-500/20 text-blue-400' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => handleReaction('crying')}
              >
                😭 {reactions.crying}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className={`h-12 px-4 ${hasReacted === 'clown' ? 'bg-yellow-500/20 text-yellow-400' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => handleReaction('clown')}
              >
                🤡 {reactions.clown}
              </Button>
            </div>

            {/* Stats */}
            <div className="text-center text-muted-foreground mb-8">
              <span>{totalReactions} reactions</span>
              <span className="mx-2">•</span>
              <span>{shareCount} shares</span>
            </div>

            {/* Share Actions */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => handleShare('twitter')}
              >
                <ExternalLink className="mr-2 w-4 h-4" />
                Share on X/Twitter
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleShare('copy')}
              >
                <Copy className="mr-2 w-4 h-4" />
                Copy Link
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleShare()}
              >
                <Share className="mr-2 w-4 h-4" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Rest in Peace Footer */}
        <div className="text-center py-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-creepster text-2xl text-primary glow-text mb-4">
              Rest in Digital Peace
            </h2>
            <p className="text-muted-foreground mb-6">
              This burial is permanent and cannot be undone. 
              May this digital regret serve as a warning to others.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/bury')}
              className="border-primary/50 text-primary hover:bg-primary/10"
            >
              Bury Something Else
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraveDetails;

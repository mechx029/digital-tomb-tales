import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Share, ArrowLeft, Play } from 'lucide-react';
import CommentSection from '@/components/CommentSection';

interface GraveData {
  id: string;
  title: string;
  epitaph: string;
  category: string;
  image_url?: string;
  video_url?: string;
  created_at: string;
  featured: boolean;
  package_type: string;
  shares: number;
  profiles: {
    username: string;
    display_name?: string;
    avatar_url?: string;
  };
  reactions: Array<{
    id: string;
    reaction_type: 'skull' | 'fire' | 'crying' | 'clown';
    user_id: string;
  }>;
}

const GraveDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [grave, setGrave] = useState<GraveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [reactionCounts, setReactionCounts] = useState({
    skull: 0,
    fire: 0,
    crying: 0,
    clown: 0
  });
  const [userReaction, setUserReaction] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchGrave();
    }
  }, [id, user]);

  const fetchGrave = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('graves')
        .select(`
          *,
          profiles!inner(username, display_name, avatar_url),
          reactions(id, reaction_type, user_id)
        `)
        .eq('id', id)
        .eq('published', true)
        .single();

      if (error) throw error;

      setGrave(data);

      // Calculate reaction counts
      const counts = { skull: 0, fire: 0, crying: 0, clown: 0 };
      let currentUserReaction = null;

      data.reactions?.forEach((reaction: any) => {
        counts[reaction.reaction_type as keyof typeof counts]++;
        if (user && reaction.user_id === user.id) {
          currentUserReaction = reaction.reaction_type;
        }
      });

      setReactionCounts(counts);
      setUserReaction(currentUserReaction);
    } catch (error) {
      console.error('Error fetching grave:', error);
      setGrave(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReaction = async (type: 'skull' | 'fire' | 'crying' | 'clown') => {
    if (!user || !grave) {
      navigate('/auth');
      return;
    }

    try {
      if (userReaction === type) {
        // Remove reaction
        await supabase
          .from('reactions')
          .delete()
          .eq('grave_id', grave.id)
          .eq('user_id', user.id)
          .eq('reaction_type', type);
      } else {
        // Remove existing reaction first, then add new one
        await supabase
          .from('reactions')
          .delete()
          .eq('grave_id', grave.id)
          .eq('user_id', user.id);

        await supabase
          .from('reactions')
          .insert({
            grave_id: grave.id,
            user_id: user.id,
            reaction_type: type
          });
      }

      // Refresh grave data
      fetchGrave();
    } catch (error) {
      console.error('Error toggling reaction:', error);
      toast({
        title: "Failed to react",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `RIP: ${grave?.title}`,
          text: grave?.epitaph,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Grave link copied! 💀",
          description: "Share this digital burial with the world",
        });
      }

      // Update share count
      if (grave) {
        await supabase
          .from('graves')
          .update({ shares: grave.shares + 1 })
          .eq('id', grave.id);
        
        setGrave(prev => prev ? { ...prev, shares: prev.shares + 1 } : null);
      }
    } catch (error) {
      toast({
        title: "Failed to share",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <span className="text-8xl block mb-4 animate-pulse">⚰️</span>
          <p className="text-slate-400">Loading grave...</p>
        </div>
      </div>
    );
  }

  if (!grave) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <span className="text-8xl block mb-4">👻</span>
          <h1 className="text-3xl text-slate-200 mb-4">Grave Not Found</h1>
          <p className="text-slate-400 mb-6">This digital soul has vanished into the void</p>
          <Button onClick={() => navigate('/graveyard')} className="bg-green-600 hover:bg-green-500">
            Return to Graveyard
          </Button>
        </div>
      </div>
    );
  }

  const totalReactions = Object.values(reactionCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Floating elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-10 animate-float"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          >
            {['💀', '👻', '⚰️', '🕯️'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Graveyard
        </Button>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Grave Card */}
          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-slate-700/50 shadow-2xl">
            <CardHeader className="text-center py-8">
              <div className="mb-6 relative">
                <span className="text-8xl block mb-4 animate-pulse">🪦</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                {grave.featured && (
                  <Badge className="bg-red-600/80 text-red-100 pulse-glow animate-pulse">
                    ⚰️ Featured Burial
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600">
                  {grave.category}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4 leading-tight">
                {grave.title}
              </h1>
              
              <div className="text-slate-400 mb-6">
                Buried by <span className="text-green-400 font-medium">
                  {grave.profiles.display_name || grave.profiles.username}
                </span> • 
                <span className="ml-2">{new Date(grave.created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </CardHeader>

            <CardContent className="pb-8">
              {/* Media */}
              {(grave.image_url || grave.video_url) && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  {grave.image_url && (
                    <img 
                      src={grave.image_url}
                      alt={grave.title}
                      className="w-full max-h-96 object-cover"
                    />
                  )}
                  {grave.video_url && (
                    <video 
                      src={grave.video_url}
                      className="w-full max-h-96 object-cover"
                      controls
                      autoPlay
                      muted
                      loop
                    />
                  )}
                </div>
              )}

              {/* Epitaph */}
              <div className="relative p-8 bg-slate-800/50 rounded-lg border border-slate-700/30 mb-8">
                <div className="absolute top-4 left-4 text-8xl opacity-10">"</div>
                <p className="text-xl md:text-2xl text-slate-200 italic text-center leading-relaxed relative z-10 font-medium">
                  {grave.epitaph}
                </p>
                <div className="absolute bottom-4 right-4 text-8xl opacity-10 rotate-180">"</div>
              </div>

              {/* Reactions */}
              <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
                {(['skull', 'fire', 'crying', 'clown'] as const).map((type) => {
                  const emoji = { skull: '💀', fire: '🔥', crying: '😭', clown: '🤡' }[type];
                  const isActive = userReaction === type;
                  
                  return (
                    <Button
                      key={type}
                      variant="ghost"
                      size="lg"
                      className={`h-14 px-6 transition-all duration-300 transform hover:scale-110 ${
                        isActive 
                          ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/25' 
                          : 'text-slate-400 hover:text-green-400 hover:bg-green-500/10'
                      }`}
                      onClick={() => handleReaction(type)}
                    >
                      <span className="text-2xl mr-2">{emoji}</span>
                      {reactionCounts[type]}
                    </Button>
                  );
                })}
              </div>

              {/* Stats & Share */}
              <div className="flex items-center justify-between p-6 bg-slate-800/30 rounded-lg border border-slate-700/30">
                <div className="flex items-center gap-6 text-slate-400">
                  <span className="flex items-center gap-2">
                    <span className="text-red-400">❤️</span>
                    {totalReactions} reactions
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <Share className="w-4 h-4" />
                    {grave.shares} shares
                  </span>
                </div>
                
                <Button
                  onClick={handleShare}
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-lg shadow-green-500/25 transform transition-all duration-300 hover:scale-105"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share This Grave
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <CommentSection graveId={grave.id} />
        </div>
      </div>
    </div>
  );
};

export default GraveDetails;

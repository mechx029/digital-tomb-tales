
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { mockGraves, Grave } from '@/data/mockGraves';
import { Share, ArrowLeft, MessageSquare, Send } from 'lucide-react';

const GraveDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [grave, setGrave] = useState<Grave | null>(null);
  const [reactions, setReactions] = useState({
    skull: 0,
    fire: 0,
    crying: 0,
    clown: 0
  });
  const [hasReacted, setHasReacted] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Array<{
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }>>([]);

  useEffect(() => {
    if (id) {
      const foundGrave = mockGraves.find(g => g.id === id);
      if (foundGrave) {
        setGrave(foundGrave);
        setReactions(foundGrave.reactions);
        // Mock comments
        setComments([
          {
            id: '1',
            author: 'DeepWeb_Digger',
            content: 'RIP to another fallen dream 💀',
            timestamp: '2 hours ago'
          },
          {
            id: '2', 
            author: 'Anonymous_Soul',
            content: 'We\'ve all been there... may it rest in digital peace',
            timestamp: '4 hours ago'
          }
        ]);
      }
    }
  }, [id]);

  const handleReaction = (type: keyof typeof reactions) => {
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

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `RIP: ${grave?.title}`,
          text: grave?.epitaph,
          url: url,
        });
      } catch (error) {
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

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;
    
    const newComment = {
      id: Date.now().toString(),
      author: 'You',
      content: comment,
      timestamp: 'just now'
    };
    
    setComments(prev => [newComment, ...prev]);
    setComment('');
    toast({
      title: "Memorial message added 🕯️",
      description: "Your words have been etched in digital stone",
    });
  };

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

  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);

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

        <div className="max-w-4xl mx-auto">
          {/* Main Grave Card */}
          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-slate-700/50 shadow-2xl mb-8">
            <CardHeader className="text-center py-8">
              <div className="mb-6 relative">
                <span className="text-8xl block mb-4 animate-pulse">🪦</span>
                <div className="absolute -top-4 -left-8 text-4xl animate-float opacity-40">
                  ⚰️
                </div>
                <div className="absolute -top-2 -right-6 text-3xl animate-float opacity-30" style={{ animationDelay: '1s' }}>
                  🕯️
                </div>
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
                Buried by <span className="text-green-400 font-medium">{grave.author}</span> • 
                <span className="ml-2">{new Date(grave.timestamp).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </CardHeader>

            <CardContent className="pb-8">
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
                <Button
                  variant="ghost"
                  size="lg"
                  className={`h-14 px-6 transition-all duration-300 transform hover:scale-110 ${
                    hasReacted === 'skull' 
                      ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/25' 
                      : 'text-slate-400 hover:text-green-400 hover:bg-green-500/10'
                  }`}
                  onClick={() => handleReaction('skull')}
                >
                  <span className="text-2xl mr-2">💀</span>
                  {reactions.skull}
                </Button>
                
                <Button
                  variant="ghost"
                  size="lg"
                  className={`h-14 px-6 transition-all duration-300 transform hover:scale-110 ${
                    hasReacted === 'fire' 
                      ? 'bg-red-500/20 text-red-400 shadow-lg shadow-red-500/25' 
                      : 'text-slate-400 hover:text-red-400 hover:bg-red-500/10'
                  }`}
                  onClick={() => handleReaction('fire')}
                >
                  <span className="text-2xl mr-2">🔥</span>
                  {reactions.fire}
                </Button>
                
                <Button
                  variant="ghost"
                  size="lg"
                  className={`h-14 px-6 transition-all duration-300 transform hover:scale-110 ${
                    hasReacted === 'crying' 
                      ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/25' 
                      : 'text-slate-400 hover:text-blue-400 hover:bg-blue-500/10'
                  }`}
                  onClick={() => handleReaction('crying')}
                >
                  <span className="text-2xl mr-2">😭</span>
                  {reactions.crying}
                </Button>
                
                <Button
                  variant="ghost"
                  size="lg"
                  className={`h-14 px-6 transition-all duration-300 transform hover:scale-110 ${
                    hasReacted === 'clown' 
                      ? 'bg-yellow-500/20 text-yellow-400 shadow-lg shadow-yellow-500/25' 
                      : 'text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10'
                  }`}
                  onClick={() => handleReaction('clown')}
                >
                  <span className="text-2xl mr-2">🤡</span>
                  {reactions.clown}
                </Button>
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
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <h2 className="text-2xl font-bold text-slate-200 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-blue-400" />
                Memorial Messages ({comments.length})
              </h2>
            </CardHeader>
            <CardContent>
              {/* Add Comment */}
              <div className="mb-8">
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Leave a memorial message for this digital soul..."
                  rows={3}
                  className="bg-slate-900/50 border-slate-600 text-slate-200 placeholder-slate-500 focus:border-green-500 focus:ring-green-500/20 mb-4"
                />
                <Button
                  onClick={handleCommentSubmit}
                  disabled={!comment.trim()}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Add Memorial Message
                </Button>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-slate-900/30 rounded-lg border border-slate-700/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-green-400">{comment.author}</span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-slate-300">{comment.content}</p>
                  </div>
                ))}
                
                {comments.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <span className="text-4xl block mb-2">🕯️</span>
                    No memorial messages yet. Be the first to pay respects.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GraveDetails;

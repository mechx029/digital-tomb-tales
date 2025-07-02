
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Send, MessageSquare } from 'lucide-react';
import { useComments, Comment } from '@/hooks/useComments';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CommentSectionProps {
  graveId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ graveId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { comments, loading, addComment } = useComments(graveId);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Sign in required 👻",
        description: "Please sign in to leave a memorial message",
        variant: "destructive",
      });
      return;
    }

    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      await addComment(newComment.trim());
      setNewComment('');
      toast({
        title: "Memorial message added 🕯️",
        description: "Your words have been etched in digital stone",
      });
    } catch (error) {
      toast({
        title: "Failed to add message",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-slate-200 flex items-center gap-3 mb-6">
          <MessageSquare className="w-6 h-6 text-blue-400" />
          Memorial Messages ({comments.length})
        </h3>

        {/* Add Comment Form */}
        {user ? (
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex items-start gap-4">
              <Avatar className="w-10 h-10 border-2 border-slate-600">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-slate-700 text-slate-300">
                  {user.email?.[0]?.toUpperCase() || '👻'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Leave a memorial message for this digital soul..."
                  rows={3}
                  className="bg-slate-900/50 border-slate-600 text-slate-200 placeholder-slate-500 focus:border-green-500 focus:ring-green-500/20 mb-3"
                />
                <Button
                  type="submit"
                  disabled={!newComment.trim() || submitting}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {submitting ? 'Adding...' : 'Add Memorial Message'}
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 mb-8 bg-slate-900/30 rounded-lg border border-slate-700/30">
            <p className="text-slate-400 mb-4">Sign in to leave a memorial message</p>
            <Button
              onClick={() => window.location.href = '/auth'}
              variant="outline"
              className="border-green-500/50 text-green-400 hover:bg-green-500/10"
            >
              Sign In
            </Button>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {loading ? (
            // Loading skeleton
            [...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-slate-900/30 rounded-lg animate-pulse">
                <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-slate-700 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-slate-700 rounded w-full mb-1"></div>
                  <div className="h-3 bg-slate-700 rounded w-2/3"></div>
                </div>
              </div>
            ))
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-4 p-4 bg-slate-900/30 rounded-lg border border-slate-700/30 hover:bg-slate-900/50 transition-colors">
                <Avatar className="w-10 h-10 border-2 border-slate-600">
                  <AvatarImage src={comment.profiles.avatar_url} />
                  <AvatarFallback className="bg-slate-700 text-slate-300">
                    {comment.profiles.display_name?.[0] || comment.profiles.username[0] || '👻'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-green-400">
                      {comment.profiles.display_name || comment.profiles.username}
                    </span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-500">
                      {formatTimestamp(comment.created_at)}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-500">
              <span className="text-4xl block mb-3">🕯️</span>
              <p>No memorial messages yet.</p>
              <p className="text-sm mt-1">Be the first to pay respects.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentSection;

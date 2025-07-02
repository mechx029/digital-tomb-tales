
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  grave_id: string;
  parent_id?: string;
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

export const useComments = (graveId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (graveId) {
      fetchComments();

      // Set up real-time subscription
      const channel = supabase
        .channel(`comments-${graveId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'comments',
            filter: `grave_id=eq.${graveId}`
          },
          () => fetchComments()
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'comment_reactions'
          },
          () => fetchComments()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [graveId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles!inner(username, display_name, avatar_url),
          comment_reactions(id, reaction_type, user_id)
        `)
        .eq('grave_id', graveId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content: string, parentId?: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          content,
          grave_id: graveId,
          user_id: user.id,
          parent_id: parentId
        });

      if (error) throw error;
      // Comments will be updated via real-time subscription
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  return {
    comments,
    loading,
    addComment,
    refetch: fetchComments
  };
};

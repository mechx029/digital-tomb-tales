
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Grave {
  id: string;
  title: string;
  epitaph: string;
  category: string;
  image_url?: string;
  video_url?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  featured: boolean;
  package_type: 'basic' | 'premium' | 'video' | 'featured';
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
  _count?: {
    reactions: number;
    comments: number;
  };
}

export const useRealTimeGraves = (sortBy: 'newest' | 'popular' | 'category' = 'newest') => {
  const [graves, setGraves] = useState<Grave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { user } = useAuth();
  const { toast } = useToast();

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchGraves = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Fetching graves from Supabase...');

      // Query with proper joins and error handling
      let query = supabase
        .from('graves')
        .select(`
          *,
          profiles!inner(username, display_name, avatar_url),
          reactions(id, reaction_type, user_id)
        `)
        .eq('published', true);

      // Apply sorting
      switch (sortBy) {
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'popular':
          query = query.order('shares', { ascending: false });
          break;
        case 'category':
          query = query.order('category', { ascending: true }).order('created_at', { ascending: false });
          break;
      }

      const { data: fetchedGraves, error: supabaseError } = await query;

      if (supabaseError) {
        console.error('❌ Supabase error:', supabaseError);
        throw new Error(`Database error: ${supabaseError.message}`);
      }

      console.log('✅ Fetched graves:', fetchedGraves?.length || 0);

      if (fetchedGraves && fetchedGraves.length > 0) {
        const processedGraves = fetchedGraves.map(grave => ({
          ...grave,
          _count: {
            reactions: grave.reactions?.length || 0,
            comments: Math.floor(Math.random() * 25) + 5 // Simulated for now
          }
        }));
        
        setGraves(processedGraves);
        console.log('✨ Processed graves:', processedGraves.length);
      } else {
        console.warn('⚠️ No graves found');
        setGraves([]);
      }
    } catch (err) {
      console.error('💥 Error fetching graves:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load graves';
      setError(errorMessage);
      setGraves([]);
      
      if (isOnline) {
        toast({
          title: "Loading Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [sortBy, isOnline, toast]);

  // Optimistic reaction toggle
  const toggleReaction = useCallback(async (graveId: string, reactionType: 'skull' | 'fire' | 'crying' | 'clown') => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to react to graves",
        variant: "destructive",
      });
      return;
    }

    console.log('👆 Toggling reaction:', reactionType, 'for grave:', graveId);

    // Optimistic update
    setGraves(prevGraves => 
      prevGraves.map(grave => {
        if (grave.id === graveId) {
          const existingReaction = grave.reactions.find(r => r.user_id === user.id && r.reaction_type === reactionType);
          
          if (existingReaction) {
            // Remove reaction
            return {
              ...grave,
              reactions: grave.reactions.filter(r => r.id !== existingReaction.id),
              _count: {
                ...grave._count,
                reactions: Math.max(0, (grave._count?.reactions || 0) - 1)
              }
            };
          } else {
            // Add reaction
            return {
              ...grave,
              reactions: [
                ...grave.reactions,
                {
                  id: `temp_${Date.now()}`,
                  reaction_type: reactionType,
                  user_id: user.id
                }
              ],
              _count: {
                ...grave._count,
                reactions: (grave._count?.reactions || 0) + 1
              }
            };
          }
        }
        return grave;
      })
    );

    try {
      // Check for existing reaction
      const { data: existingReaction } = await supabase
        .from('reactions')
        .select('id')
        .eq('grave_id', graveId)
        .eq('user_id', user.id)
        .eq('reaction_type', reactionType)
        .maybeSingle();

      if (existingReaction) {
        // Remove existing reaction
        const { error } = await supabase
          .from('reactions')
          .delete()
          .eq('id', existingReaction.id);
          
        if (error) throw error;
        console.log('✅ Reaction removed');
      } else {
        // Add new reaction
        const { error } = await supabase
          .from('reactions')
          .insert({
            grave_id: graveId,
            user_id: user.id,
            reaction_type: reactionType
          });
          
        if (error) throw error;
        console.log('✅ Reaction added');
      }
    } catch (error) {
      console.error('❌ Error toggling reaction:', error);
      // Revert optimistic update on error
      fetchGraves();
      
      toast({
        title: "Reaction Failed",
        description: "Unable to save reaction. Please try again.",
        variant: "destructive",
      });
    }
  }, [user, fetchGraves, toast]);

  // Real-time subscription and initial fetch
  useEffect(() => {
    console.log('🔄 Setting up real-time graves...');
    fetchGraves();

    // Set up real-time subscriptions
    const gravesChannel = supabase
      .channel('graves-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'graves',
        },
        (payload) => {
          console.log('📡 Real-time grave update:', payload);
          fetchGraves(); // Refetch on any change
        }
      )
      .subscribe();

    const reactionsChannel = supabase
      .channel('reactions-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reactions',
        },
        (payload) => {
          console.log('📡 Real-time reaction update:', payload);
          fetchGraves(); // Refetch when reactions change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(gravesChannel);
      supabase.removeChannel(reactionsChannel);
    };
  }, [fetchGraves]);

  // Auto-refresh for live updates
  useEffect(() => {
    if (!isOnline) return;
    
    const interval = setInterval(() => {
      console.log('⏰ Auto-refresh graves');
      fetchGraves();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [fetchGraves, isOnline]);

  return {
    graves,
    loading,
    error,
    isOnline,
    refetch: fetchGraves,
    toggleReaction
  };
};

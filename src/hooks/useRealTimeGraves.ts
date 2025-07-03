
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { mockGraves } from '@/data/mockGraves';
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

  const processMockGraves = useCallback(() => {
    const processedMockGraves = mockGraves.map(grave => ({
      id: grave.id,
      title: grave.title,
      epitaph: grave.epitaph,
      category: grave.category,
      image_url: null,
      video_url: null,
      user_id: 'mock_user',
      created_at: grave.timestamp,
      updated_at: grave.timestamp,
      published: true,
      featured: grave.featured,
      package_type: grave.packageType as 'basic' | 'premium' | 'video' | 'featured',
      shares: grave.shares,
      profiles: {
        username: grave.author.toLowerCase().replace(/\s+/g, '_'),
        display_name: grave.author,
        avatar_url: null
      },
      reactions: Object.entries(grave.reactions).flatMap(([type, count]) => 
        Array(count).fill(null).map((_, index) => ({
          id: `mock_${grave.id}_${type}_${index}`,
          reaction_type: type as 'skull' | 'fire' | 'crying' | 'clown',
          user_id: `mock_user_${index}`
        }))
      ),
      _count: {
        reactions: Object.values(grave.reactions).reduce((sum, count) => sum + count, 0),
        comments: Math.floor(Math.random() * 20)
      }
    }));

    // Apply sorting
    let sortedGraves = [...processedMockGraves];
    switch (sortBy) {
      case 'newest':
        sortedGraves.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'popular':
        sortedGraves.sort((a, b) => (b._count?.reactions || 0) - (a._count?.reactions || 0));
        break;
      case 'category':
        sortedGraves.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    return sortedGraves;
  }, [sortBy]);

  const fetchGraves = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch from Supabase first
      const { data: realGraves, error: supabaseError } = await supabase
        .from('graves')
        .select(`
          *,
          profiles!inner(username, display_name, avatar_url),
          reactions(id, reaction_type, user_id)
        `)
        .eq('published', true)
        .order('created_at', { ascending: sortBy !== 'newest' });

      if (supabaseError) {
        console.warn('Supabase error, falling back to mock data:', supabaseError);
        throw supabaseError;
      }

      if (realGraves && realGraves.length > 0) {
        // Process real data
        const processedGraves = realGraves.map(grave => ({
          ...grave,
          _count: {
            reactions: grave.reactions?.length || 0,
            comments: Math.floor(Math.random() * 20)
          }
        }));
        setGraves(processedGraves);
      } else {
        // Fallback to mock data
        const mockData = processMockGraves();
        setGraves(mockData);
      }
    } catch (err) {
      console.error('Error fetching graves:', err);
      setError('Failed to load graves');
      
      // Always fallback to mock data on error
      const mockData = processMockGraves();
      setGraves(mockData);
      
      if (isOnline) {
        toast({
          title: "Connection Issue",
          description: "Showing cached content. Trying to reconnect...",
          variant: "default",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [sortBy, processMockGraves, isOnline, toast]);

  // Real-time subscription
  useEffect(() => {
    fetchGraves();

    // Set up real-time subscription
    const channel = supabase
      .channel('graves-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'graves',
        },
        (payload) => {
          console.log('Real-time update:', payload);
          fetchGraves(); // Refetch on any change
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reactions',
        },
        (payload) => {
          console.log('Reaction update:', payload);
          fetchGraves(); // Refetch on reaction changes
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchGraves]);

  // Optimistic reaction toggle
  const toggleReaction = useCallback(async (graveId: string, reactionType: 'skull' | 'fire' | 'crying' | 'clown') => {
    if (!user) return;

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
                reactions: (grave._count?.reactions || 0) - 1
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
      // Try to update in Supabase
      const existingReaction = await supabase
        .from('reactions')
        .select('id')
        .eq('grave_id', graveId)
        .eq('user_id', user.id)
        .eq('reaction_type', reactionType)
        .single();

      if (existingReaction.data) {
        await supabase
          .from('reactions')
          .delete()
          .eq('id', existingReaction.data.id);
      } else {
        await supabase
          .from('reactions')
          .insert({
            grave_id: graveId,
            user_id: user.id,
            reaction_type: reactionType
          });
      }
    } catch (error) {
      console.error('Error toggling reaction:', error);
      // Revert optimistic update on error
      fetchGraves();
      
      toast({
        title: "Reaction Failed",
        description: "Unable to save reaction. Please try again.",
        variant: "destructive",
      });
    }
  }, [user, fetchGraves, toast]);

  // Auto-refresh every 30 seconds for fresh data
  useEffect(() => {
    if (!isOnline) return;
    
    const interval = setInterval(() => {
      fetchGraves();
    }, 30000);

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

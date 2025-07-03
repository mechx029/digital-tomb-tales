
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { mockGraves } from '@/data/mockGraves';

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

export const useGraves = (sortBy: 'newest' | 'popular' | 'category' = 'newest') => {
  const [graves, setGraves] = useState<Grave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchGraves();

    // Set up real-time subscription
    const channel = supabase
      .channel('graves-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'graves'
        },
        () => fetchGraves()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reactions'
        },
        () => fetchGraves()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sortBy]);

  const fetchGraves = async () => {
    try {
      setLoading(true);
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
          // This would need a computed field or view in production
          query = query.order('created_at', { ascending: false });
          break;
        case 'category':
          query = query.order('category').order('created_at', { ascending: false });
          break;
      }

      const { data, error } = await query.limit(50);

      if (error) throw error;

      // If no real data exists, use mock data
      if (!data || data.length === 0) {
        console.log('No real graves found, using mock data');
        const processedMockGraves = mockGraves.map(grave => ({
          ...grave,
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
          },
          user_id: 'mock_user',
          published: true,
          image_url: null,
          video_url: null
        }));

        // Apply sorting to mock data
        let sortedMockGraves = [...processedMockGraves];
        switch (sortBy) {
          case 'newest':
            sortedMockGraves.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            break;
          case 'popular':
            sortedMockGraves.sort((a, b) => (b._count?.reactions || 0) - (a._count?.reactions || 0));
            break;
          case 'category':
            sortedMockGraves.sort((a, b) => a.category.localeCompare(b.category));
            break;
        }

        setGraves(sortedMockGraves);
        setError(null);
        return;
      }

      // Process real data
      const processedGraves = data?.map(grave => ({
        ...grave,
        _count: {
          reactions: grave.reactions?.length || 0,
          comments: 0 // Will be added when we implement comments
        }
      })) || [];

      setGraves(processedGraves);
      setError(null);
    } catch (err) {
      console.error('Error fetching graves:', err);
      setError('Failed to load graves');
      
      // Fallback to mock data on error
      const processedMockGraves = mockGraves.map(grave => ({
        ...grave,
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
        },
        user_id: 'mock_user',
        published: true,
        image_url: null,
        video_url: null
      }));

      setGraves(processedMockGraves);
    } finally {
      setLoading(false);
    }
  };

  const toggleReaction = async (graveId: string, reactionType: 'skull' | 'fire' | 'crying' | 'clown') => {
    if (!user) return;

    try {
      // Check if user already reacted with this type
      const { data: existingReaction } = await supabase
        .from('reactions')
        .select('id')
        .eq('grave_id', graveId)
        .eq('user_id', user.id)
        .eq('reaction_type', reactionType)
        .single();

      if (existingReaction) {
        // Remove reaction
        await supabase
          .from('reactions')
          .delete()
          .eq('id', existingReaction.id);
      } else {
        // Add reaction (remove any existing different reactions first)
        await supabase
          .from('reactions')
          .delete()
          .eq('grave_id', graveId)
          .eq('user_id', user.id);

        await supabase
          .from('reactions')
          .insert({
            grave_id: graveId,
            user_id: user.id,
            reaction_type: reactionType
          });
      }

      // Refresh graves to get updated counts
      fetchGraves();
    } catch (error) {
      console.error('Error toggling reaction:', error);
    }
  };

  return {
    graves,
    loading,
    error,
    refetch: fetchGraves,
    toggleReaction
  };
};

export const useUserGraves = (userId?: string) => {
  const [graves, setGraves] = useState<Grave[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (userId || user) {
      fetchUserGraves();
    }
  }, [userId, user]);

  const fetchUserGraves = async () => {
    try {
      setLoading(true);
      const targetUserId = userId || user?.id;
      
      const { data, error } = await supabase
        .from('graves')
        .select(`
          *,
          profiles!inner(username, display_name, avatar_url),
          reactions(id, reaction_type, user_id)
        `)
        .eq('user_id', targetUserId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const processedGraves = data?.map(grave => ({
        ...grave,
        _count: {
          reactions: grave.reactions?.length || 0,
          comments: 0
        }
      })) || [];

      setGraves(processedGraves);
    } catch (error) {
      console.error('Error fetching user graves:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    graves,
    loading,
    refetch: fetchUserGraves
  };
};

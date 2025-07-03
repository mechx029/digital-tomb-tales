
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

  const processMockGraves = () => {
    console.log('Processing mock graves, total:', mockGraves.length);
    
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

    // Apply sorting to mock data
    let sortedMockGraves = [...processedMockGraves];
    switch (sortBy) {
      case 'newest':
        sortedMockGraves.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'popular':
        sortedMockGraves.sort((a, b) => (b._count?.reactions || 0) - (a._count?.reactions || 0));
        break;
      case 'category':
        sortedMockGraves.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    console.log('Processed graves:', sortedMockGraves.length);
    return sortedMockGraves;
  };

  useEffect(() => {
    fetchGraves();
  }, [sortBy]);

  const fetchGraves = async () => {
    try {
      setLoading(true);
      console.log('Fetching graves...');
      
      // Always use mock data for now since we want to show the fake data
      const processedGraves = processMockGraves();
      setGraves(processedGraves);
      setError(null);
      console.log('Set graves:', processedGraves.length);
    } catch (err) {
      console.error('Error fetching graves:', err);
      setError('Failed to load graves');
      
      // Fallback to mock data on error
      const processedGraves = processMockGraves();
      setGraves(processedGraves);
    } finally {
      setLoading(false);
    }
  };

  const toggleReaction = async (graveId: string, reactionType: 'skull' | 'fire' | 'crying' | 'clown') => {
    if (!user) return;

    try {
      // For mock data, just simulate the reaction toggle
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
                    id: `${graveId}_${user.id}_${reactionType}`,
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

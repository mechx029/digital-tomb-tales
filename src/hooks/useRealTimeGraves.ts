
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

      console.log('🔍 Starting to fetch graves from Supabase...');

      // Main query with proper joins
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
          query = query.order('category', { ascending: true });
          break;
      }

      console.log('🚀 Executing main graves query...');
      const { data: fetchedGraves, error: supabaseError } = await query;

      if (supabaseError) {
        console.error('❌ Supabase error:', supabaseError);
        throw supabaseError;
      }

      console.log('✅ Raw graves data from Supabase:', fetchedGraves?.length || 0, 'graves');

      if (fetchedGraves && fetchedGraves.length > 0) {
        // Process graves with reaction counts
        const processedGraves = fetchedGraves.map(grave => {
          const processed = {
            ...grave,
            _count: {
              reactions: grave.reactions?.length || 0,
              comments: Math.floor(Math.random() * 20) // Simulated for now
            }
          };
          return processed;
        });
        
        console.log('✨ Final processed graves:', processedGraves.length);
        setGraves(processedGraves);
      } else {
        console.warn('⚠️ No published graves found in database');
        setGraves([]);
      }
    } catch (err) {
      console.error('💥 Error fetching graves:', err);
      setError('Failed to load graves');
      setGraves([]);
      
      if (isOnline) {
        toast({
          title: "Connection Issue",
          description: "Unable to load graves. Please try refreshing the page.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [sortBy, isOnline, toast]);

  // Optimistic reaction toggle with real-time updates
  const toggleReaction = useCallback(async (graveId: string, reactionType: 'skull' | 'fire' | 'crying' | 'clown') => {
    if (!user) return;

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
        
        console.log('✅ Reaction removed from database');
      } else {
        await supabase
          .from('reactions')
          .insert({
            grave_id: graveId,
            user_id: user.id,
            reaction_type: reactionType
          });
          
        console.log('✅ Reaction added to database');
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
    console.log('🔄 useEffect triggered - fetching graves...');
    fetchGraves();

    // Set up enhanced real-time subscriptions for live updates
    const gravesChannel = supabase
      .channel('graves-realtime-enhanced')
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
      .channel('reactions-realtime-enhanced')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reactions',
        },
        (payload) => {
          console.log('📡 Real-time reaction update:', payload);
          // For reactions, we can do more granular updates
          if (payload.eventType === 'INSERT' || payload.eventType === 'DELETE') {
            fetchGraves();
          }
        }
      )
      .subscribe();

    const profilesChannel = supabase
      .channel('profiles-realtime-enhanced')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
        },
        (payload) => {
          console.log('📡 Real-time profile update:', payload);
          fetchGraves(); // Refetch when user profiles change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(gravesChannel);
      supabase.removeChannel(reactionsChannel);
      supabase.removeChannel(profilesChannel);
    };
  }, [fetchGraves]);

  // Auto-refresh every 15 seconds for ultra-fresh data
  useEffect(() => {
    if (!isOnline) return;
    
    const interval = setInterval(() => {
      console.log('⏰ Auto-refresh triggered');
      fetchGraves();
    }, 15000);

    return () => clearInterval(interval);
  }, [fetchGraves, isOnline]);

  console.log('🎯 useRealTimeGraves returning:', { 
    gravesCount: graves.length, 
    loading, 
    error, 
    isOnline,
    graveTitles: graves.slice(0, 3).map(g => g.title)
  });

  return {
    graves,
    loading,
    error,
    isOnline,
    refetch: fetchGraves,
    toggleReaction
  };
};

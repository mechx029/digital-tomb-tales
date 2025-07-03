import { useRealTimeGraves } from './useRealTimeGraves';

// Re-export the enhanced hook for backward compatibility
export const useGraves = useRealTimeGraves;
export { useRealTimeGraves };
export type { Grave } from './useRealTimeGraves';

// Keep the existing useUserGraves hook
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Grave } from './useRealTimeGraves';

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

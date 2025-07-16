
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PlatformStats {
  totalGraves: number;
  totalUsers: number;
  totalReactions: number;
  activeBurials: number;
  activeUsers: string[];
  recentActivity: Array<{
    id: string;
    type: 'burial' | 'reaction';
    user: string;
    grave_title?: string;
    timestamp: string;
  }>;
}

export const useRealTimeStats = () => {
  const [stats, setStats] = useState<PlatformStats>({
    totalGraves: 0,
    totalUsers: 0,
    totalReactions: 0,
    activeBurials: 0,
    activeUsers: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState({
    totalGraves: false,
    totalUsers: false,
    totalReactions: false,
    activeBurials: false
  });

  const fetchStats = async () => {
    try {
      console.log('📊 Fetching real-time platform stats...');
      
      // Get total counts
      const [gravesResult, usersResult, reactionsResult] = await Promise.all([
        supabase.from('graves').select('id').eq('published', true),
        supabase.from('profiles').select('id'),
        supabase.from('reactions').select('id')
      ]);

      // Get recent graves (last 24 hours for "active burials")
      const { data: recentGraves } = await supabase
        .from('graves')
        .select('id')
        .eq('published', true)
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      // Get active users (simulate 10 random users as "active today")
      const { data: allUsers } = await supabase
        .from('profiles')
        .select('username, display_name')
        .limit(30);

      // Simulate active users
      const activeUsers = allUsers
        ?.sort(() => Math.random() - 0.5)
        .slice(0, 10)
        .map(user => user.display_name || user.username) || [];

      // Get recent activity for live feed
      const { data: recentActivity } = await supabase
        .from('graves')
        .select(`
          id, title, created_at,
          profiles!inner(username, display_name)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(5);

      const formattedActivity = recentActivity?.map(grave => ({
        id: grave.id,
        type: 'burial' as const,
        user: grave.profiles.display_name || grave.profiles.username,
        grave_title: grave.title,
        timestamp: grave.created_at
      })) || [];

      const newStats = {
        totalGraves: gravesResult.data?.length || 0,
        totalUsers: usersResult.data?.length || 0,
        totalReactions: reactionsResult.data?.length || 0,
        activeBurials: recentGraves?.length || 0,
        activeUsers,
        recentActivity: formattedActivity
      };

      // Check if stats changed to trigger animations
      const statsChanged = {
        totalGraves: newStats.totalGraves !== stats.totalGraves,
        totalUsers: newStats.totalUsers !== stats.totalUsers,
        totalReactions: newStats.totalReactions !== stats.totalReactions,
        activeBurials: newStats.activeBurials !== stats.activeBurials
      };

      setStats(newStats);

      // Trigger animations for changed stats
      if (statsChanged.totalGraves || statsChanged.totalUsers || statsChanged.totalReactions || statsChanged.activeBurials) {
        setAnimating(statsChanged);
        // Reset animations after 1 second
        setTimeout(() => {
          setAnimating({
            totalGraves: false,
            totalUsers: false,
            totalReactions: false,
            activeBurials: false
          });
        }, 1000);
      }

      console.log('✅ Stats updated:', {
        graves: gravesResult.data?.length,
        users: usersResult.data?.length,
        reactions: reactionsResult.data?.length
      });
      
    } catch (error) {
      console.error('❌ Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // Set up real-time subscriptions for live updates
    const gravesChannel = supabase
      .channel('graves-stats-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'graves',
          filter: 'published=eq.true'
        },
        (payload) => {
          console.log('📡 Real-time grave update:', payload);
          fetchStats();
        }
      )
      .subscribe();

    const reactionsChannel = supabase
      .channel('reactions-stats-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reactions'
        },
        (payload) => {
          console.log('📡 Real-time reaction update:', payload);
          fetchStats();
        }
      )
      .subscribe();

    const profilesChannel = supabase
      .channel('profiles-stats-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          console.log('📡 Real-time profile update:', payload);
          fetchStats();
        }
      )
      .subscribe();

    // Auto-refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);

    return () => {
      supabase.removeChannel(gravesChannel);
      supabase.removeChannel(reactionsChannel);
      supabase.removeChannel(profilesChannel);
      clearInterval(interval);
    };
  }, []);

  return { stats, loading, animating, refetch: fetchStats };
};

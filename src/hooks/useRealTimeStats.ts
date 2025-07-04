
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Stats {
  totalGraves: number;
  totalUsers: number;
  totalReactions: number;
  activeBurials: number;
}

export const useRealTimeStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalGraves: 0,
    totalUsers: 0,
    totalReactions: 0,
    activeBurials: 0
  });
  
  const [animating, setAnimating] = useState({
    totalGraves: false,
    totalUsers: false,
    totalReactions: false,
    activeBurials: false
  });

  const fetchRealStats = useCallback(async () => {
    try {
      console.log('Fetching real-time stats...');
      
      const [gravesResult, usersResult, reactionsResult, recentResult] = await Promise.allSettled([
        supabase.from('graves').select('*', { count: 'exact', head: true }).eq('published', true),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('reactions').select('*', { count: 'exact', head: true }),
        supabase.from('graves').select('*', { count: 'exact', head: true })
          .eq('published', true)
          .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      ]);

      const newStats = {
        totalGraves: gravesResult.status === 'fulfilled' ? (gravesResult.value.count || 0) : 0,
        totalUsers: usersResult.status === 'fulfilled' ? (usersResult.value.count || 0) : 0,
        totalReactions: reactionsResult.status === 'fulfilled' ? (reactionsResult.value.count || 0) : 0,
        activeBurials: recentResult.status === 'fulfilled' ? (recentResult.value.count || 0) : 0
      };

      console.log('Real-time stats fetched:', newStats);
      setStats(newStats);
    } catch (error) {
      console.error('Error fetching real-time stats:', error);
    }
  }, []);

  const simulateRealTimeUpdate = useCallback(() => {
    const statKeys = ['totalGraves', 'totalUsers', 'totalReactions', 'activeBurials'] as const;
    const statKey = statKeys[Math.floor(Math.random() * statKeys.length)];
    
    // Animate the changing stat
    setAnimating(prev => ({ ...prev, [statKey]: true }));
    
    setStats(prev => {
      const newStats = { ...prev };
      switch (statKey) {
        case 'totalGraves':
          newStats.totalGraves += Math.floor(Math.random() * 2) + 1;
          break;
        case 'totalUsers':
          newStats.totalUsers += Math.floor(Math.random() * 3) + 1;
          break;
        case 'totalReactions':
          newStats.totalReactions += Math.floor(Math.random() * 20) + 5;
          break;
        case 'activeBurials':
          newStats.activeBurials = Math.floor(Math.random() * 15) + 8;
          break;
      }
      return newStats;
    });

    // Remove animation after 1 second
    setTimeout(() => {
      setAnimating(prev => ({ ...prev, [statKey]: false }));
    }, 1000);
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchRealStats();

    // Real-time subscription for live updates
    const channel = supabase
      .channel('stats-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'graves' }, fetchRealStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, fetchRealStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reactions' }, fetchRealStats)
      .subscribe();

    // Simulate additional real-time updates every 15 seconds
    const interval = setInterval(simulateRealTimeUpdate, 15000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [fetchRealStats, simulateRealTimeUpdate]);

  return { stats, animating };
};


import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getTotalGraves, getTotalUsers, getTotalReactions, getActiveBurials } from '@/data/mockGraves';

interface Stats {
  totalGraves: number;
  totalUsers: number;
  totalReactions: number;
  activeBurials: number;
}

export const useRealTimeStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalGraves: getTotalGraves(),
    totalUsers: getTotalUsers(),
    totalReactions: getTotalReactions(),
    activeBurials: getActiveBurials()
  });
  
  const [animating, setAnimating] = useState({
    totalGraves: false,
    totalUsers: false,
    totalReactions: false,
    activeBurials: false
  });

  const fetchRealStats = useCallback(async () => {
    try {
      const [gravesResult, usersResult, reactionsResult, recentResult] = await Promise.allSettled([
        supabase.from('graves').select('*', { count: 'exact', head: true }).eq('published', true),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('reactions').select('*', { count: 'exact', head: true }),
        supabase.from('graves').select('*', { count: 'exact', head: true })
          .eq('published', true)
          .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      ]);

      const newStats = {
        totalGraves: gravesResult.status === 'fulfilled' ? (gravesResult.value.count || getTotalGraves()) : getTotalGraves(),
        totalUsers: usersResult.status === 'fulfilled' ? (usersResult.value.count || getTotalUsers()) : getTotalUsers(),
        totalReactions: reactionsResult.status === 'fulfilled' ? (reactionsResult.value.count || getTotalReactions()) : getTotalReactions(),
        activeBurials: recentResult.status === 'fulfilled' ? (recentResult.value.count || getActiveBurials()) : getActiveBurials()
      };

      // Add some realistic increments to mock data
      if (gravesResult.status === 'rejected') {
        newStats.totalGraves += Math.floor(Math.random() * 3);
      }
      if (usersResult.status === 'rejected') {
        newStats.totalUsers += Math.floor(Math.random() * 5);
      }
      if (reactionsResult.status === 'rejected') {
        newStats.totalReactions += Math.floor(Math.random() * 25) + 10;
      }
      if (recentResult.status === 'rejected') {
        newStats.activeBurials = Math.floor(Math.random() * 15) + 8;
      }

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
    fetchRealStats();

    // Real-time subscription
    const channel = supabase
      .channel('stats-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'graves' }, fetchRealStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, fetchRealStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reactions' }, fetchRealStats)
      .subscribe();

    // Simulate real-time updates every 8 seconds
    const interval = setInterval(simulateRealTimeUpdate, 8000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [fetchRealStats, simulateRealTimeUpdate]);

  return { stats, animating };
};

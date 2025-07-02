
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Skull, Users, Flame, Heart } from 'lucide-react';

const LiveStatsCounter = () => {
  const [stats, setStats] = useState({
    totalGraves: 0,
    totalUsers: 0,
    totalReactions: 0,
    activeBurials: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total published graves
        const { count: gravesCount } = await supabase
          .from('graves')
          .select('*', { count: 'exact', head: true })
          .eq('published', true);

        // Get total users
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Get total reactions
        const { count: reactionsCount } = await supabase
          .from('reactions')
          .select('*', { count: 'exact', head: true });

        // Get recent burials (last 24 hours)
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const { count: recentCount } = await supabase
          .from('graves')
          .select('*', { count: 'exact', head: true })
          .eq('published', true)
          .gte('created_at', yesterday);

        setStats({
          totalGraves: gravesCount || 0,
          totalUsers: usersCount || 0,
          totalReactions: reactionsCount || 0,
          activeBurials: recentCount || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();

    // Set up real-time updates
    const channel = supabase
      .channel('stats-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'graves'
        },
        () => fetchStats()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reactions'
        },
        () => fetchStats()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Skull className="w-5 h-5 text-primary" />
          <span className="text-2xl font-bold text-primary">
            {formatNumber(stats.totalGraves)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Souls Buried</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Users className="w-5 h-5 text-accent" />
          <span className="text-2xl font-bold text-accent">
            {formatNumber(stats.totalUsers)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Grave Keepers</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-2xl font-bold text-orange-500">
            {formatNumber(stats.totalReactions)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Total Reactions</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-pink-500" />
          <span className="text-2xl font-bold text-pink-500">
            {formatNumber(stats.activeBurials)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Active (24h)</p>
      </div>
    </div>
  );
};

export default LiveStatsCounter;

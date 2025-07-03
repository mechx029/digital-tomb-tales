import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Skull, Users, Flame, Heart } from 'lucide-react';
import { getTotalGraves, getTotalUsers, getTotalReactions, getActiveBurials } from '@/data/mockGraves';

const LiveStatsCounter = () => {
  const [stats, setStats] = useState({
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

        // Use Supabase data if available, otherwise keep mock data
        setStats({
          totalGraves: gravesCount || getTotalGraves(),
          totalUsers: usersCount || getTotalUsers(),
          totalReactions: reactionsCount || getTotalReactions(),
          activeBurials: recentCount || getActiveBurials()
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Keep using mock data on error with some random increases
        setStats(prev => ({
          totalGraves: prev.totalGraves + Math.floor(Math.random() * 3),
          totalUsers: prev.totalUsers + Math.floor(Math.random() * 5),
          totalReactions: prev.totalReactions + Math.floor(Math.random() * 25) + 10,
          activeBurials: Math.floor(Math.random() * 12) + 8
        }));
      }
    };

    // Initial fetch
    fetchStats();

    // Simulate real-time updates every 8 seconds
    const interval = setInterval(() => {
      const statKey = ['totalGraves', 'totalUsers', 'totalReactions', 'activeBurials'][Math.floor(Math.random() * 4)] as keyof typeof stats;
      
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
    }, 8000);

    return () => {
      clearInterval(interval);
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      <div className="text-center relative">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Skull className={`w-6 h-6 text-primary transition-all duration-500 ${animating.totalGraves ? 'animate-bounce scale-125' : ''}`} />
          <span className={`text-3xl font-bold text-primary transition-all duration-500 ${animating.totalGraves ? 'scale-110 glow-text' : ''}`}>
            {formatNumber(stats.totalGraves)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground font-medium">Souls Buried</p>
        <div className="text-xs text-green-400 mt-1">
          +{Math.floor(Math.random() * 5) + 1} today
        </div>
      </div>

      <div className="text-center relative">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Users className={`w-6 h-6 text-accent transition-all duration-500 ${animating.totalUsers ? 'animate-bounce scale-125' : ''}`} />
          <span className={`text-3xl font-bold text-accent transition-all duration-500 ${animating.totalUsers ? 'scale-110 glow-text' : ''}`}>
            {formatNumber(stats.totalUsers)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground font-medium">Grave Keepers</p>
        <div className="text-xs text-purple-400 mt-1">
          +{Math.floor(Math.random() * 8) + 2} today
        </div>
      </div>

      <div className="text-center relative">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Flame className={`w-6 h-6 text-orange-500 transition-all duration-500 ${animating.totalReactions ? 'animate-bounce scale-125' : ''}`} />
          <span className={`text-3xl font-bold text-orange-500 transition-all duration-500 ${animating.totalReactions ? 'scale-110 glow-text' : ''}`}>
            {formatNumber(stats.totalReactions)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground font-medium">Total Reactions</p>
        <div className="text-xs text-orange-400 mt-1">
          +{Math.floor(Math.random() * 50) + 20} today
        </div>
      </div>

      <div className="text-center relative">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className={`w-6 h-6 text-pink-500 transition-all duration-500 ${animating.activeBurials ? 'animate-pulse scale-125' : 'animate-pulse'}`} />
          <span className={`text-3xl font-bold text-pink-500 transition-all duration-500 ${animating.activeBurials ? 'scale-110 glow-text' : ''}`}>
            {formatNumber(stats.activeBurials)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground font-medium">Active (24h)</p>
        <div className="text-xs text-pink-400 mt-1 animate-pulse">
          🔴 Live now
        </div>
      </div>
    </div>
  );
};

export default LiveStatsCounter;

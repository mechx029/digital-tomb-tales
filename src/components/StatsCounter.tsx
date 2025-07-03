
import React, { useState, useEffect } from 'react';
import { getTotalGraves, getTotalUsers, getTotalReactions, getActiveBurials } from '@/data/mockGraves';

const StatsCounter: React.FC = () => {
  const [stats, setStats] = useState({
    totalGraves: getTotalGraves(),
    totalUsers: getTotalUsers(),
    totalReactions: getTotalReactions(),
    activeBurials: getActiveBurials()
  });
  
  useEffect(() => {
    // Simulate real-time updates by incrementing stats every 15 seconds
    const interval = setInterval(() => {
      setStats(prev => ({
        totalGraves: prev.totalGraves + Math.floor(Math.random() * 2),
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        totalReactions: prev.totalReactions + Math.floor(Math.random() * 15) + 5,
        activeBurials: Math.floor(Math.random() * 8) + 12 // Keep it realistic for 24h activity
      }));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl animate-pulse">💀</span>
          <span className="text-2xl font-bold text-primary glow-text">
            {formatNumber(stats.totalGraves)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Souls Buried</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">👻</span>
          <span className="text-2xl font-bold text-accent">
            {formatNumber(stats.totalUsers)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Grave Keepers</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">🔥</span>
          <span className="text-2xl font-bold text-orange-500">
            {formatNumber(stats.totalReactions)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Total Reactions</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl animate-bounce">⚰️</span>
          <span className="text-2xl font-bold text-pink-500">
            {formatNumber(stats.activeBurials)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Active (24h)</p>
      </div>
    </div>
  );
};

export default StatsCounter;

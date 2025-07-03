
import React from 'react';
import { Skull, Users, Flame, Heart } from 'lucide-react';
import { useRealTimeStats } from '@/hooks/useRealTimeStats';

const LiveStatsCounter = () => {
  const { stats, animating } = useRealTimeStats();

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

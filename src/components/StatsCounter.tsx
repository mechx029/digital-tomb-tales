
import React, { useState, useEffect } from 'react';
import { getTotalGraves } from '@/data/mockGraves';

const StatsCounter: React.FC = () => {
  const [soulsCount, setSoulsCount] = useState(getTotalGraves());
  
  useEffect(() => {
    // Simulate real-time updates by incrementing every 30 seconds
    const interval = setInterval(() => {
      setSoulsCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center gap-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg px-8 py-4 ghost-glow">
        <div className="text-4xl animate-pulse">💀</div>
        <div>
          <div className="text-3xl font-bold text-primary glow-text">
            {formatNumber(soulsCount)}
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            Souls Buried Forever
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;

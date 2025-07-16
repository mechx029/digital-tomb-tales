
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ghost, Flame } from 'lucide-react';
import { useRealTimeStats } from '@/hooks/useRealTimeStats';

const DigitalSoulsCounter = () => {
  const { stats, loading } = useRealTimeStats();

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30">
        <CardContent className="p-6 text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-slate-700 rounded-full mx-auto mb-4"></div>
            <div className="h-8 bg-slate-700 rounded w-32 mx-auto mb-2"></div>
            <div className="h-4 bg-slate-700 rounded w-24 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
      <CardContent className="p-6 text-center">
        <div className="relative mb-4">
          <div className="text-6xl animate-float">👻</div>
          <Badge className="absolute -top-1 -right-1 bg-red-500/80 text-red-100 animate-pulse">
            LIVE
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {stats.totalUsers}
          </div>
          <div className="text-sm text-slate-300 font-medium">
            Digital Souls Resting
          </div>
          <div className="text-xs text-slate-400">
            {stats.activeBurials} fresh burials today
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Ghost className="w-3 h-3" />
            {stats.totalGraves} graves
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-3 h-3" />
            {stats.totalReactions} reactions
          </div>
        </div>

        {/* Active users indicator */}
        <div className="mt-4 pt-3 border-t border-slate-700/50">
          <div className="flex items-center justify-center gap-2 text-xs">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-medium">
              {stats.activeUsers.length} gravekeepers active now
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalSoulsCounter;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Skull, Flame } from 'lucide-react';
import { useRealTimeStats } from '@/hooks/useRealTimeStats';

const GravekeepersList = () => {
  const { stats, loading } = useRealTimeStats();

  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-purple-400">Top Gravekeepers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-slate-700 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Create leaderboard from active users with simulated stats
  const topGravekeepers = stats.activeUsers.slice(0, 8).map((user, index) => ({
    username: user,
    rank: index + 1,
    burials: Math.floor(Math.random() * 15) + 1,
    reactions: Math.floor(Math.random() * 200) + 50,
    isActive: index < 5 // First 5 are "currently active"
  })).sort((a, b) => b.reactions - a.reactions);

  return (
    <Card className="bg-slate-800/50 border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Crown className="w-5 h-5" />
          Top Gravekeepers
          <Badge className="bg-orange-500/20 text-orange-400 animate-pulse">
            🔥 HOT
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topGravekeepers.map((keeper, index) => (
            <div 
              key={keeper.username}
              className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/30 hover:bg-slate-900/50 transition-colors"
            >
              <div className="relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black' :
                  index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-black' :
                  index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white' :
                  'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-200'
                }`}>
                  {index < 3 ? (
                    index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'
                  ) : (
                    keeper.rank
                  )}
                </div>
                {keeper.isActive && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-slate-800 animate-pulse"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-slate-200 truncate">
                    {keeper.username}
                  </p>
                  {keeper.isActive && (
                    <Badge className="bg-green-500/20 text-green-400 text-xs">
                      ACTIVE
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Skull className="w-3 h-3" />
                    {keeper.burials} burials
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    {keeper.reactions} reactions
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {topGravekeepers.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <Ghost className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No gravekeepers active yet...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GravekeepersList;

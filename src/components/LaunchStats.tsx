
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Skull, Zap } from 'lucide-react';

interface LaunchStatsProps {
  totalGraves: number;
  totalUsers: number;
  totalReactions: number;
  activeBurials: number;
}

const LaunchStats: React.FC<LaunchStatsProps> = ({
  totalGraves,
  totalUsers,
  totalReactions,
  activeBurials
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card className="bg-slate-800/50 border-slate-700/50 text-center hover:bg-slate-800/70 transition-colors">
        <CardContent className="p-4">
          <Skull className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-400">
            {totalGraves.toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">Digital Souls</div>
          <Badge className="mt-1 bg-green-500/10 text-green-400 text-xs">
            🔥 Trending
          </Badge>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700/50 text-center hover:bg-slate-800/70 transition-colors">
        <CardContent className="p-4">
          <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-400">
            {totalUsers.toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">Gravekeepers</div>
          <Badge className="mt-1 bg-blue-500/10 text-blue-400 text-xs">
            Growing
          </Badge>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700/50 text-center hover:bg-slate-800/70 transition-colors">
        <CardContent className="p-4">
          <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-400">
            {totalReactions.toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">Reactions</div>
          <Badge className="mt-1 bg-yellow-500/10 text-yellow-400 text-xs">
            🚀 Viral
          </Badge>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700/50 text-center hover:bg-slate-800/70 transition-colors">
        <CardContent className="p-4">
          <TrendingUp className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-red-400">
            {activeBurials.toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">Active Today</div>
          <Badge className="mt-1 bg-red-500/10 text-red-400 text-xs">
            ⚡ Live
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default LaunchStats;

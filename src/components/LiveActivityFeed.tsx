
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Zap } from 'lucide-react';
import { useRealTimeStats } from '@/hooks/useRealTimeStats';

const LiveActivityFeed = () => {
  const { stats, loading } = useRealTimeStats();

  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Zap className="w-5 h-5 animate-pulse" />
            Live Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-3 bg-slate-700 rounded w-3/4 mb-1"></div>
                  <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <Zap className="w-5 h-5 animate-pulse" />
          Live Activity
          <Badge className="bg-red-500/20 text-red-400 animate-pulse">
            🔴 LIVE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Recent Activity */}
          <div className="space-y-3">
            {stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg bg-slate-900/50">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm">
                    🪦
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200">
                      <span className="font-medium text-green-400">{activity.user}</span>
                      {activity.type === 'burial' && (
                        <>
                          {' '}buried{' '}
                          <span className="font-medium text-slate-100">"{activity.grave_title}"</span>
                        </>
                      )}
                    </p>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-slate-400">
                <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Loading activity...</p>
              </div>
            )}
          </div>

          {/* Active Users */}
          <div className="border-t border-slate-700/50 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-slate-200">
                Active Gravekeepers ({stats.activeUsers.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {stats.activeUsers.slice(0, 6).map((user, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className="text-xs bg-green-500/10 text-green-400 border-green-500/20"
                >
                  👻 {user}
                </Badge>
              ))}
              {stats.activeUsers.length > 6 && (
                <Badge variant="secondary" className="text-xs bg-slate-700/50 text-slate-400">
                  +{stats.activeUsers.length - 6} more
                </Badge>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="border-t border-slate-700/50 pt-4">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-2 rounded-lg bg-slate-900/50">
                <div className="text-lg font-bold text-green-400">{stats.totalGraves}</div>
                <div className="text-xs text-slate-400">Total Graves</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/50">
                <div className="text-lg font-bold text-purple-400">{stats.totalReactions}</div>
                <div className="text-xs text-slate-400">Reactions</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveActivityFeed;

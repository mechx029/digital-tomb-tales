
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRealTimeGraves } from '@/hooks/useRealTimeGraves';
import { useRealTimeStats } from '@/hooks/useRealTimeStats';
import { useAuth } from '@/contexts/AuthContext';
import GraveGrid from '@/components/GraveGrid';
import { Skull, TrendingUp, Users, Zap } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { graves, loading, toggleReaction } = useRealTimeGraves('newest');
  const { stats } = useRealTimeStats();

  // Get recent graves for the feed (limit to 6 for homepage)
  const recentGraves = graves.slice(0, 6);
  
  // Get trending graves (most reactions)
  const trendingGraves = [...graves]
    .sort((a, b) => (b._count?.reactions || 0) - (a._count?.reactions || 0))
    .slice(0, 3);

  const handleReaction = (graveId: string, type: 'skull' | 'fire' | 'crying' | 'clown') => {
    if (!user) {
      navigate('/auth');
      return;
    }
    toggleReaction(graveId, type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="text-8xl block mb-4 animate-bounce">💀</span>
            <h1 className="text-6xl font-creepster text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-purple-500 to-red-500 mb-4 glow-text">
              The Internet Graveyard
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Where digital regrets come to rest in peace. Bury your failed startups, cringe DMs, and questionable life choices.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => navigate('/bury')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-8 py-3 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              🪦 Bury Something
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/graveyard')}
              className="border-green-500/50 text-green-400 hover:bg-green-500/10 px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            >
              👻 Explore Graves
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-slate-800/50 border-slate-700/50 text-center">
            <CardContent className="p-4">
              <Skull className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {stats.totalGraves}
              </div>
              <div className="text-sm text-slate-400">Souls Buried</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 text-center">
            <CardContent className="p-4">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {stats.totalUsers}
              </div>
              <div className="text-sm text-slate-400">Gravekeepers</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 text-center">
            <CardContent className="p-4">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">
                {stats.totalReactions}
              </div>
              <div className="text-sm text-slate-400">Reactions</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 text-center">
            <CardContent className="p-4">
              <TrendingUp className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">
                {stats.activeBurials}
              </div>
              <div className="text-sm text-slate-400">Active Burials</div>
            </CardContent>
          </Card>
        </div>

        {/* Trending Graves Section */}
        {trendingGraves.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-200 flex items-center gap-2">
                <span className="text-3xl">🔥</span>
                Trending Graves
              </h2>
              <Button
                variant="ghost"
                onClick={() => navigate('/graveyard')}
                className="text-green-400 hover:text-green-300"
              >
                View All →
              </Button>
            </div>
            <GraveGrid 
              graves={trendingGraves} 
              loading={loading}
              onReaction={handleReaction}
            />
          </section>
        )}

        {/* Recent Graves Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-200 flex items-center gap-2">
              <span className="text-3xl">⏰</span>
              Recent Burials
            </h2>
            <Button
              variant="ghost"
              onClick={() => navigate('/graveyard')}
              className="text-green-400 hover:text-green-300"
            >
              View All →
            </Button>
          </div>
          <GraveGrid 
            graves={recentGraves} 
            loading={loading}
            onReaction={handleReaction}
          />
        </section>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700/50 p-8">
            <CardContent>
              <h3 className="text-2xl font-bold text-slate-200 mb-4">
                Ready to bury your digital shame?
              </h3>
              <p className="text-slate-400 mb-6">
                Join thousands of others in laying their regrets to rest
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/bury')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
              >
                Start Digging 🪦
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;

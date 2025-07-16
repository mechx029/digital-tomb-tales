
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRealTimeGraves } from '@/hooks/useRealTimeGraves';
import { useAuth } from '@/contexts/AuthContext';
import GraveGrid from '@/components/GraveGrid';
import SEOHead from '@/components/SEOHead';
import LaunchStats from '@/components/LaunchStats';
import ViralCallout from '@/components/ViralCallout';
import LiveActivityFeed from '@/components/LiveActivityFeed';
import DigitalSoulsCounter from '@/components/DigitalSoulsCounter';
import GravekeepersList from '@/components/GravekeepersList';
import { useRealTimeStats } from '@/hooks/useRealTimeStats';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { graves, loading, toggleReaction, error } = useRealTimeGraves('newest');
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
    <>
      <SEOHead />
      
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
              <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
                Where digital regrets come to rest in peace. Bury your failed startups, cringe DMs, and questionable life choices.
              </p>
              <p className="text-sm text-slate-400 mb-8">
                Join thousands sharing their epic fails • {stats.totalGraves}+ viral graves • Real-time reactions
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                onClick={() => navigate('/bury')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-8 py-3 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                🪦 Bury Something Epic
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/graveyard')}
                className="border-green-500/50 text-green-400 hover:bg-green-500/10 px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
              >
                👻 Explore Fails
              </Button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-center">
              <p className="text-red-400">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.location.reload()}
                className="mt-2"
              >
                Refresh Page
              </Button>
            </div>
          )}

          {/* Live Platform Activity Dashboard */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 mb-2">
                🔴 Live Digital Graveyard
              </h2>
              <p className="text-slate-400">Real-time activity from our community of digital mourners</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <DigitalSoulsCounter />
              <LiveActivityFeed />
              <GravekeepersList />
            </div>
          </div>

          {/* Viral Callout */}
          <ViralCallout />

          {/* Stats Section */}
          <LaunchStats 
            totalGraves={stats.totalGraves}
            totalUsers={stats.totalUsers}
            totalReactions={stats.totalReactions}
            activeBurials={stats.activeBurials}
          />

          {/* Trending Graves Section */}
          {trendingGraves.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-200 flex items-center gap-2">
                  <span className="text-3xl animate-bounce">🔥</span>
                  Trending Digital Disasters
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
                Fresh Failures
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

          {/* Empty State */}
          {!loading && graves.length === 0 && !error && (
            <div className="text-center py-12">
              <span className="text-8xl block mb-6">👻</span>
              <h3 className="text-2xl text-slate-300 mb-4">No graves found...</h3>
              <p className="text-slate-400 mb-8">Be the first to bury something in our digital cemetery!</p>
              <Button
                onClick={() => navigate('/bury')}
                className="bg-green-600 hover:bg-green-500 px-8 py-3"
              >
                🪦 Bury First Grave
              </Button>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700/50 p-8">
              <CardContent>
                <h3 className="text-2xl font-bold text-slate-200 mb-4">
                  Ready to join the digital afterlife?
                </h3>
                <p className="text-slate-400 mb-6">
                  Your epic fails deserve eternal remembrance in our viral graveyard
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => navigate('/bury')}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
                  >
                    💀 Start Burying
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/graveyard')}
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  >
                    👻 Browse Shame
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

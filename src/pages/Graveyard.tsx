
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRealTimeGraves } from '@/hooks/useRealTimeGraves';
import { useAuth } from '@/contexts/AuthContext';
import GraveGrid from '@/components/GraveGrid';
import LoadingSpinner from '@/components/LoadingSpinner';
import NetworkStatus from '@/components/NetworkStatus';
import SEOHead from '@/components/SEOHead';
import { Filter, Plus, Wifi, WifiOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Graveyard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'category'>('newest');
  const [activeTab, setActiveTab] = useState('all');
  
  const { graves, loading, error, isOnline, toggleReaction } = useRealTimeGraves(sortBy);

  const featuredGraves = graves.filter(grave => grave.featured);
  const regularGraves = graves.filter(grave => !grave.featured);
  const trendingGraves = [...graves].sort((a, b) => (b._count?.reactions || 0) - (a._count?.reactions || 0)).slice(0, 12);

  const handleReaction = (graveId: string, type: 'skull' | 'fire' | 'crying' | 'clown') => {
    if (!user) {
      navigate('/auth');
      return;
    }
    toggleReaction(graveId, type);
  };

  if (loading) {
    return (
      <>
        <SEOHead 
          title="Loading Digital Graveyard"
          description="Loading epic fails and digital disasters..."
        />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-slate-400">Loading the digital graveyard...</p>
            <p className="text-slate-500 text-sm mt-2">Summoning digital spirits...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Digital Graveyard - Browse Epic Fails"
        description="Explore thousands of digital disasters, failed startups, and epic fails. The ultimate collection of internet shame and viral content."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <NetworkStatus />
        
        {/* Animated background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-6 relative">
              <span className="text-8xl block mb-4 animate-bounce" style={{ animationDuration: '3s' }}>🪦</span>
            </div>
            
            <h1 className="font-creepster text-4xl md:text-6xl text-green-400 glow-text mb-4">
              The Digital Graveyard
            </h1>
            <p className="text-xl text-slate-300 mb-2">
              Where digital dreams come to <span className="text-red-400 font-bold">die</span>
            </p>
            <p className="text-slate-400 mb-2">
              Browse the eternal resting place of our collective digital shame
            </p>
            <p className="text-green-400 text-sm flex items-center justify-center gap-2">
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              🔴 {graves.length} souls currently resting • Live updates {isOnline ? 'active' : 'paused'}
            </p>

            {error && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.location.reload()}
                  className="mt-2"
                >
                  Refresh Graveyard
                </Button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button
                onClick={() => navigate('/bury')}
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold px-8 py-3 text-lg shadow-lg shadow-green-500/25 transform transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Bury Your Shame
              </Button>
              
              <div className="flex items-center gap-3">
                <Filter className="w-4 h-4 text-slate-400" />
                <Select value={sortBy} onValueChange={(value: 'newest' | 'popular' | 'category') => setSortBy(value)}>
                  <SelectTrigger className="w-40 bg-slate-800/50 border-slate-600 text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="newest">🕐 Fresh Fails</SelectItem>
                    <SelectItem value="popular">🔥 Most Viral</SelectItem>
                    <SelectItem value="category">📂 By Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700 max-w-md mx-auto">
              <TabsTrigger value="all" className="data-[state=active]:bg-green-600">
                🪦 All Graves ({graves.length})
              </TabsTrigger>
              <TabsTrigger value="featured" className="data-[state=active]:bg-red-600">
                👑 Hall of Shame ({featuredGraves.length})
              </TabsTrigger>
              <TabsTrigger value="trending" className="data-[state=active]:bg-orange-600">
                🔥 Trending ({trendingGraves.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-8">
              {/* Featured Section */}
              {featuredGraves.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl animate-pulse">👑</span>
                    <h2 className="text-2xl font-bold text-slate-200">Hall of Shame</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 to-transparent"></div>
                    <span className="text-sm text-slate-400">{featuredGraves.length} featured</span>
                  </div>
                  
                  <GraveGrid 
                    graves={featuredGraves} 
                    loading={false}
                    onReaction={handleReaction}
                  />
                </div>
              )}

              {/* All Graves */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🪦</span>
                  <h2 className="text-2xl font-bold text-slate-200">Recent Burials</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-green-500/50 to-transparent"></div>
                  <span className="text-sm text-slate-400">{regularGraves.length} graves</span>
                </div>
                
                <GraveGrid 
                  graves={regularGraves} 
                  loading={false}
                  onReaction={handleReaction}
                />
              </div>
            </TabsContent>

            <TabsContent value="featured" className="mt-8">
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl animate-pulse">👑</span>
                  <h2 className="text-2xl font-bold text-slate-200">Hall of Shame</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 to-transparent"></div>
                </div>
                <p className="text-slate-400 mt-2">The most legendary digital failures of all time</p>
              </div>
              <GraveGrid 
                graves={featuredGraves} 
                loading={false}
                onReaction={handleReaction}
              />
            </TabsContent>

            <TabsContent value="trending" className="mt-8">
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl animate-bounce">🔥</span>
                  <h2 className="text-2xl font-bold text-slate-200">Trending Now</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-orange-500/50 to-transparent"></div>
                </div>
                <p className="text-slate-400 mt-2">The hottest digital disasters going viral right now</p>
              </div>
              <GraveGrid 
                graves={trendingGraves} 
                loading={false}
                onReaction={handleReaction}
              />
            </TabsContent>
          </Tabs>

          {/* Empty State */}
          {!loading && graves.length === 0 && !error && (
            <div className="text-center py-20">
              <span className="text-8xl block mb-6 animate-pulse">👻</span>
              <h3 className="text-2xl text-slate-300 mb-4">The graveyard is empty...</h3>
              <p className="text-slate-400 mb-8">Be the first to bury something in our digital cemetery!</p>
              <Button
                onClick={() => navigate('/bury')}
                className="bg-green-600 hover:bg-green-500 px-8 py-3"
              >
                🪦 Bury First Grave
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Graveyard;

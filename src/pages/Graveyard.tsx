
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGraves } from '@/hooks/useGraves';
import { useAuth } from '@/contexts/AuthContext';
import GraveGrid from '@/components/GraveGrid';
import { Filter, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Graveyard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'category'>('newest');
  const [activeTab, setActiveTab] = useState('all');
  
  const { graves, loading, toggleReaction } = useGraves(sortBy);

  const featuredGraves = graves.filter(grave => grave.featured);
  const regularGraves = graves.filter(grave => !grave.featured);

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
        
        {/* Floating tombstones */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-10 animate-float"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            {['💀', '👻', '⚰️', '🕯️', '🪦'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6 relative">
            <span className="text-8xl block mb-4 animate-bounce" style={{ animationDuration: '3s' }}>🪦</span>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-3xl animate-float opacity-60">
              👻
            </div>
          </div>
          
          <h1 className="font-creepster text-4xl md:text-6xl text-green-400 glow-text mb-4">
            The Digital Graveyard
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            Where digital dreams come to <span className="text-red-400 font-bold">die</span>
          </p>
          <p className="text-slate-400 mb-8">
            Browse the eternal resting place of our collective digital shame
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => navigate('/bury')}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold px-8 py-3 text-lg shadow-lg shadow-green-500/25 transform transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Bury Something
            </Button>
            
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-slate-400" />
              <Select value={sortBy} onValueChange={(value: 'newest' | 'popular' | 'category') => setSortBy(value)}>
                <SelectTrigger className="w-40 bg-slate-800/50 border-slate-600 text-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="newest">🕐 Newest</SelectItem>
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
              🪦 All Graves
            </TabsTrigger>
            <TabsTrigger value="featured" className="data-[state=active]:bg-red-600">
              👑 Featured
            </TabsTrigger>
            <TabsTrigger value="trending" className="data-[state=active]:bg-orange-600">
              🔥 Trending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            {/* Featured Section */}
            {featuredGraves.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">👑</span>
                  <h2 className="text-2xl font-bold text-slate-200">Featured Graves</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 to-transparent"></div>
                </div>
                
                <GraveGrid 
                  graves={featuredGraves} 
                  loading={loading}
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
              </div>
              
              <GraveGrid 
                graves={regularGraves} 
                loading={loading}
                onReaction={handleReaction}
              />
            </div>
          </TabsContent>

          <TabsContent value="featured" className="mt-8">
            <GraveGrid 
              graves={featuredGraves} 
              loading={loading}
              onReaction={handleReaction}
            />
          </TabsContent>

          <TabsContent value="trending" className="mt-8">
            <GraveGrid 
              graves={graves.slice(0, 9)} // Top 9 for now
              loading={loading}
              onReaction={handleReaction}
            />
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {!loading && graves.length === 0 && (
          <div className="text-center py-20">
            <span className="text-8xl block mb-6">👻</span>
            <h3 className="text-2xl text-slate-300 mb-4">The graveyard is empty...</h3>
            <p className="text-slate-400 mb-8">Be the first to bury something shameful!</p>
            <Button
              onClick={() => navigate('/bury')}
              className="bg-green-600 hover:bg-green-500 px-8 py-3"
            >
              Create First Grave
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Graveyard;


import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useSearchParams } from 'react-router-dom';
import GraveCard from '@/components/GraveCard';
import StatsCounter from '@/components/StatsCounter';
import { mockGraves, categories, getTrendingGraves, getRecentGraves, getGravesByCategory } from '@/data/mockGraves';
import { Search, Filter, Flame, Clock, Star } from 'lucide-react';

const Graveyard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'recent');
  const [displayedGraves, setDisplayedGraves] = useState(12);

  const getFilteredGraves = () => {
    let graves = [...mockGraves];
    
    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      graves = graves.filter(grave =>
        grave.title.toLowerCase().includes(searchLower) ||
        grave.epitaph.toLowerCase().includes(searchLower) ||
        grave.author.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      graves = graves.filter(grave => grave.category === selectedCategory);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'trending':
        graves.sort((a, b) => (b.shares + b.reactions.skull + b.reactions.fire) - (a.shares + a.reactions.skull + a.reactions.fire));
        break;
      case 'most-shared':
        graves.sort((a, b) => b.shares - a.shares);
        break;
      case 'most-reactions':
        graves.sort((a, b) => {
          const aTotal = Object.values(a.reactions).reduce((sum, count) => sum + count, 0);
          const bTotal = Object.values(b.reactions).reduce((sum, count) => sum + count, 0);
          return bTotal - aTotal;
        });
        break;
      case 'recent':
      default:
        graves.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        break;
    }
    
    return graves;
  };

  const filteredGraves = getFilteredGraves();
  const visibleGraves = filteredGraves.slice(0, displayedGraves);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (sortBy !== 'recent') params.set('sort', sortBy);
    setSearchParams(params);
  }, [selectedCategory, sortBy, setSearchParams]);

  const handleGraveClick = (graveId: string) => {
    navigate(`/grave/${graveId}`);
  };

  const loadMore = () => {
    setDisplayedGraves(prev => prev + 12);
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case 'trending': return { icon: Flame, text: 'Trending Graves', color: 'text-red-400' };
      case 'most-shared': return { icon: Star, text: 'Most Shared', color: 'text-yellow-400' };
      case 'most-reactions': return { icon: Star, text: 'Most Reactions', color: 'text-blue-400' };
      default: return { icon: Clock, text: 'Recent Burials', color: 'text-green-400' };
    }
  };

  const sortLabel = getSortLabel();
  const SortIcon = sortLabel.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Floating spirits and elements */}
        {[...Array(10)].map((_, i) => {
          const elements = ['👻', '💀', '⚰️', '🕯️', '🦇'];
          return (
            <div
              key={`spirit-${i}`}
              className="absolute text-2xl opacity-10 animate-float"
              style={{
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 80}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            >
              {elements[Math.floor(Math.random() * elements.length)]}
            </div>
          );
        })}
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-red-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-8 relative">
            <span className="text-8xl block mb-4 animate-bounce" style={{ animationDuration: '3s' }}>🪦</span>
            <div className="absolute -top-4 -left-8 text-4xl animate-float opacity-40">
              ⚰️
            </div>
            <div className="absolute -top-2 -right-6 text-3xl animate-float opacity-30" style={{ animationDelay: '1s' }}>
              🕯️
            </div>
            <div className="absolute top-8 -left-4 text-2xl animate-float opacity-20" style={{ animationDelay: '2s' }}>
              👻
            </div>
          </div>
          
          <h1 className="font-creepster text-4xl md:text-6xl text-green-400 glow-text mb-6">
            The Digital Cemetery
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            Where <span className="text-red-400 font-bold">{filteredGraves.length} digital souls</span> rest in eternal darkness
          </p>
          <p className="text-slate-400">
            Browse the monuments to humanity's digital failures and regrets
          </p>
        </div>

        {/* Live Stats */}
        <StatsCounter />

        {/* Search and Filters */}
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 mb-12 shadow-lg">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search the depths of digital shame..."
                className="pl-12 bg-slate-900/50 border-slate-600 text-slate-200 placeholder-slate-500 focus:border-green-500 focus:ring-green-500/20 h-12 text-lg"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-slate-400" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[200px] bg-slate-900/50 border-slate-600 text-slate-200 focus:border-green-500 focus:ring-green-500/20">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all" className="text-slate-200 focus:bg-slate-700">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-slate-200 focus:bg-slate-700">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px] bg-slate-900/50 border-slate-600 text-slate-200 focus:border-green-500 focus:ring-green-500/20">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="recent" className="text-slate-200 focus:bg-slate-700">Most Recent</SelectItem>
                  <SelectItem value="trending" className="text-slate-200 focus:bg-slate-700">Trending</SelectItem>
                  <SelectItem value="most-shared" className="text-slate-200 focus:bg-slate-700">Most Shared</SelectItem>
                  <SelectItem value="most-reactions" className="text-slate-200 focus:bg-slate-700">Most Reactions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-3">
              {selectedCategory !== 'all' && (
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border-slate-600"
                  onClick={() => setSelectedCategory('all')}
                >
                  Category: {selectedCategory} ✕
                </Badge>
              )}
              {searchTerm && (
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border-slate-600"
                  onClick={() => setSearchTerm('')}
                >
                  Search: "{searchTerm}" ✕
                </Badge>
              )}
              {(selectedCategory !== 'all' || searchTerm) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                  }}
                  className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold flex items-center gap-4 ${sortLabel.color}`}>
            <SortIcon className="w-8 h-8 animate-pulse" />
            <span className="bg-gradient-to-r from-current to-current bg-clip-text">
              {sortLabel.text}
            </span>
          </h2>
          <div className="text-slate-400 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/30">
            Showing {visibleGraves.length} of {filteredGraves.length} graves
          </div>
        </div>

        {/* Graves Grid */}
        {visibleGraves.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {visibleGraves.map((grave, index) => (
                <GraveCard
                  key={grave.id}
                  grave={grave}
                  onClick={() => handleGraveClick(grave.id)}
                  className="tombstone-rise"
                  style={{ animationDelay: `${index * 0.05}s` }}
                />
              ))}
            </div>

            {/* Load More */}
            {displayedGraves < filteredGraves.length && (
              <div className="text-center mb-16">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={loadMore}
                  className="border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-400 px-8 py-4 text-lg font-medium transform transition-all duration-300 hover:scale-105"
                >
                  Unearth More Graves ({filteredGraves.length - displayedGraves} remain buried)
                </Button>
              </div>
            )}
          </>
        ) : (
          /* No Results */
          <div className="text-center py-20">
            <div className="mb-8 relative">
              <span className="text-8xl block mb-4 opacity-30">💀</span>
              <div className="absolute -top-4 -left-6 text-4xl opacity-20 animate-float">
                👻
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-300 mb-4">The Void Echoes Empty</h3>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              {searchTerm
                ? `No digital souls match "${searchTerm}" in our cemetery`
                : selectedCategory !== 'all'
                ? `The ${selectedCategory} section of our graveyard lies barren`
                : 'No graves match your dark desires'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSortBy('recent');
                }}
                className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
              >
                Clear the Curse
              </Button>
              <Button
                onClick={() => navigate('/bury')}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/25"
              >
                Be the First Soul to Bury
              </Button>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center py-20 border-t border-slate-700/30 mt-16">
          <div className="mb-8 relative">
            <span className="text-6xl block mb-4 animate-pulse">⚱️</span>
            <div className="absolute -top-2 -left-8 text-3xl animate-float opacity-40">
              🕯️
            </div>
            <div className="absolute -top-4 -right-6 text-2xl animate-float opacity-30" style={{ animationDelay: '1s' }}>
              👻
            </div>
          </div>
          <h3 className="text-4xl font-bold text-slate-200 mb-6">
            Ready to Bury Your Digital Sins?
          </h3>
          <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join the thousands who have found peace through permanent digital burial. 
            From $1, your regrets can rest in <span className="text-red-400 font-bold">eternal darkness</span>, 
            never to haunt you again.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold py-6 px-10 text-xl shadow-lg shadow-purple-500/25 transform transition-all duration-300 hover:scale-110"
            onClick={() => navigate('/bury')}
          >
            <span className="text-2xl mr-3">🪦</span>
            Start Digging Your Grave
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Graveyard;

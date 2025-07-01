
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
      case 'trending': return { icon: Flame, text: 'Trending Graves', color: 'text-accent' };
      case 'most-shared': return { icon: Star, text: 'Most Shared', color: 'text-yellow-400' };
      case 'most-reactions': return { icon: Star, text: 'Most Reactions', color: 'text-blue-400' };
      default: return { icon: Clock, text: 'Recent Burials', color: 'text-primary' };
    }
  };

  const sortLabel = getSortLabel();
  const SortIcon = sortLabel.icon;

  return (
    <div className="min-h-screen cemetery-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-6xl block mb-4 float-animation">🪦</span>
          <h1 className="font-creepster text-3xl md:text-4xl text-primary glow-text mb-4">
            The Internet Graveyard
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Browse {filteredGraves.length} digital burials and counting...
          </p>
        </div>

        {/* Live Stats */}
        <StatsCounter />

        {/* Search and Filters */}
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 mb-8">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search graves, epitaphs, or authors..."
                className="pl-10 bg-background/50"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] bg-background/50">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-background/50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="most-shared">Most Shared</SelectItem>
                  <SelectItem value="most-reactions">Most Reactions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'all' && (
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory('all')}
                >
                  Category: {selectedCategory} ✕
                </Badge>
              )}
              {searchTerm && (
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer"
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
                  className="text-xs"
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3 ${sortLabel.color}`}>
            <SortIcon className="w-7 h-7" />
            {sortLabel.text}
          </h2>
          <div className="text-muted-foreground">
            Showing {visibleGraves.length} of {filteredGraves.length} graves
          </div>
        </div>

        {/* Graves Grid */}
        {visibleGraves.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
              <div className="text-center mb-12">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={loadMore}
                  className="border-primary/50 text-primary hover:bg-primary/10"
                >
                  Load More Graves ({filteredGraves.length - displayedGraves} remaining)
                </Button>
              </div>
            )}
          </>
        ) : (
          /* No Results */
          <div className="text-center py-16">
            <span className="text-6xl block mb-4">💀</span>
            <h3 className="text-xl font-bold text-foreground mb-2">No graves found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm
                ? `No graves match "${searchTerm}"`
                : selectedCategory !== 'all'
                ? `No graves in the ${selectedCategory} category yet`
                : 'No graves match your current filters'
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
              >
                Clear All Filters
              </Button>
              <Button
                onClick={() => navigate('/bury')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Be the First to Bury
              </Button>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center py-16 border-t border-border/20">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Bury Your Own Digital Regret?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join the thousands who have found peace through permanent digital burial. 
            From $1, your regrets can rest in peace forever.
          </p>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 blood-glow"
            onClick={() => navigate('/bury')}
          >
            🪦 Start Digging Your Grave
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Graveyard;

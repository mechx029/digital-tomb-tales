
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import StatsCounter from '@/components/StatsCounter';
import GraveCard from '@/components/GraveCard';
import { getTrendingGraves, getRecentGraves, categories, getGravesByCategory } from '@/data/mockGraves';
import { Flame, Clock, Filter, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  const getDisplayGraves = () => {
    let graves = sortBy === 'trending' ? getTrendingGraves(20) : getRecentGraves(20);
    
    if (selectedCategory !== 'all') {
      graves = graves.filter(grave => grave.category === selectedCategory);
    }
    
    return graves;
  };

  const displayGraves = getDisplayGraves();

  const handleGraveClick = (graveId: string) => {
    navigate(`/grave/${graveId}`);
  };

  return (
    <div className="min-h-screen cemetery-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <span className="text-6xl block mb-4 float-animation">💀</span>
          </div>
          <h1 className="font-creepster text-3xl md:text-4xl text-primary glow-text mb-4">
            Welcome to the Internet Graveyard
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Hello {user?.email}! Ready to bury some digital regrets?
          </p>
          
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 ghost-glow"
            onClick={() => navigate('/bury')}
          >
            <Plus className="mr-2 w-5 h-5" />
            🪦 Bury Something
          </Button>
        </div>

        {/* Live Stats */}
        <StatsCounter />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] bg-card/50 backdrop-blur-sm">
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
            <SelectTrigger className="w-[180px] bg-card/50 backdrop-blur-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center justify-center gap-3">
            {sortBy === 'trending' ? (
              <>
                <Flame className="w-7 h-7 text-accent" />
                Trending Graves (24h)
                <Flame className="w-7 h-7 text-accent" />
              </>
            ) : (
              <>
                <Clock className="w-7 h-7 text-primary" />
                Recent Burials
                <Clock className="w-7 h-7 text-primary" />
              </>
            )}
          </h2>
          
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="mt-2">
              Filtering by: {selectedCategory}
            </Badge>
          )}
        </div>

        {/* Graves Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayGraves.map((grave, index) => (
            <GraveCard
              key={grave.id}
              grave={grave}
              onClick={() => handleGraveClick(grave.id)}
              className={`tombstone-rise`}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>

        {displayGraves.length === 0 && (
          <div className="text-center py-16">
            <span className="text-6xl block mb-4">🪦</span>
            <h3 className="text-xl font-bold text-foreground mb-2">No graves found</h3>
            <p className="text-muted-foreground mb-6">
              {selectedCategory !== 'all' 
                ? `No graves in the ${selectedCategory} category yet.`
                : 'No graves match your current filters.'
              }
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('all');
                setSortBy('recent');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA Footer */}
        <div className="text-center py-16 border-t border-border/20">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Add Your Own Digital Corpse?
          </h3>
          <p className="text-muted-foreground mb-6">
            Join thousands who have found peace through permanent burial
          </p>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 blood-glow"
            onClick={() => navigate('/bury')}
          >
            Start Digging Your Grave
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

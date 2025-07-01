
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import StatsCounter from '@/components/StatsCounter';
import GraveCard from '@/components/GraveCard';
import { getTrendingGraves, getFeaturedGraves, getRecentGraves } from '@/data/mockGraves';
import { ArrowRight, Share, Flame, Clock, Star } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const trendingGraves = getTrendingGraves(6);
  const featuredGraves = getFeaturedGraves().slice(0, 3);
  const recentGraves = getRecentGraves(6);

  const handleCTAClick = () => {
    if (user) {
      navigate('/bury');
    } else {
      navigate('/signup');
    }
  };

  const handleGraveClick = (graveId: string) => {
    navigate(`/grave/${graveId}`);
  };

  return (
    <div className="min-h-screen cemetery-bg">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 float-animation">
            <span className="text-8xl block mb-4">💀</span>
          </div>
          
          <h1 className="font-creepster text-4xl md:text-6xl lg:text-7xl text-primary glow-text mb-6">
            The Internet Graveyard
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/90 mb-8 leading-relaxed">
            Where digital things come to <span className="text-accent font-bold">die forever</span> for $1.
            <br />
            <span className="text-muted-foreground">No resurrections allowed.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4 ghost-glow"
              onClick={handleCTAClick}
            >
              🪦 Bury Something Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-primary/50 text-primary hover:bg-primary/10"
              onClick={() => navigate('/graveyard')}
            >
              Browse Graves
            </Button>
          </div>
          
          <StatsCounter />
        </div>
      </section>

      {/* Featured Graves Carousel */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Star className="w-8 h-8 text-accent" />
            Featured Burials
            <Star className="w-8 h-8 text-accent" />
          </h2>
          <p className="text-muted-foreground text-lg">The cream of the digital corpse crop</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredGraves.map((grave) => (
            <GraveCard
              key={grave.id}
              grave={grave}
              onClick={() => handleGraveClick(grave.id)}
              className="tombstone-rise"
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button
            variant="outline"
            className="border-accent/50 text-accent hover:bg-accent/10"
            onClick={() => navigate('/graveyard')}
          >
            View All Featured Graves
          </Button>
        </div>
      </section>

      {/* Trending & Recent Split */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Trending */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Flame className="w-7 h-7 text-accent" />
              Trending Graves (24h)
            </h2>
            <div className="space-y-4">
              {trendingGraves.slice(0, 3).map((grave) => (
                <GraveCard
                  key={grave.id}
                  grave={grave}
                  onClick={() => handleGraveClick(grave.id)}
                />
              ))}
            </div>
            <div className="mt-6">
              <Button
                variant="ghost"
                className="text-accent hover:text-accent/80"
                onClick={() => navigate('/graveyard?sort=trending')}
              >
                See All Trending →
              </Button>
            </div>
          </div>

          {/* Recent */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Clock className="w-7 h-7 text-primary" />
              Fresh Burials
            </h2>
            <div className="space-y-4">
              {recentGraves.slice(0, 3).map((grave) => (
                <GraveCard
                  key={grave.id}
                  grave={grave}
                  onClick={() => handleGraveClick(grave.id)}
                />
              ))}
            </div>
            <div className="mt-6">
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80"
                onClick={() => navigate('/graveyard?sort=recent')}
              >
                See All Recent →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Burial Packages
          </h2>
          <p className="text-muted-foreground text-lg">Choose how you want to bury your digital regrets</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-center">
                <div className="text-2xl mb-2">⚰️</div>
                <div className="text-lg">Basic</div>
                <div className="text-2xl font-bold text-primary">$1</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Text burial</li>
                <li>• Public memorial</li>
                <li>• Share anywhere</li>
                <li>• Forever buried</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-center">
                <div className="text-2xl mb-2">📸</div>
                <div className="text-lg">Premium</div>
                <div className="text-2xl font-bold text-accent">$3</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Text + Image</li>
                <li>• Enhanced memorial</li>
                <li>• Priority display</li>
                <li>• Social sharing</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-secondary/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-center">
                <div className="text-2xl mb-2">🎬</div>
                <div className="text-lg">Video</div>
                <div className="text-2xl font-bold text-secondary">$5</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 10-sec video</li>
                <li>• Moving memorial</li>
                <li>• Viral potential</li>
                <li>• Maximum impact</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-yellow-500/30 transition-all duration-300 blood-glow">
            <CardHeader>
              <CardTitle className="text-center">
                <div className="text-2xl mb-2">👑</div>
                <div className="text-lg">Featured</div>
                <div className="text-2xl font-bold text-yellow-400">$10</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Top placement 24h</li>
                <li>• Featured badge</li>
                <li>• Maximum visibility</li>
                <li>• Guaranteed viral</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-8">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleCTAClick}
          >
            Start Digging Graves
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="text-4xl mb-4 block">💀</span>
            <p className="text-lg text-muted-foreground font-creepster">
              "What dies on the internet, stays on the internet... forever."
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground space-y-2 max-w-2xl mx-auto">
            <p>
              <strong>Disclaimer:</strong> This is a satirical platform for entertainment purposes. 
              No actual resurrections are performed. Your regrets remain permanently buried.
            </p>
            <p>
              By using The Internet Graveyard, you acknowledge that some things are better left dead.
            </p>
          </div>
          
          <div className="mt-8 text-muted-foreground">
            <p>&copy; 2024 The Internet Graveyard. All souls reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

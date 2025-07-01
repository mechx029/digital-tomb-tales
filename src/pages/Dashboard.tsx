
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import StatsCounter from '@/components/StatsCounter';
import GraveCard from '@/components/GraveCard';
import { getTrendingGraves, getRecentGraves, getFeaturedGraves } from '@/data/mockGraves';
import { Flame, Clock, Star, Plus, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [trendingGraves] = useState(getTrendingGraves(6));
  const [recentGraves] = useState(getRecentGraves(6));
  const [featuredGraves] = useState(getFeaturedGraves().slice(0, 3));

  const handleGraveClick = (graveId: string) => {
    navigate(`/grave/${graveId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
        
        {/* Floating spirits */}
        {[...Array(5)].map((_, i) => (
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
            👻
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <div className="mb-6 relative">
            <span className="text-7xl block mb-4 animate-bounce" style={{ animationDuration: '3s' }}>💀</span>
            <div className="absolute -top-2 -left-8 text-3xl animate-float opacity-40">
              ⚰️
            </div>
            <div className="absolute -top-4 -right-6 text-2xl animate-float opacity-30" style={{ animationDelay: '1s' }}>
              🕯️
            </div>
          </div>
          
          <h1 className="font-creepster text-4xl md:text-6xl text-green-400 glow-text mb-4">
            Welcome to the Graveyard
          </h1>
          <p className="text-xl text-slate-300 mb-6">
            {user?.email ? `Welcome back, ${user.email}` : 'Welcome, lost soul'} 
          </p>
          <p className="text-slate-400 mb-8">
            Where digital regrets come to rest in <span className="text-red-400 font-bold">eternal darkness</span>
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-4 px-8 text-lg shadow-lg shadow-red-500/25 transform transition-all duration-300 hover:scale-110 mb-8"
            onClick={() => navigate('/bury')}
          >
            <Plus className="w-6 h-6 mr-2" />
            🪦 Bury Something Now
          </Button>
        </div>

        {/* Live Stats */}
        <StatsCounter />

        {/* Featured Graves */}
        {featuredGraves.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-200 flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Featured Graves
                </span>
              </h2>
              <Button
                variant="ghost"
                className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
                onClick={() => navigate('/graveyard')}
              >
                View All →
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGraves.map((grave, index) => (
                <GraveCard
                  key={grave.id}
                  grave={grave}
                  onClick={() => handleGraveClick(grave.id)}
                  className="tombstone-rise"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Trending & Recent Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Trending Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-200 flex items-center gap-3">
                <Flame className="w-7 h-7 text-red-400 animate-pulse" />
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Trending Graves
                </span>
              </h2>
              <Button
                variant="ghost"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                onClick={() => navigate('/graveyard?sort=trending')}
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                See All
              </Button>
            </div>
            
            <div className="space-y-6">
              {trendingGraves.slice(0, 3).map((grave, index) => (
                <GraveCard
                  key={grave.id}
                  grave={grave}
                  onClick={() => handleGraveClick(grave.id)}
                  className="tombstone-rise"
                  style={{ animationDelay: `${index * 0.15}s` }}
                />
              ))}
            </div>
            
            {trendingGraves.length === 0 && (
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 text-center py-12">
                <CardContent>
                  <span className="text-6xl mb-4 block opacity-50">💀</span>
                  <p className="text-slate-400">No trending graves yet. Be the first to create viral content!</p>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Recent Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-200 flex items-center gap-3">
                <Clock className="w-7 h-7 text-green-400 animate-pulse" />
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Fresh Burials
                </span>
              </h2>
              <Button
                variant="ghost"
                className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                onClick={() => navigate('/graveyard?sort=recent')}
              >
                <Clock className="w-4 h-4 mr-1" />
                See All
              </Button>
            </div>
            
            <div className="space-y-6">
              {recentGraves.slice(0, 3).map((grave, index) => (
                <GraveCard
                  key={grave.id}
                  grave={grave}
                  onClick={() => handleGraveClick(grave.id)}
                  className="tombstone-rise"
                  style={{ animationDelay: `${(index * 0.15) + 0.3}s` }}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-16 mt-16 border-t border-slate-700/30">
          <h3 className="text-3xl font-bold text-slate-200 mb-4 flex items-center justify-center gap-3">
            <span className="text-4xl animate-bounce">⚱️</span>
            Ready to Bury Your Digital Shame?
          </h3>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
            Join the thousands who have found peace through permanent digital burial. 
            From $1, your regrets can rest in <span className="text-red-400 font-bold">eternal darkness</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold py-4 px-8 text-lg shadow-lg shadow-purple-500/25 transform transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/bury')}
            >
              <span className="text-xl mr-2">🪦</span>
              Start Digging Your Grave
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-slate-600 text-slate-300 hover:bg-slate-700/50 py-4 px-8 text-lg"
              onClick={() => navigate('/graveyard')}
            >
              Browse All Graves
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

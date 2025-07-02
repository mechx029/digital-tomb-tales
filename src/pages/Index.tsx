import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Skull, Zap, Crown, Users } from 'lucide-react';
import LiveStatsCounter from '@/components/LiveStatsCounter';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Floating spirits */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-10 animate-float"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          >
            {['💀', '👻', '⚰️', '🕯️'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8 relative">
            <span className="text-8xl md:text-9xl block mb-6 animate-bounce" style={{ animationDuration: '3s' }}>
              ⚰️
            </span>
            {/* Floating spirits animation */}
            <div className="absolute -top-6 -left-12 text-5xl opacity-20 animate-float">
              👻
            </div>
            <div className="absolute -bottom-8 -right-12 text-6xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>
              🕯️
            </div>
          </div>
          
          <h1 className="font-creepster text-4xl md:text-7xl lg:text-8xl text-green-400 glow-text mb-6 leading-tight">
            The Internet Graveyard
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Where digital dreams come to <span className="text-red-400 font-bold animate-pulse">die</span>
          </p>
          
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
            Bury your digital shame, failed projects, and dead memes in our eternal graveyard. 
            Share your digital regrets with the world and let them rest in peace forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              onClick={() => navigate('/bury')}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold px-12 py-4 text-xl shadow-lg shadow-green-500/25 transform transition-all duration-300 hover:scale-105 hover:shadow-green-500/40"
            >
              <span className="text-2xl mr-3">⚰️</span>
              Bury Something
            </Button>
            
            <Button
              onClick={() => navigate('/graveyard')}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:border-slate-500 px-8 py-4 text-lg backdrop-blur-sm"
            >
              <span className="text-xl mr-2">🪦</span>
              Explore Graveyard
            </Button>
          </div>

          {/* Live Stats */}
          <LiveStatsCounter />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm text-center">
            <CardContent className="p-8">
              <div className="text-5xl text-green-400 mb-4 animate-pulse">
                <Skull />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-2">
                Eternal Resting Place
              </h3>
              <p className="text-slate-400">
                Bury your digital regrets forever. No take-backs.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm text-center">
            <CardContent className="p-8">
              <div className="text-5xl text-yellow-400 mb-4 animate-pulse">
                <Zap />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-2">
                Share Your Shame
              </h3>
              <p className="text-slate-400">
                Let the world witness your digital demise.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm text-center">
            <CardContent className="p-8">
              <div className="text-5xl text-red-400 mb-4 animate-pulse">
                <Crown />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-2">
                Become a Legend
              </h3>
              <p className="text-slate-400">
                The most viral burials live on in infamy.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-creepster text-4xl text-green-400 glow-text mb-8">
            What People Are Saying
          </h2>
          
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-2xl text-slate-300 italic mb-4">
                "Finally, a place to bury my crypto losses in peace."
              </div>
              <div className="text-slate-400">
                - @Web3_Lamenter
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="font-creepster text-4xl text-green-400 glow-text mb-8">
            Ready to Bury Your Regrets?
          </h2>
          <Button
            onClick={() => navigate('/bury')}
            className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold px-12 py-4 text-xl shadow-lg shadow-green-500/25 transform transition-all duration-300 hover:scale-105"
          >
            Bury Something Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;

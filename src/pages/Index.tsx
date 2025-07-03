
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
        {[...Array(12)].map((_, i) => (
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

          {/* Live Stats - Updated every few seconds */}
          <div className="mb-16">
            <LiveStatsCounter />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm text-center hover:border-green-500/30 transition-all duration-300">
            <CardContent className="p-8">
              <div className="text-5xl text-green-400 mb-4 animate-pulse">
                <Skull />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-2">
                Eternal Resting Place
              </h3>
              <p className="text-slate-400">
                Bury your digital regrets forever. No take-backs, bestie.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm text-center hover:border-yellow-500/30 transition-all duration-300">
            <CardContent className="p-8">
              <div className="text-5xl text-yellow-400 mb-4 animate-pulse">
                <Zap />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-2">
                Share Your Shame
              </h3>
              <p className="text-slate-400">
                Let the world witness your digital demise. The internet never forgets.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm text-center hover:border-red-500/30 transition-all duration-300">
            <CardContent className="p-8">
              <div className="text-5xl text-red-400 mb-4 animate-pulse">
                <Crown />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-2">
                Become a Legend
              </h3>
              <p className="text-slate-400">
                The most viral burials live on in infamy. Touch grass was never an option.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Feed */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="font-creepster text-4xl text-green-400 glow-text mb-8 text-center">
            Recent Digital Deaths
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">💀</span>
                  <span className="text-green-400 font-semibold">@CryptoRegretQueen</span>
                  <span className="text-slate-500 text-sm">2min ago</span>
                </div>
                <p className="text-slate-300 italic">
                  "Just buried my NFT collection. Paid 50 ETH, now worth 0.001 ETH. The math ain't mathing."
                </p>
                <div className="flex gap-4 mt-3 text-sm text-slate-400">
                  <span>💀 2.3K</span>
                  <span>🔥 892</span>
                  <span>😭 5.1K</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">👻</span>
                  <span className="text-purple-400 font-semibold">@MainCharacterFail</span>
                  <span className="text-slate-500 text-sm">5min ago</span>
                </div>
                <p className="text-slate-300 italic">
                  "My 'healing era' lasted exactly 47 minutes. Currently crying to Taylor Swift again."
                </p>
                <div className="flex gap-4 mt-3 text-sm text-slate-400">
                  <span>💀 1.8K</span>
                  <span>🔥 456</span>
                  <span>😭 3.2K</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-creepster text-4xl text-green-400 glow-text mb-8">
            What People Are Saying
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-xl text-slate-300 italic mb-4">
                  "Finally, a place to bury my crypto losses in peace. The community here gets it."
                </div>
                <div className="text-slate-400">
                  - @Web3_Lamenter
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-xl text-slate-300 italic mb-4">
                  "Buried my entire Duolingo streak here. The owl will never find me now."
                </div>
                <div className="text-slate-400">
                  - @LinguisticFailure
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="font-creepster text-4xl text-green-400 glow-text mb-8">
            Ready to Bury Your Regrets?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Join thousands of others who've found peace in our digital cemetery
          </p>
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

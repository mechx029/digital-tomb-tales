
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Share } from 'lucide-react';
import { Grave } from '@/hooks/useRealTimeGraves';
import { useToast } from '@/hooks/use-toast';

interface GraveGridProps {
  graves: Grave[];
  loading?: boolean;
  onReaction?: (graveId: string, type: 'skull' | 'fire' | 'crying' | 'clown') => void;
}

const GraveGrid: React.FC<GraveGridProps> = ({ graves, loading, onReaction }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  console.log('🎬 GraveGrid render - received graves:', graves?.length || 0);
  console.log('📋 GraveGrid graves data:', graves);

  const handleShare = async (grave: Grave, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/grave/${grave.id}`;
    
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Grave link copied! 💀",
        description: "Share this digital burial with the world",
      });
    } catch (error) {
      toast({
        title: "Failed to copy link",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const getReactionCount = (grave: Grave, type: 'skull' | 'fire' | 'crying' | 'clown') => {
    return grave.reactions?.filter(r => r.reaction_type === type).length || 0;
  };

  if (loading) {
    console.log('⏳ GraveGrid showing loading state');
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-slate-800/50 border-slate-700/50 animate-pulse">
            <CardHeader className="pb-3">
              <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-700 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-slate-700 rounded mb-4"></div>
              <div className="h-3 bg-slate-700 rounded mb-2"></div>
              <div className="h-3 bg-slate-700 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!graves || graves.length === 0) {
    console.log('❌ GraveGrid showing empty state - no graves to display');
    return (
      <div className="text-center py-12">
        <span className="text-6xl block mb-4">👻</span>
        <h3 className="text-xl text-slate-300 mb-2">No graves found</h3>
        <p className="text-slate-500">The graveyard is empty... for now</p>
        <p className="text-xs text-slate-600 mt-2">Debug: Expected graves but got {graves?.length || 0}</p>
      </div>
    );
  }

  console.log('✅ GraveGrid rendering', graves.length, 'graves');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {graves.map((grave, index) => {
        console.log(`🪦 Rendering grave ${index + 1}:`, grave.title, 'ID:', grave.id);
        
        return (
          <Card
            key={grave.id}
            className="group relative cursor-pointer bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-slate-700/50 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
            onClick={() => {
              console.log('🔗 Navigating to grave:', grave.id);
              navigate(`/grave/${grave.id}`);
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardHeader className="pb-3 relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl animate-pulse group-hover:animate-bounce">🪦</span>
                    {grave.featured && (
                      <Badge className="bg-red-600/80 text-red-100 animate-pulse">
                        ⚰️ Featured
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs bg-slate-700/50 text-slate-300 border-slate-600">
                      {grave.category}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg text-slate-100 leading-tight group-hover:text-green-400 transition-colors duration-300 line-clamp-2">
                    {grave.title}
                  </h3>
                </div>
              </div>
              
              <div className="text-sm text-slate-400 flex items-center gap-2">
                <span>By {grave.profiles?.display_name || grave.profiles?.username || 'Anonymous'}</span>
                <span>•</span>
                <span>{new Date(grave.created_at).toLocaleDateString()}</span>
              </div>
            </CardHeader>

            <CardContent className="pt-0 relative z-10">
              {/* Media Preview */}
              {(grave.image_url || grave.video_url) && (
                <div className="relative mb-4 rounded-lg overflow-hidden">
                  {grave.image_url && (
                    <img 
                      src={grave.image_url}
                      alt={grave.title}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        console.log('🖼️ Image failed to load:', grave.image_url);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  {grave.video_url && (
                    <div className="relative">
                      <video 
                        src={grave.video_url}
                        className="w-full h-32 object-cover"
                        muted
                        onError={(e) => {
                          console.log('🎥 Video failed to load:', grave.video_url);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="w-8 h-8 text-white/80" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Epitaph */}
              <div className="relative p-3 bg-slate-800/30 rounded-lg border border-slate-700/30 mb-4">
                <p className="text-slate-200 italic text-sm leading-relaxed text-center line-clamp-3">
                  "{grave.epitaph}"
                </p>
              </div>

              {/* Reactions */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {(['skull', 'fire', 'crying', 'clown'] as const).map((type) => {
                  const count = getReactionCount(grave, type);
                  const emoji = { skull: '💀', fire: '🔥', crying: '😭', clown: '🤡' }[type];
                  
                  return (
                    <Button
                      key={type}
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs transition-all duration-300 transform hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('👆 Reaction clicked:', type, 'for grave:', grave.id);
                        onReaction?.(grave.id, type);
                      }}
                    >
                      <span className="mr-1">{emoji}</span>
                      {count}
                    </Button>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-slate-700/30 pt-3">
                <div className="text-xs text-slate-400">
                  {grave._count?.reactions || 0} reactions • {grave.shares || 0} shares
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleShare(grave, e)}
                  className="text-green-400 hover:text-green-300 hover:bg-green-500/10 text-xs"
                >
                  <Share className="w-3 h-3 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default GraveGrid;

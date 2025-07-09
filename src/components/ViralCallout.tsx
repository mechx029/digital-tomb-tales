
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, Share2, Users, Eye } from 'lucide-react';

const ViralCallout: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border-red-500/30 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 animate-pulse" />
      
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-red-400 animate-bounce" />
            <Badge className="bg-red-600/80 text-red-100 animate-pulse">
              🔥 GOING VIRAL
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              12.3K views
            </div>
            <div className="flex items-center gap-1">
              <Share2 className="w-4 h-4" />
              847 shares
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              231 online
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-100 mb-2">
          💀 Join the Digital Funeral Procession
        </h3>
        <p className="text-slate-300 mb-4">
          Your failures deserve a proper burial. Share your digital shame with thousands who get it. 
          From crypto losses to LinkedIn cringe - we've all been there.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold"
          >
            💀 Bury Your Shame
          </Button>
          <Button 
            variant="outline" 
            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            👻 Browse the Graveyard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViralCallout;

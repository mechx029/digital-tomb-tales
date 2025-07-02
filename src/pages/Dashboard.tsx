
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserGraves } from '@/hooks/useGraves';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skull, Users, Flame, Edit, Trash2 } from 'lucide-react';
import GraveGrid from '@/components/GraveGrid';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const { graves, loading } = useUserGraves();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('graves');

  if (!user) {
    navigate('/auth');
    return null;
  }

  const totalReactions = graves.reduce((sum, grave) => sum + (grave._count?.reactions || 0), 0);
  const topGrave = graves.sort((a, b) => (b._count?.reactions || 0) - (a._count?.reactions || 0))[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Profile Header */}
        <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-slate-700/50 mb-8">
          <CardHeader className="text-center py-8">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24 border-4 border-green-500/30">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-slate-700 text-slate-200 text-2xl">
                  {profile?.display_name?.[0] || profile?.username?.[0] || '👻'}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h1 className="text-3xl font-bold text-slate-100 mb-2">
                  {profile?.display_name || profile?.username}
                </h1>
                <p className="text-slate-400">@{profile?.username}</p>
                {profile?.bio && (
                  <p className="text-slate-300 mt-2 max-w-md">{profile.bio}</p>
                )}
              </div>

              <Button
                variant="outline"
                className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                onClick={() => navigate('/profile/edit')}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Skull className="w-6 h-6 text-green-400" />
                <span className="text-3xl font-bold text-green-400">
                  {graves.length}
                </span>
              </div>
              <p className="text-slate-400">Total Graves</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flame className="w-6 h-6 text-red-400" />
                <span className="text-3xl font-bold text-red-400">
                  {totalReactions}
                </span>
              </div>
              <p className="text-slate-400">Reactions Received</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6 text-blue-400" />
                <span className="text-3xl font-bold text-blue-400">
                  {profile?.level || 1}
                </span>
              </div>
              <p className="text-slate-400">Level</p>
            </CardContent>
          </Card>
        </div>

        {/* Top Grave */}
        {topGrave && (
          <Card className="bg-slate-800/50 border-slate-700/50 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-200">
                <span className="text-2xl">👑</span>
                Top Grave
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-200 mb-1">{topGrave.title}</h3>
                  <p className="text-sm text-slate-400 line-clamp-2">"{topGrave.epitaph}"</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">
                    {topGrave._count?.reactions || 0}
                  </div>
                  <div className="text-xs text-slate-500">reactions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="graves" className="data-[state=active]:bg-green-600">
              🪦 My Graves
            </TabsTrigger>
            <TabsTrigger value="reactions" className="data-[state=active]:bg-red-600">
              💀 My Reactions
            </TabsTrigger>
            <TabsTrigger value="followers" className="data-[state=active]:bg-blue-600">
              👻 Following
            </TabsTrigger>
          </TabsList>

          <TabsContent value="graves" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-200">
                Your Digital Burials ({graves.length})
              </h2>
              <Button
                onClick={() => navigate('/bury')}
                className="bg-green-600 hover:bg-green-500"
              >
                Create New Grave
              </Button>
            </div>
            
            <GraveGrid graves={graves} loading={loading} />
          </TabsContent>

          <TabsContent value="reactions" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-8 text-center">
                <span className="text-4xl block mb-4">🔥</span>
                <h3 className="text-lg text-slate-300 mb-2">Reaction History</h3>
                <p className="text-slate-500">
                  Coming soon! Track all the graves you've reacted to.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="followers" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-8 text-center">
                <span className="text-4xl block mb-4">👥</span>
                <h3 className="text-lg text-slate-300 mb-2">Social Features</h3>
                <p className="text-slate-500">
                  Follow system coming soon! Connect with other digital mourners.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

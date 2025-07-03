import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Upload, DollarSign, Crown, Zap, Star } from 'lucide-react';
import { categories } from '@/data/mockGraves';
import MediaUpload from '@/components/MediaUpload';

const BurySubmission = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    epitaph: '',
    category: '',
    package: 'basic' as 'basic' | 'premium' | 'video' | 'featured',
    author: '',
    isAnonymous: false
  });
  
  const [media, setMedia] = useState<{ url: string; type: 'image' | 'video' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const packages = [
    {
      id: 'basic' as const,
      name: 'Basic Burial',
      price: 1,
      icon: '⚰️',
      features: ['Text burial', 'Public memorial', 'Share anywhere', 'Forever buried'],
      color: 'border-slate-600 hover:border-green-500',
      bgColor: 'hover:bg-green-500/5'
    },
    {
      id: 'premium' as const,
      name: 'Premium Memorial',
      price: 3,
      icon: '📸',
      features: ['Text + Image', 'Enhanced memorial', 'Priority display', 'Social sharing'],
      color: 'border-slate-600 hover:border-blue-500',
      bgColor: 'hover:bg-blue-500/5'
    },
    {
      id: 'video' as const,
      name: 'Video Burial',
      price: 5,
      icon: '🎬',
      features: ['10-sec video', 'Moving memorial', 'Viral potential', 'Maximum impact'],
      color: 'border-slate-600 hover:border-purple-500',
      bgColor: 'hover:bg-purple-500/5'
    },
    {
      id: 'featured' as const,
      name: 'Featured Grave',
      price: 10,
      icon: '👑',
      features: ['Top placement 24h', 'Featured badge', 'Maximum visibility', 'Guaranteed viral'],
      color: 'border-yellow-500/50 hover:border-yellow-400',
      bgColor: 'hover:bg-yellow-500/10',
      special: true
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required! 💀",
        description: "Please sign in to bury your digital regrets.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (!formData.title || !formData.epitaph || !formData.category) {
      toast({
        title: "Incomplete burial! 💀",
        description: "Please fill in all required fields to proceed with the burial.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create the grave in database
      const graveData = {
        title: formData.title,
        epitaph: formData.epitaph,
        category: formData.category,
        package_type: formData.package,
        user_id: user.id,
        image_url: media?.type === 'image' ? media.url : null,
        video_url: media?.type === 'video' ? media.url : null,
        published: false, // Will be published after payment confirmation
        payment_confirmed: formData.package === 'basic' // Basic package doesn't require payment
      };

      const { data: grave, error } = await supabase
        .from('graves')
        .insert(graveData)
        .select()
        .single();

      if (error) throw error;

      const selectedPackage = packages.find(p => p.id === formData.package);
      
      if (formData.package === 'basic') {
        // Basic package - publish immediately
        await supabase
          .from('graves')
          .update({ published: true })
          .eq('id', grave.id);

        toast({
          title: "🪦 Burial Complete!",
          description: `Your digital regret has been buried forever. May it rest in peace.`,
        });
        
        navigate('/graveyard');
      } else {
        // Other packages - redirect to payment (to be implemented)
        toast({
          title: "🪦 Grave Created!",
          description: `Your grave is ready for burial. Payment processing coming soon!`,
        });
        
        // For now, publish immediately (remove when payment is implemented)
        await supabase
          .from('graves')
          .update({ published: true, payment_confirmed: true })
          .eq('id', grave.id);
        
        navigate('/graveyard');
      }
    } catch (error) {
      console.error('Error creating grave:', error);
      toast({
        title: "Burial failed! 💀",
        description: "Failed to bury your digital regret. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMediaUpload = (url: string, type: 'image' | 'video') => {
    if (url) {
      setMedia({ url, type });
    } else {
      setMedia(null);
    }
  };

  const handleAnonymousChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      isAnonymous: checked
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-red-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6 relative">
            <span className="text-8xl block mb-4 animate-bounce" style={{ animationDuration: '3s' }}>⚰️</span>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-2xl animate-float opacity-60">
              👻
            </div>
          </div>
          
          <h1 className="font-creepster text-4xl md:text-6xl text-green-400 glow-text mb-4">
            Digital Burial Chamber
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            Lay your digital regrets to <span className="text-red-400 font-bold">eternal rest</span>
          </p>
          <p className="text-slate-400">
            Choose your burial package and let the darkness consume your shame forever.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Burial Packages */}
            <div className="lg:col-span-3 mb-8">
              <h2 className="text-2xl font-bold text-slate-200 mb-6 flex items-center gap-3">
                <Crown className="w-6 h-6 text-yellow-400" />
                Choose Your Burial Package
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {packages.map((pkg) => (
                  <Card
                    key={pkg.id}
                    className={`cursor-pointer transition-all duration-300 transform hover:scale-105 bg-slate-800/50 backdrop-blur-sm ${pkg.color} ${pkg.bgColor} ${
                      formData.package === pkg.id ? 'ring-2 ring-green-500 bg-green-500/10' : ''
                    } ${pkg.special ? 'shadow-lg shadow-yellow-500/20' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, package: pkg.id }))}
                  >
                    <CardHeader className="text-center pb-3">
                      <div className="text-4xl mb-2">{pkg.icon}</div>
                      <CardTitle className="text-lg text-slate-200">{pkg.name}</CardTitle>
                      <div className="text-3xl font-bold text-green-400 flex items-center justify-center gap-1">
                        <DollarSign className="w-6 h-6" />
                        {pkg.price}
                      </div>
                      {pkg.special && (
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          🔥 MOST POPULAR
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-slate-400 space-y-2">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="text-green-400">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Burial Form */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-200 flex items-center gap-3">
                    <span className="text-3xl">🪦</span>
                    Burial Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        What are you burying? *
                      </label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., My NFT collection, My ex's Instagram, Web3 dreams..."
                        className="bg-slate-900/50 border-slate-600 text-slate-200 placeholder-slate-500 focus:border-green-500 focus:ring-green-500/20"
                        required
                      />
                    </div>

                    {/* Epitaph */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Final Words / Epitaph *
                      </label>
                      <Textarea
                        value={formData.epitaph}
                        onChange={(e) => setFormData(prev => ({ ...prev, epitaph: e.target.value }))}
                        placeholder="Write the final words for what you're burying. Be creative, be dramatic, be real..."
                        rows={4}
                        className="bg-slate-900/50 border-slate-600 text-slate-200 placeholder-slate-500 focus:border-green-500 focus:ring-green-500/20"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Category *
                      </label>
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger className="bg-slate-900/50 border-slate-600 text-slate-200 focus:border-green-500 focus:ring-green-500/20">
                          <SelectValue placeholder="Choose a category for your burial" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {categories.map((category) => (
                            <SelectItem key={category} value={category} className="text-slate-200 focus:bg-slate-700">
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Author */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Your Name
                      </label>
                      <Input
                        value={formData.author}
                        onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                        placeholder="How should we credit this burial?"
                        className="bg-slate-900/50 border-slate-600 text-slate-200 placeholder-slate-500 focus:border-green-500 focus:ring-green-500/20"
                        disabled={formData.isAnonymous}
                      />
                    </div>

                    {/* Anonymous */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="anonymous"
                        checked={formData.isAnonymous}
                        onCheckedChange={handleAnonymousChange}
                        className="border-slate-600 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                      />
                      <label htmlFor="anonymous" className="text-sm text-slate-300 cursor-pointer">
                        Bury anonymously (your shame shall remain nameless)
                      </label>
                    </div>

                    {/* Media Upload Section */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Media Upload
                      </label>
                      <MediaUpload
                        packageType={formData.package}
                        onMediaUpload={handleMediaUpload}
                        currentMedia={media}
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-4 text-lg shadow-lg shadow-green-500/25 transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Burying Forever...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-xl">⚰️</span>
                          Bury Forever - ${packages.find(p => p.id === formData.package)?.price}
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <div className="lg:col-span-1">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-200 flex items-center gap-2">
                    <span className="text-2xl">👁️</span>
                    Burial Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🪦</span>
                        <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                          {formData.category || 'Category'}
                        </Badge>
                      </div>
                      
                      <h3 className="font-bold text-slate-200 mb-2">
                        {formData.title || 'Your burial title will appear here...'}
                      </h3>
                      
                      <div className="text-sm text-slate-400 mb-3">
                        By {formData.isAnonymous ? 'Anonymous' : (formData.author || user?.email?.split('@')[0] || 'Anonymous')} • Just now
                      </div>

                      {/* Media Preview */}
                      {media && (
                        <div className="mb-3 rounded overflow-hidden">
                          {media.type === 'image' ? (
                            <img 
                              src={media.url} 
                              alt="Upload preview"
                              className="w-full h-24 object-cover"
                            />
                          ) : (
                            <video 
                              src={media.url}
                              className="w-full h-24 object-cover"
                              muted
                            />
                          )}
                        </div>
                      )}
                      
                      <div className="bg-slate-800/50 rounded p-3 border border-slate-700/30">
                        <p className="text-slate-300 italic text-center text-sm">
                          "{formData.epitaph || 'Your final words will echo here for eternity...'}"
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-700/30">
                        <Button size="sm" variant="ghost" className="text-slate-400 text-xs">
                          💀 0
                        </Button>
                        <Button size="sm" variant="ghost" className="text-slate-400 text-xs">
                          🔥 0
                        </Button>
                        <Button size="sm" variant="ghost" className="text-slate-400 text-xs">
                          😭 0
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-xs text-slate-500 text-center">
                      This is how your burial will appear to the world
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurySubmission;


import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { categories } from '@/data/mockGraves';
import { Upload, DollarSign, Crown, Image as ImageIcon, Video, Package } from 'lucide-react';

const BurySubmission = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [epitaph, setEpitaph] = useState('');
  const [category, setCategory] = useState('');
  const [packageType, setPackageType] = useState('basic');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const packages = [
    {
      id: 'basic',
      name: 'Basic Burial',
      price: 1,
      icon: '⚰️',
      description: 'Text burial with public memorial',
      features: ['Text burial', 'Public memorial', 'Share anywhere', 'Forever buried']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 3,
      icon: '📸',
      description: 'Text + Image with enhanced memorial',
      features: ['Text + Image', 'Enhanced memorial', 'Priority display', 'Social sharing']
    },
    {
      id: 'video',
      name: 'Video Memorial',
      price: 5,
      icon: '🎬',
      description: '10-second video upload',
      features: ['10-sec video', 'Moving memorial', 'Viral potential', 'Maximum impact']
    },
    {
      id: 'featured',
      name: 'Featured',
      price: 10,
      icon: '👑',
      description: 'Top placement for 24 hours',
      features: ['Top placement 24h', 'Featured badge', 'Maximum visibility', 'Guaranteed viral']
    },
    {
      id: 'bundle',
      name: 'Bundle',
      price: 25,
      icon: '📦',
      description: '5 burials at once',
      features: ['5 burials included', 'Mix any types', 'Bulk discount', 'Mass burial']
    }
  ];

  const selectedPackage = packages.find(pkg => pkg.id === packageType);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please choose an image under 5MB",
          variant: "destructive",
        });
        return;
      }
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !epitaph.trim() || !category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create the burial
      const newGrave = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        epitaph,
        author: isAnonymous ? 'Anonymous' : user?.email || 'Unknown',
        category,
        packageType,
        timestamp: new Date().toISOString(),
        reactions: { skull: 0, fire: 0, crying: 0, clown: 0 },
        shares: 0,
        featured: packageType === 'featured',
        image: image ? URL.createObjectURL(image) : undefined
      };

      toast({
        title: "Burial complete! 💀",
        description: `Your ${selectedPackage?.name} burial has been processed`,
      });

      // Redirect to the new grave (simulate)
      navigate(`/grave/${newGrave.id}`, { 
        state: { newGrave, showSharePrompt: true } 
      });
    } catch (error) {
      toast({
        title: "Burial failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen cemetery-bg">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-6xl block mb-4 float-animation">🪦</span>
          <h1 className="font-creepster text-3xl md:text-4xl text-primary glow-text mb-4">
            Bury Something Forever
          </h1>
          <p className="text-muted-foreground text-lg">
            What digital regret needs to rest in peace?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Package Selection */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Choose Your Burial Package
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={packageType} onValueChange={setPackageType}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="relative">
                      <RadioGroupItem
                        value={pkg.id}
                        id={pkg.id}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={pkg.id}
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          packageType === pkg.id
                            ? 'border-primary bg-primary/10 ghost-glow'
                            : 'border-border/50 hover:border-primary/50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">{pkg.icon}</div>
                          <div className="font-bold text-lg">{pkg.name}</div>
                          <div className="text-2xl font-bold text-primary">${pkg.price}</div>
                          <div className="text-sm text-muted-foreground mb-3">
                            {pkg.description}
                          </div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {pkg.features.map((feature, index) => (
                              <li key={index}>• {feature}</li>
                            ))}
                          </ul>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Burial Details */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Burial Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">What are you burying? *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., My NFT Collection, My Ex, My Diet Plans..."
                  className="bg-background/50"
                  maxLength={100}
                />
                <div className="text-xs text-muted-foreground text-right mt-1">
                  {title.length}/100
                </div>
              </div>

              {/* Epitaph */}
              <div>
                <Label htmlFor="epitaph">Epitaph / Last Words *</Label>
                <Textarea
                  id="epitaph"
                  value={epitaph}
                  onChange={(e) => setEpitaph(e.target.value)}
                  placeholder="Write the final words for what you're burying. Make it memorable..."
                  className="bg-background/50 min-h-[120px]"
                  maxLength={500}
                />
                <div className="text-xs text-muted-foreground text-right mt-1">
                  {epitaph.length}/500
                </div>
              </div>

              {/* Category */}
              <div>
                <Label>Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Image Upload */}
              {(packageType === 'premium' || packageType === 'video' || packageType === 'featured') && (
                <div>
                  <Label htmlFor="image">
                    {packageType === 'video' ? 'Video Upload' : 'Image Upload'} 
                    {packageType !== 'video' && ' (Optional)'}
                  </Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="image"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-border/50 border-dashed rounded-lg cursor-pointer bg-background/30 hover:bg-background/50 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {packageType === 'video' ? (
                            <Video className="w-8 h-8 mb-4 text-muted-foreground" />
                          ) : (
                            <ImageIcon className="w-8 h-8 mb-4 text-muted-foreground" />
                          )}
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {packageType === 'video' ? 'MP4, max 10 seconds' : 'PNG, JPG, GIF (max 5MB)'}
                          </p>
                        </div>
                        <input
                          id="image"
                          type="file"
                          className="hidden"
                          accept={packageType === 'video' ? 'video/*' : 'image/*'}
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    {image && (
                      <p className="text-sm text-primary mt-2">
                        ✓ {image.name} selected
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Anonymous Option */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Bury anonymously (hide my email)
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/30 ghost-glow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Burial Summary</span>
                <Badge className="bg-primary text-primary-foreground">
                  ${selectedPackage?.price}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Package:</span>
                  <span className="font-medium">{selectedPackage?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Author:</span>
                  <span className="font-medium">
                    {isAnonymous ? 'Anonymous' : user?.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium">{category || 'Not selected'}</span>
                </div>
                <div className="border-t border-border/50 pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-primary">${selectedPackage?.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-4 text-lg ghost-glow"
              disabled={loading}
            >
              {loading ? (
                'Processing Burial...'
              ) : (
                <>
                  💀 Pay ${selectedPackage?.price} & Bury Forever
                </>
              )}
            </Button>
            
            <p className="text-xs text-muted-foreground mt-4">
              By proceeding, you agree that this burial is permanent and cannot be undone.
              <br />
              All payments are final. No resurrections allowed.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BurySubmission;


import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Play, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MediaUploadProps {
  packageType: 'basic' | 'premium' | 'video' | 'featured';
  onMediaUpload: (url: string, type: 'image' | 'video') => void;
  currentMedia?: { url: string; type: 'image' | 'video' } | null;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ 
  packageType, 
  onMediaUpload, 
  currentMedia 
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const canUploadImage = ['premium', 'video', 'featured'].includes(packageType);
  const canUploadVideo = ['video', 'featured'].includes(packageType);

  const maxFileSize = canUploadVideo ? 20 * 1024 * 1024 : 5 * 1024 * 1024; // 20MB for video, 5MB for image
  const acceptedTypes = canUploadVideo 
    ? 'image/jpeg,image/png,image/webp,video/mp4,video/webm'
    : 'image/jpeg,image/png,image/webp';

  const validateFile = (file: File) => {
    if (file.size > maxFileSize) {
      toast({
        title: "File too large! 💀",
        description: `Max size: ${canUploadVideo ? '20MB' : '5MB'}`,
        variant: "destructive",
      });
      return false;
    }

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!canUploadImage && isImage) {
      toast({
        title: "Upgrade needed! 👑",
        description: "Image uploads require Premium or higher package",
        variant: "destructive",
      });
      return false;
    }

    if (!canUploadVideo && isVideo) {
      toast({
        title: "Upgrade needed! 🎬",
        description: "Video uploads require Video package",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const uploadFile = async (file: File) => {
    if (!validateFile(file)) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `graves/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('grave-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('grave-media')
        .getPublicUrl(filePath);

      const mediaType = file.type.startsWith('image/') ? 'image' : 'video';
      onMediaUpload(publicUrl, mediaType);

      toast({
        title: "Upload successful! 📸",
        description: "Your media has been buried with the grave",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed! 💀",
        description: "Failed to upload media. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const removeMedia = () => {
    onMediaUpload('', 'image');
  };

  if (!canUploadImage) {
    return (
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-3">📸</div>
          <p className="text-slate-400 mb-4">
            Upgrade to Premium for image uploads
          </p>
          <div className="text-xs text-slate-500">
            Premium ($3): Image + Enhanced memorial<br/>
            Video ($5): Image + 10s video burial
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {currentMedia ? (
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-4">
            <div className="relative">
              {currentMedia.type === 'image' ? (
                <img 
                  src={currentMedia.url} 
                  alt="Uploaded media"
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <div className="relative">
                  <video 
                    src={currentMedia.url}
                    className="w-full h-48 object-cover rounded-lg"
                    controls
                  />
                  <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    Video
                  </div>
                </div>
              )}
              
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={removeMedia}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card 
          className={`bg-slate-800/50 border-slate-700/50 transition-all duration-300 ${
            dragOver ? 'border-green-500/50 bg-green-500/5' : ''
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <CardContent className="p-8 text-center">
            {uploading ? (
              <div className="space-y-4">
                <div className="text-4xl animate-pulse">⚰️</div>
                <p className="text-slate-300">Burying your media...</p>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full animate-pulse w-1/2"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-6xl opacity-50">
                  {canUploadVideo ? '🎬' : '📸'}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-200 mb-2">
                    {canUploadVideo ? 'Add Image or Video' : 'Add Image'}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    {canUploadVideo 
                      ? 'Images (5MB max) • Videos (20MB, 20s max)'
                      : 'JPG, PNG, WebP (5MB max)'
                    }
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-green-600 hover:bg-green-500"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                  
                  <span className="text-slate-500 text-sm self-center">
                    or drag & drop here
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default MediaUpload;

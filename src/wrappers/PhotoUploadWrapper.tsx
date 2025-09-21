import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, ImagePlus } from 'lucide-react';

export default function PhotoUploadWrapper() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);

  useEffect(() => {
    // Redirect to auth if not authenticated
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    // Redirect to basic info if user hasn't completed it
    if (user && (!user.firstName || !user.lastName || !user.dateOfBirth)) {
      navigate('/setup/basic-info');
      return;
    }
  }, [user, isAuthenticated, navigate]);

  const handlePhotoUpload = (files: FileList | null) => {
    if (files) {
      const newPhotos = Array.from(files);
      const totalPhotos = uploadedPhotos.length + newPhotos.length;
      
      if (totalPhotos > 10) {
        alert('You can upload a maximum of 10 photos');
        return;
      }
      
      setUploadedPhotos(prev => [...prev, ...newPhotos].slice(0, 10));
    }
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  const handleSubmit = async () => {
    // TODO: Upload photos to S3
    console.log('Uploading photos:', uploadedPhotos);
    navigate('/dashboard');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-4 pb-24">
      <div className="flex items-center justify-center min-h-full">
        <Card className="p-6 max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <ImagePlus className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold mb-2">Add Your Photos (Optional)</CardTitle>
            <p className="text-muted-foreground">
              Upload up to 10 photos to complete your profile
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Photo upload area */}
            <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center relative">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handlePhotoUpload(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                data-testid="input-photo-upload"
              />
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Drop photos here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">
                {uploadedPhotos.length}/10 photos uploaded
              </p>
            </div>

            {/* Preview uploaded photos */}
            {uploadedPhotos.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {uploadedPhotos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removePhoto(index)}
                      data-testid={`button-remove-photo-${index}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleSkip} 
                className="flex-1"
                data-testid="button-skip-photos"
              >
                Skip for now
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="flex-1"
                disabled={uploadedPhotos.length === 0}
                data-testid="button-upload-photos"
              >
                {uploadedPhotos.length > 0 ? 'Upload Photos' : 'Continue'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
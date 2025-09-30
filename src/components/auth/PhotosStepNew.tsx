import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ImagePlus, AlertCircle, Loader2, X, Upload, Star } from "lucide-react";
import { VALIDATION_RULES } from "@/constants/auth";
import { usePhotosForm } from "@/hooks/usePhotosForm";

interface PhotosStepNewProps {
  isLoading: boolean;
  error: string;
  clearError: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

const PhotosStepNew = ({
  isLoading,
  error,
  clearError,
  setIsLoading,
  setError,
}: PhotosStepNewProps) => {
  

  const {
    uploadedPhotos,
    profilePictureIndex,
    setProfilePictureIndex,
    handlePhotoUpload,
    removePhoto,
    handleSubmit
  } = usePhotosForm({
    setIsLoading,
    setError,
    clearError,
  });

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <ImagePlus className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Add Your Photos</h2>
        <p className="text-muted-foreground">
          Upload up to {VALIDATION_RULES.MAX_PHOTOS} photos to complete your
          profile
        </p>
      </div>

      <div className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Upload Area */}
        <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center relative">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handlePhotoUpload(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={
              isLoading || uploadedPhotos.length >= VALIDATION_RULES.MAX_PHOTOS
            }
          />
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-medium">
            Drop photos here or click to browse
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {uploadedPhotos.length}/{VALIDATION_RULES.MAX_PHOTOS} photos
            uploaded
          </p>
        </div>

        {/* Photo Preview Grid */}
        {uploadedPhotos.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Click the star to set a profile picture
            </p>
            <div className="grid grid-cols-3 gap-2">
              {uploadedPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="relative w-full h-24">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      className="absolute top-1 left-1 p-1 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                      onClick={() => setProfilePictureIndex(index)}
                      disabled={isLoading}
                      title="Set as profile picture"
                    >
                      <Star className={`h-4 w-4 text-white ${profilePictureIndex === index ? 'fill-white' : ''}`} />
                    </button>
                    <button
                      className="absolute bottom-1 right-1 p-1 rounded-full bg-black/50 hover:bg-red-500/70 transition-colors opacity-0 group-hover:opacity-100"
                      onClick={() => removePhoto(index)}
                      disabled={isLoading}
                      title="Remove photo"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex">
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={uploadedPhotos.length === 0 || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Photos"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PhotosStepNew;

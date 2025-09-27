import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ImagePlus, AlertCircle } from "lucide-react";
import { VALIDATION_RULES } from "@/constants/auth";
import PhotoUploadArea from "./photos/PhotoUploadArea";
import PhotoPreview from "./photos/PhotoPreview";
import PhotoActions from "./photos/PhotoActions";
import { usePhotoHandlers } from "@/hooks/usePhotoHandlers";

interface PhotosStepProps {
  uploadedPhotos: File[];
  isLoading: boolean;
  error: string;
  setUploadedPhotos: React.Dispatch<React.SetStateAction<File[]>>;
  clearError: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  onComplete: () => void;
}

const PhotosStep = ({
  uploadedPhotos,
  isLoading,
  error,
  setUploadedPhotos,
  clearError,
  setIsLoading,
  setError,
  onComplete
}: PhotosStepProps) => {
  const photoHandlers = usePhotoHandlers({
    uploadedPhotos,
    setUploadedPhotos,
    clearError,
    setIsLoading,
    setError,
    onComplete
  });
  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <ImagePlus className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Add Your Photos (Optional)</h2>
        <p className="text-muted-foreground">
          Upload up to {VALIDATION_RULES.MAX_PHOTOS} photos to complete your profile
        </p>
      </div>

      <div className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <PhotoUploadArea 
          uploadedPhotos={uploadedPhotos}
          onPhotoUpload={photoHandlers.handlePhotoUpload}
        />

        <PhotoPreview 
          uploadedPhotos={uploadedPhotos}
          onRemovePhoto={photoHandlers.removePhoto}
        />

        <PhotoActions
          uploadedPhotos={uploadedPhotos}
          isLoading={isLoading}
          onUploadPhotos={photoHandlers.handlePhotoSubmit}
          onSkip={onComplete}
        />
      </div>
    </Card>
  );
};

export default PhotosStep;
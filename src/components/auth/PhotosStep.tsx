import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ImagePlus, AlertCircle } from "lucide-react";
import { VALIDATION_RULES } from "@/constants/auth";
import PhotoUploadArea from "./photos/PhotoUploadArea";
import PhotoPreview from "./photos/PhotoPreview";
import PhotoActions from "./photos/PhotoActions";

interface PhotosStepProps {
  uploadedPhotos: File[];
  isLoading: boolean;
  error: string;
  onPhotoUpload: (files: FileList | null) => void;
  onRemovePhoto: (index: number) => void;
  onUploadPhotos: () => void;
  onSkip: () => void;
}

const PhotosStep = ({
  uploadedPhotos,
  isLoading,
  error,
  onPhotoUpload,
  onRemovePhoto,
  onUploadPhotos,
  onSkip
}: PhotosStepProps) => {
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
          onPhotoUpload={onPhotoUpload}
        />

        <PhotoPreview 
          uploadedPhotos={uploadedPhotos}
          onRemovePhoto={onRemovePhoto}
        />

        <PhotoActions
          uploadedPhotos={uploadedPhotos}
          isLoading={isLoading}
          onUploadPhotos={onUploadPhotos}
          onSkip={onSkip}
        />
      </div>
    </Card>
  );
};

export default PhotosStep;
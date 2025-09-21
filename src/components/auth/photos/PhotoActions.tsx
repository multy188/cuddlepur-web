import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PhotoActionsProps {
  uploadedPhotos: File[];
  isLoading: boolean;
  onUploadPhotos: () => void;
  onSkip: () => void;
}

const PhotoActions = ({ uploadedPhotos, isLoading, onUploadPhotos, onSkip }: PhotoActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        onClick={onSkip} 
        className="flex-1"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Completing...
          </>
        ) : (
          'Skip for now'
        )}
      </Button>
      <Button 
        onClick={onUploadPhotos} 
        className="flex-1"
        disabled={uploadedPhotos.length === 0 || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          'Upload Photos'
        )}
      </Button>
    </div>
  );
};

export default PhotoActions;
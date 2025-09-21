import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PhotoPreviewProps {
  uploadedPhotos: File[];
  onRemovePhoto: (index: number) => void;
}

const PhotoPreview = ({ uploadedPhotos, onRemovePhoto }: PhotoPreviewProps) => {
  if (uploadedPhotos.length === 0) return null;

  return (
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
            onClick={() => onRemovePhoto(index)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PhotoPreview;
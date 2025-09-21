import { Upload } from "lucide-react";
import { VALIDATION_RULES } from "@/constants/auth";

interface PhotoUploadAreaProps {
  uploadedPhotos: File[];
  onPhotoUpload: (files: FileList | null) => void;
}

const PhotoUploadArea = ({ uploadedPhotos, onPhotoUpload }: PhotoUploadAreaProps) => {
  return (
    <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center relative">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => onPhotoUpload(e.target.files)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
      <p className="text-sm font-medium">Drop photos here or click to browse</p>
      <p className="text-xs text-muted-foreground mt-1">
        {uploadedPhotos.length}/{VALIDATION_RULES.MAX_PHOTOS} photos uploaded
      </p>
    </div>
  );
};

export default PhotoUploadArea;
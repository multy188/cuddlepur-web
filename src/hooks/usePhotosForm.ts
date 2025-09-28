import { useState, useCallback } from 'react';
import { usePhotoHandlers } from './usePhotoHandlers';
import { useLocation } from 'wouter';

interface UsePhotosFormProps {
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  clearError: () => void;
}

export const usePhotosForm = ({
  setIsLoading,
  setError,
  clearError
}: UsePhotosFormProps) => {
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);

  const [, setLocation] = useLocation();

  const onComplete = () => {
    setLocation("/dashboard");
  };

  const photoHandlers = usePhotoHandlers({
    uploadedPhotos,
    setUploadedPhotos,
    clearError,
    setIsLoading,
    setError,
    onComplete
  });

  const handlePhotoUpload = useCallback((files: FileList | null) => {
    if (!files) return;
    photoHandlers.handlePhotoUpload(files);
  }, [photoHandlers]);

  const removePhoto = useCallback((index: number) => {
    photoHandlers.removePhoto(index);
  }, [photoHandlers]);

  const handleSubmit = useCallback(async () => {
    await photoHandlers.handlePhotoSubmit();
  }, [photoHandlers]);

  return {
    uploadedPhotos,
    handlePhotoUpload,
    removePhoto,
    handleSubmit
  };
};
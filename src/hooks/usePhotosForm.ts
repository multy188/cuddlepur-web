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
  const [profilePictureIndex, setProfilePictureIndex] = useState<number>(0);

  const [, setLocation] = useLocation();

  const onComplete = () => {
    setLocation("/dashboard");
  };

  const photoHandlers = usePhotoHandlers({
    uploadedPhotos,
    setUploadedPhotos,
    profilePictureIndex,
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
    if (profilePictureIndex === index) {
      setProfilePictureIndex(0);
    } else if (profilePictureIndex > index) {
      setProfilePictureIndex(prev => prev - 1);
    }
    photoHandlers.removePhoto(index);
  }, [photoHandlers, profilePictureIndex]);

  const handleSubmit = useCallback(async () => {
    await photoHandlers.handlePhotoSubmit();
  }, [photoHandlers]);

  return {
    uploadedPhotos,
    profilePictureIndex,
    setProfilePictureIndex,
    handlePhotoUpload,
    removePhoto,
    handleSubmit
  };
};
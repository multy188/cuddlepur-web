import { useCallback } from 'react';
import { useUploadPhotos } from './useAuth';
import { validatePhotoUpload } from '@/utils/authValidation';
import { VALIDATION_RULES } from '@/constants/auth';

interface UsePhotoHandlersProps {
  uploadedPhotos: File[];
  setUploadedPhotos: (photos: File[] | ((prev: File[]) => File[])) => void;
  clearError: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  onComplete: () => void;
}

export const usePhotoHandlers = ({
  uploadedPhotos,
  setUploadedPhotos,
  clearError,
  setIsLoading,
  setError,
  onComplete
}: UsePhotoHandlersProps) => {
  const uploadPhotosMutation = useUploadPhotos();

  const handlePhotoUpload = useCallback((files: FileList | null) => {
    if (!files) return;
    
    const newPhotos = Array.from(files);
    const validationError = validatePhotoUpload(uploadedPhotos, newPhotos);
    
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setUploadedPhotos(prev => [...prev, ...newPhotos].slice(0, VALIDATION_RULES.MAX_PHOTOS));
  }, [uploadedPhotos, setUploadedPhotos, setError]);

  const removePhoto = useCallback((index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  }, [setUploadedPhotos]);

  const handlePhotoSubmit = useCallback(async () => {
    clearError();
    setIsLoading(true);
    
    try {
      if (uploadedPhotos.length > 0) {
        const formData = new FormData();
        uploadedPhotos.forEach(photo => formData.append('photos', photo));
        await uploadPhotosMutation.mutateAsync(formData);
      }
      
      onComplete();
    } catch (error: any) {
      setError(error.message || 'Unable to upload your photos. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [uploadedPhotos, clearError, uploadPhotosMutation, onComplete, setIsLoading, setError]);

  return {
    handlePhotoUpload,
    removePhoto,
    handlePhotoSubmit
  };
};
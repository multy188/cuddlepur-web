import { useCallback } from 'react';
import { useAuthApi } from './useAuthApi';
import { validatePhotoUpload } from '@/utils/authValidation';
import { getAuthToken } from '@/utils/authHelpers';
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
  const api = useAuthApi();

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
        const token = getAuthToken();
        if (!token) throw new Error('Authentication required');

        const formData = new FormData();
        uploadedPhotos.forEach(photo => formData.append('photos', photo));
        await api.uploadPhotos(token, formData);
      }
      
      onComplete();
    } catch (error: any) {
      setError(error.message || 'Unable to upload your photos. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [uploadedPhotos, clearError, api, onComplete, setIsLoading, setError]);

  return {
    handlePhotoUpload,
    removePhoto,
    handlePhotoSubmit
  };
};
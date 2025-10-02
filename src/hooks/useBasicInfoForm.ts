import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userInfoSchema, UserInfoFormData } from '@/schemas/authSchemas';
import { useFormHandlers } from './useFormHandlers';
import { useAuth } from '@/contexts/AuthContext';
import { AuthStep, Preferences } from '@/types/auth';

interface UseBasicInfoFormProps {
  setCurrentStep: (step: AuthStep) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  clearError: () => void;
}

export const useBasicInfoForm = ({
  setCurrentStep,
  setIsLoading,
  setError,
  clearError
}: UseBasicInfoFormProps) => {
  const { user } = useAuth();
  const [locationSet, setLocationSet] = useState(
    user?.latitude !== undefined && user?.longitude !== undefined
  );
  const [gettingLocation, setGettingLocation] = useState(false);

  const form = useForm<UserInfoFormData>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      username: (user as any)?.username || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : "",
      latitude: user?.latitude,
      longitude: user?.longitude,
      gender: user?.gender || ""
    },
    mode: "onChange"
  });

  // Empty preferences for now - will be filled in preferences step
  const emptyPreferences: Preferences = {
    openToIncall: false,
    openToOutcall: false,
    whatFriendsSay: "",
    drinking: "",
    smoking: "",
    married: "",
    occupation: ""
  };

  const formHandlers = useFormHandlers({
    userInfo: form.getValues(),
    preferences: emptyPreferences,
    clearError,
    setIsLoading,
    setError,
    setCurrentStep,
  });

  const handleGetLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setGettingLocation(true);
    clearError();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        form.setValue('latitude', latitude);
        form.setValue('longitude', longitude);
        setLocationSet(true);
        setGettingLocation(false);
      },
      (error) => {
        setGettingLocation(false);
        let message = "Unable to get your location";
        switch(error.code) {
          case error.PERMISSION_DENIED:
            message = "Please allow location access to continue";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            message = "Location request timed out";
            break;
        }
        setError(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, [form, setError, clearError]);

  const handleSubmit = async () => {
    await formHandlers.handleBasicInfoSubmit({
      preventDefault: () => {}
    } as any);
  };

  return {
    form,
    locationSet: locationSet || (form.watch('latitude') !== undefined && form.watch('longitude') !== undefined),
    gettingLocation,
    handleGetLocation,
    handleSubmit
  };
};
import { useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useSignOut } from '@/hooks/useAuth';
import { useAuthApi } from './useAuthApi';
import { determineCurrentStep, clearAuthStorage, getAuthToken } from '@/utils/authHelpers';
import { UserInfo, Preferences } from '@/types/auth';

interface UseAuthFlowProps {
  setCurrentStep: (step: any) => void;
  setError: (error: string) => void;
  setUserInfo: (userInfo: UserInfo | ((prev: UserInfo) => UserInfo)) => void;
  setPreferences: (preferences: Preferences | ((prev: Preferences) => Preferences)) => void;
}

export const useAuthFlow = ({
  setCurrentStep,
  setError,
  setUserInfo,
  setPreferences
}: UseAuthFlowProps) => {
  const { user, isAuthenticated } = useAuth();
  const signOutMutation = useSignOut();
  const [, setLocation] = useLocation();
  const api = useAuthApi();

  const handleSignOut = useCallback(() => {
    signOutMutation.mutate(undefined, {
      onSuccess: () => setLocation("/")
    });
  }, [signOutMutation, setLocation]);

  const validateTokenOnMount = useCallback(async () => {
    const token = getAuthToken();
    if (!token || !isAuthenticated) return;

    try {
      await api.validateToken(token);
    } catch {
      clearAuthStorage();
      setCurrentStep("phone");
      setError("Your session has expired. Please verify your phone number again.");
    }
  }, [isAuthenticated, api, setCurrentStep, setError]);

  const initializeFormData = useCallback((userData: any) => {
    if (!userData) return;

    setUserInfo({
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      dateOfBirth: userData.dateOfBirth ? userData.dateOfBirth.split('T')[0] : "",
      location: userData.city || ""
    });

    setPreferences({
      openToIncall: userData.preferences?.openToIncall || false,
      openToOutcall: userData.preferences?.openToOutcall || false,
      whatFriendsSay: userData.preferences?.whatFriendsSay || "",
      drinking: userData.preferences?.drinking || "",
      smoking: userData.preferences?.smoking || "",
      married: userData.preferences?.married || "",
      occupation: userData.preferences?.occupation || ""
    });
  }, [setUserInfo, setPreferences]);

  useEffect(() => {
    validateTokenOnMount();
  }, [validateTokenOnMount]);

  useEffect(() => {
    if (isAuthenticated && user) {
      initializeFormData(user);
      setCurrentStep(determineCurrentStep(user));
    }
  }, [isAuthenticated, user, initializeFormData, setCurrentStep]);

  return {
    handleSignOut,
    signOutPending: signOutMutation.isPending,
    isAuthenticated
  };
};
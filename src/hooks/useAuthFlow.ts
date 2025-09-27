import { useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useSignOut, useValidateToken } from '@/hooks/useAuth';
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
  const validateTokenMutation = useValidateToken();
  const [, setLocation] = useLocation();

  const handleSignOut = useCallback(() => {
    signOutMutation.mutate(undefined, {
      onSuccess: () => setLocation("/")
    });
  }, [signOutMutation, setLocation]);

  const validateTokenOnMount = useCallback(async () => {
    const token = getAuthToken();
    console.log('🔍 Token validation - token:', token ? 'EXISTS' : 'MISSING');
    console.log('🔍 Token validation - isAuthenticated:', isAuthenticated);
    console.log('🔍 Token validation - user:', user?.id || 'NO USER');
    
    if (!token || !isAuthenticated) {
      console.log('🔍 Skipping validation - missing token or not authenticated');
      return;
    }

    try {
      console.log('🔍 Attempting token validation...');
      await validateTokenMutation.mutateAsync(token);
      console.log('✅ Token validation successful');
    } catch (error: any) {
      console.error('❌ Token validation failed:', error.message);
      clearAuthStorage();
      setCurrentStep("phone");
      setError("Your session has expired. Please verify your phone number again.");
    }
  }, [isAuthenticated, validateTokenMutation, setCurrentStep, setError, user]);

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

  // Only validate token on mount if we're not freshly authenticated
  useEffect(() => {
    // Skip validation if user just logged in successfully
    if (isAuthenticated && user) {
      console.log('🔍 User authenticated, skipping token validation');
      return;
    }
    validateTokenOnMount();
  }, [validateTokenOnMount, isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('🔍 Setting up authenticated user, step:', determineCurrentStep(user));
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
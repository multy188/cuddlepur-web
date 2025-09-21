import { useCallback } from 'react';
import { LOCATION_SUGGESTIONS } from '@/constants/auth';
import { UserInfo } from '@/types/auth';

interface UseLocationHandlersProps {
  userInfo: UserInfo;
  filteredSuggestions: string[];
  setUserInfo: (userInfo: UserInfo | ((prev: UserInfo) => UserInfo)) => void;
  setFilteredSuggestions: (suggestions: string[]) => void;
  setShowSuggestions: (show: boolean) => void;
}

export const useLocationHandlers = ({
  userInfo,
  filteredSuggestions,
  setUserInfo,
  setFilteredSuggestions,
  setShowSuggestions
}: UseLocationHandlersProps) => {
  const handleLocationChange = useCallback((value: string) => {
    setUserInfo(prev => ({ ...prev, location: value }));
    
    if (value.length > 0) {
      const filtered = LOCATION_SUGGESTIONS.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [setUserInfo, setFilteredSuggestions, setShowSuggestions]);

  const handleLocationFocus = useCallback(() => {
    if (userInfo.location.length > 0 && filteredSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  }, [userInfo.location, filteredSuggestions, setShowSuggestions]);

  const handleLocationBlur = useCallback(() => {
    setTimeout(() => setShowSuggestions(false), 150);
  }, [setShowSuggestions]);

  const handleSuggestionClick = useCallback((city: string) => {
    setUserInfo(prev => ({ ...prev, location: city }));
    setShowSuggestions(false);
  }, [setUserInfo, setShowSuggestions]);

  const handleUserInfoChange = useCallback((field: keyof UserInfo, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  }, [setUserInfo]);

  return {
    handleLocationChange,
    handleLocationFocus,
    handleLocationBlur,
    handleSuggestionClick,
    handleUserInfoChange
  };
};
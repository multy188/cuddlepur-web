import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userInfoSchema, UserInfoFormData } from '@/schemas/authSchemas';
import { useFormHandlers } from './useFormHandlers';
import { useAuth } from '@/contexts/AuthContext';
import { AuthStep, Preferences } from '@/types/auth';
import { GHANA_CITIES } from '@/constants/auth';

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
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const form = useForm<UserInfoFormData>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      dateOfBirth: user?.dateOfBirth || "",
      location: user?.city || ""
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

  const handleLocationChange = (value: string) => {
    form.setValue('location', value);
    if (value.length > 0) {
      const searchTerm = value.toLowerCase().trim();
      const filtered = GHANA_CITIES.filter(city => {
        const cityLower = city.toLowerCase();
        // Prioritize cities that start with the search term
        return cityLower.startsWith(searchTerm) || cityLower.includes(searchTerm);
      }).sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        const startsWithA = aLower.startsWith(searchTerm);
        const startsWithB = bLower.startsWith(searchTerm);
        
        // Cities starting with search term come first
        if (startsWithA && !startsWithB) return -1;
        if (!startsWithA && startsWithB) return 1;
        
        // Then alphabetical order
        return a.localeCompare(b);
      });
      
      setFilteredSuggestions(filtered.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleLocationFocus = () => {
    if (form.getValues('location').length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleLocationBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleSuggestionClick = (city: string) => {
    form.setValue('location', city);
    setShowSuggestions(false);
  };

  const handleSubmit = async () => {
    await formHandlers.handleBasicInfoSubmit({
      preventDefault: () => {}
    } as any);
  };

  return {
    form,
    filteredSuggestions,
    showSuggestions,
    handleLocationChange,
    handleLocationFocus,
    handleLocationBlur,
    handleSuggestionClick,
    handleSubmit
  };
};
import { AuthStep } from "./auth";

export interface AuthStepRendererProps {
  // Global flow state only
  currentStep: AuthStep;
  isLoading: boolean;
  error: string;

  // Global utility functions
  clearError: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setCurrentStep: (step: AuthStep) => void;
}
import { AuthStepRendererProps } from "@/types/authStepRenderer";
import PhoneStep from "./PhoneStep";
import OtpStepNew from "./OtpStepNew";
import BasicInfoStepNew from "./BasicInfoStepNew";
import PreferencesStepNew from "./PreferencesStepNew";
import PhotosStepNew from "./PhotosStepNew";

const AuthStepRenderer = ({
  currentStep,
  isLoading,
  error,
  clearError,
  setIsLoading,
  setError,
  setCurrentStep,
}: AuthStepRendererProps) => {
  switch (currentStep) {
    case "phone":
      return (
        <PhoneStep
          isLoading={isLoading}
          error={error}
          clearError={clearError}
          setIsLoading={setIsLoading}
          setError={setError}
          setCurrentStep={setCurrentStep}
        />
      );
    
    case "otp":
      return (
        <OtpStepNew
          isLoading={isLoading}
          error={error}
          clearError={clearError}
          setIsLoading={setIsLoading}
          setError={setError}
          setCurrentStep={setCurrentStep}
        />
      );
    
    case "basicInfo":
      return (
        <BasicInfoStepNew
          isLoading={isLoading}
          error={error}
          clearError={clearError}
          setIsLoading={setIsLoading}
          setError={setError}
          setCurrentStep={setCurrentStep}
        />
      );
    
    case "preferences":
      return (
        <PreferencesStepNew
          isLoading={isLoading}
          error={error}
          clearError={clearError}
          setIsLoading={setIsLoading}
          setError={setError}
          setCurrentStep={setCurrentStep}
        />
      );
    
    case "photos":
      return (
        <PhotosStepNew
          isLoading={isLoading}
          error={error}
          clearError={clearError}
          setIsLoading={setIsLoading}
          setError={setError} 
        />
      );
    
    default:
      return null;
  }
};

export default AuthStepRenderer;
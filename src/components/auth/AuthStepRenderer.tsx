import { AuthStepRendererProps } from "@/types/authStepRenderer";
import PhoneStep from "./PhoneStep";
import OtpStep from "./OtpStep";
import BasicInfoStep from "./BasicInfoStep";
import PreferencesStep from "./PreferencesStep";
import PhotosStep from "./PhotosStep";

const AuthStepRenderer = ({
  currentStep,
  isLoading,
  error,
  phoneNumber,
  countryCode,
  otpCode,
  resendTimer,
  userInfo,
  preferences,
  uploadedPhotos,
  filteredSuggestions,
  showSuggestions,
  setPhoneNumber,
  setCountryCode,
  setOtpCode,
  phoneHandlers,
  formHandlers,
  photoHandlers,
  locationHandlers,
  onPreferencesChange,
  onNavigateTerms,
  onNavigatePrivacy,
  onComplete
}: AuthStepRendererProps) => {
  switch (currentStep) {
    case "phone":
      return (
        <PhoneStep
          phoneNumber={phoneNumber}
          countryCode={countryCode}
          isLoading={isLoading}
          error={error}
          onPhoneNumberChange={setPhoneNumber}
          onCountryCodeChange={setCountryCode}
          onSubmit={phoneHandlers.handlePhoneSubmit}
          onNavigateTerms={onNavigateTerms}
          onNavigatePrivacy={onNavigatePrivacy}
        />
      );
    
    case "otp":
      return (
        <OtpStep
          otpCode={otpCode}
          countryCode={countryCode}
          phoneNumber={phoneNumber}
          resendTimer={resendTimer}
          isLoading={isLoading}
          error={error}
          onOtpCodeChange={setOtpCode}
          onSubmit={phoneHandlers.handleOtpSubmit}
          onResendCode={phoneHandlers.handleResendCode}
        />
      );
    
    case "basicInfo":
      return (
        <BasicInfoStep
          userInfo={userInfo}
          filteredSuggestions={filteredSuggestions}
          showSuggestions={showSuggestions}
          isLoading={isLoading}
          error={error}
          onUserInfoChange={locationHandlers.handleUserInfoChange}
          onLocationChange={locationHandlers.handleLocationChange}
          onLocationFocus={locationHandlers.handleLocationFocus}
          onLocationBlur={locationHandlers.handleLocationBlur}
          onSuggestionClick={locationHandlers.handleSuggestionClick}
          onSubmit={formHandlers.handleBasicInfoSubmit}
        />
      );
    
    case "preferences":
      return (
        <PreferencesStep
          preferences={preferences}
          isLoading={isLoading}
          error={error}
          onPreferencesChange={onPreferencesChange}
          onSubmit={formHandlers.handlePreferencesSubmit}
        />
      );
    
    case "photos":
      return (
        <PhotosStep
          uploadedPhotos={uploadedPhotos}
          isLoading={isLoading}
          error={error}
          onPhotoUpload={photoHandlers.handlePhotoUpload}
          onRemovePhoto={photoHandlers.removePhoto}
          onUploadPhotos={photoHandlers.handlePhotoSubmit}
          onSkip={onComplete}
        />
      );
    
    default:
      return null;
  }
};

export default AuthStepRenderer;
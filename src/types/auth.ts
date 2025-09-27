export type AuthStep = "phone" | "otp" | "basicInfo" | "preferences" | "photos";

export interface UserInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  location: string;
}

export interface Preferences {
  openToIncall: boolean;
  openToOutcall: boolean;
  whatFriendsSay: string;
  drinking: string;
  smoking: string;
  married: string;
  occupation: string;
}

export interface AuthState {
  currentStep: AuthStep;
  isLoading: boolean;
  error: string;
  phoneNumber: string;
  countryCode: string;
  otpCode: string;
  resendTimer: number;
  userInfo: UserInfo;
  preferences: Preferences;
  uploadedPhotos: File[];
  filteredSuggestions: string[];
  showSuggestions: boolean;
}
import { AuthStep } from "@/types/auth";

export const determineCurrentStep = (userData: any): AuthStep => {
  if (!userData) return "phone";

  // If user doesn't have basic info, they need to complete that
  const hasBasicInfo = userData.firstName && userData.lastName &&
                      userData.dateOfBirth && userData.gender;
  
  if (!hasBasicInfo) return "basicInfo";

  // If user doesn't have preferences, they need to complete that
  const hasPreferences = userData.preferences?.whatFriendsSay && 
                        userData.preferences?.drinking && 
                        userData.preferences?.smoking && 
                        userData.preferences?.married && 
                        userData.preferences?.occupation;
  
  if (!hasPreferences) return "preferences";

  // If user doesn't have photos, they need to upload them
  const hasPhotos = userData.photos?.length > 0;
  
  if (!hasPhotos) return "photos";

  // If user has completed all steps, they should be on the photos step
  // This will be handled by the Auth page redirect logic
  return "photos";
};

export const formatUserDataForApi = (userInfo: any) => ({
  firstName: userInfo.firstName,
  lastName: userInfo.lastName,
  dateOfBirth: new Date(userInfo.dateOfBirth).toISOString(),
  latitude: userInfo.latitude,
  longitude: userInfo.longitude,
  gender: userInfo.gender
});

export const clearAuthStorage = () => {
  localStorage.removeItem('cuddlepur_token');
  localStorage.removeItem('cuddlepur_user');
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('cuddlepur_token');
};
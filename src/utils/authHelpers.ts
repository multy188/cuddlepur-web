import { AuthStep } from "@/types/auth";

export const determineCurrentStep = (userData: any): AuthStep => {
  if (!userData) return "basicInfo";

  const hasBasicInfo = userData.firstName && userData.lastName && 
                      userData.dateOfBirth && userData.city;
  
  if (!hasBasicInfo) return "basicInfo";

  const hasPreferences = userData.preferences?.whatFriendsSay && 
                        userData.preferences?.drinking && 
                        userData.preferences?.smoking && 
                        userData.preferences?.married && 
                        userData.preferences?.occupation;
  
  return hasPreferences ? "photos" : "preferences";
};

export const formatUserDataForApi = (userInfo: any) => ({
  firstName: userInfo.firstName,
  lastName: userInfo.lastName,
  dateOfBirth: new Date(userInfo.dateOfBirth).toISOString(),
  city: userInfo.location
});

export const clearAuthStorage = () => {
  localStorage.removeItem('cuddlepur_token');
  localStorage.removeItem('cuddlepur_user');
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('cuddlepur_token');
};
export const isRegistrationComplete = (user: any): boolean => {
  if (!user) return false;
  
  // Check basic info
  if (!user.firstName || !user.lastName || !user.dateOfBirth || !user.gender) {
    return false;
  }
  
  // Check preferences
  if (!user.preferences?.whatFriendsSay || !user.preferences?.drinking || 
      !user.preferences?.smoking || !user.preferences?.married || !user.preferences?.occupation) {
    return false;
  }
  
  // Check photos step completion (must have at least one photo)
  if (!user.photos?.length) {
    return false;
  }
  
  return true;
};
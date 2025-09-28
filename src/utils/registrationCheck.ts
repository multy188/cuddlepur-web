export const isRegistrationComplete = (user: any): boolean => {
  if (!user) return false;
  
  // Check basic info
  if (!user.firstName || !user.lastName || !user.dateOfBirth || !user.city) {
    return false;
  }
  
  // Check preferences
  if (!user.preferences?.whatFriendsSay || !user.preferences?.drinking || 
      !user.preferences?.smoking || !user.preferences?.married || !user.preferences?.occupation) {
    return false;
  }
  
  // Check photos step completion (either has photos or explicitly skipped)
  if (!user.photos?.length && !user.photosSkipped) {
    return false;
  }
  
  return true;
};
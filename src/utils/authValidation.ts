import { VALIDATION_RULES } from "@/constants/auth";

export const validatePhoneNumber = (phoneNumber: string): string | null => {
  if (phoneNumber.length !== 10) {
    return "Phone number must be exactly 10 digits long.";
  }
  
  if (!/^\d+$/.test(phoneNumber)) {
    return "Phone number must contain only digits.";
  }
  
  return null;
};

export const validateOtpCode = (otpCode: string): boolean => {
  return otpCode.length === VALIDATION_RULES.OTP_LENGTH;
};

export const sanitizePhoneNumber = (input: string): string => {
  return input.replace(/\D/g, '').slice(0, 10);
};

export const validatePhotoUpload = (currentPhotos: File[], newPhotos: File[]): string | null => {
  const totalPhotos = currentPhotos.length + newPhotos.length;
  
  if (totalPhotos > VALIDATION_RULES.MAX_PHOTOS) {
    return `You can upload a maximum of ${VALIDATION_RULES.MAX_PHOTOS} photos`;
  }
  
  return null;
};
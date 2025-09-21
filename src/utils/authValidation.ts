import { VALIDATION_RULES } from "@/constants/auth";

export const validatePhoneNumber = (phoneNumber: string): string | null => {
  if (phoneNumber.length < VALIDATION_RULES.PHONE_MIN_LENGTH) {
    return "Phone number must be at least 7 digits long.";
  }
  
  if (phoneNumber.length > VALIDATION_RULES.PHONE_MAX_LENGTH) {
    return "Phone number cannot be longer than 15 digits.";
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
  return input.replace(/\D/g, '').slice(0, VALIDATION_RULES.PHONE_MAX_LENGTH);
};

export const validatePhotoUpload = (currentPhotos: File[], newPhotos: File[]): string | null => {
  const totalPhotos = currentPhotos.length + newPhotos.length;
  
  if (totalPhotos > VALIDATION_RULES.MAX_PHOTOS) {
    return `You can upload a maximum of ${VALIDATION_RULES.MAX_PHOTOS} photos`;
  }
  
  return null;
};
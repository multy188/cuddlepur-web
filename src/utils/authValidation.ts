import { VALIDATION_RULES } from "@/constants/auth";

export const validatePhoneNumber = (phoneNumber: string): string | null => {
  if (phoneNumber.length < VALIDATION_RULES.PHONE_MIN_LENGTH || phoneNumber.length > VALIDATION_RULES.PHONE_MAX_LENGTH) {
    return `Phone number must be ${VALIDATION_RULES.PHONE_MIN_LENGTH}-${VALIDATION_RULES.PHONE_MAX_LENGTH} digits long.`;
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
  const digits = input.replace(/\D/g, '');
  // Allow up to the maximum phone length
  return digits.slice(0, VALIDATION_RULES.PHONE_MAX_LENGTH);
};

export const formatPhoneNumber = (input: string): string => {
  const digits = input.replace(/\D/g, '');
  const length = digits.length;
  
  if (length <= 3) {
    return digits;
  } else if (length <= 6) {
    return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  } else if (length <= 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else {
    // For numbers longer than 10 digits, format the first 10 and append the rest
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)}-${digits.slice(6, 10)} ${digits.slice(10)}`;
  }
};

export const validatePhotoUpload = (currentPhotos: File[], newPhotos: File[]): string | null => {
  const totalPhotos = currentPhotos.length + newPhotos.length;
  
  if (totalPhotos > VALIDATION_RULES.MAX_PHOTOS) {
    return `You can upload a maximum of ${VALIDATION_RULES.MAX_PHOTOS} photos`;
  }
  
  return null;
};

// Process phone number based on country code rules
export const processPhoneNumberForCountry = (phoneNumber: string, countryCode: string): string => {
  // List of country codes that typically use leading 0 in local format
  // Ghana (+233), Nigeria (+234), Kenya (+254), Uganda (+256), South Africa (+27)
  const countriesWithLeadingZero = ['+233', '+234', '+254', '+256', '+27'];
  
  if (countriesWithLeadingZero.includes(countryCode) && phoneNumber.startsWith('0')) {
    return phoneNumber.substring(1);
  }
  
  return phoneNumber;
};
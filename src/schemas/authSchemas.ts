import { z } from 'zod';

export const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  countryCode: z.string().min(1, "Country code is required")
});

export const otpSchema = z.object({
  otpCode: z
    .string()
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d{6}$/, "Verification code must contain only digits")
});

export const userInfoSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  firstName: z.string().min(1, "First name is required").max(50, "First name too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name too long"),
  dateOfBirth: z.string().min(1, "Date of birth is required").refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (age < 18 || (age === 18 && monthDiff < 0) || (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return false;
    }
    return true;
  }, "You must be at least 18 years old"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  gender: z.string().min(1, "Gender is required")
});

export const preferencesSchema = z.object({
  openToIncall: z.boolean(),
  openToOutcall: z.boolean(),
  whatFriendsSay: z.string().min(1, "Please tell us what your friends say about you"),
  drinking: z.string().min(1, "Please select your drinking preference"),
  smoking: z.string().min(1, "Please select your smoking preference"),
  married: z.string().min(1, "Please select your relationship status"),
  occupation: z.string().min(1, "Occupation is required")
});

// Type exports
export type PhoneFormData = z.infer<typeof phoneSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type UserInfoFormData = z.infer<typeof userInfoSchema>;
export type PreferencesFormData = z.infer<typeof preferencesSchema>;
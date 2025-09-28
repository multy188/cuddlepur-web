import { AuthStep } from "@/types/auth";

export const STEP_PROGRESS: Record<AuthStep, number> = {
  phone: 20,
  otp: 40,
  basicInfo: 60,
  preferences: 80,
  photos: 100
} as const;

export const GHANA_CITIES = [
  "Accra", "Kumasi", "Tamale", "Sekondi-Takoradi", "Ashaiman", "Sunyani",
  "Cape Coast", "Obuasi", "Teshie", "Tema", "Madina", "Koforidua",
  "Wa", "Techiman", "Ho", "Nungua", "Lashibi", "Dome", "Gbawe", "Kasoa",
  "Adenta", "Aflao", "Agogo", "Akim Oda", "Akropong", "Akwatia", "Anloga",
  "Apam", "Atiwa", "Axim", "Bechem", "Berekum", "Bimbilla", "Bolgatanga",
  "Bawku", "Ejura", "Elmina", "Goaso", "Hohoe", "Jasikan", "Kade", "Keta",
  "Kintampo", "Konongo", "Kpandae", "Mampong", "Navrongo", "Nsawam", "Nyakrom",
  "Prestea", "Salaga", "Savelugu", "Shama", "Sogakope", "Tafo", "Tarkwa",
  "Techiman", "Winneba", "Yendi", "Zebilla"
] as const;

// For backward compatibility
export const LOCATION_SUGGESTIONS = GHANA_CITIES;

export const PREFERENCE_OPTIONS = {
  drinking: [
    { value: "never", label: "Never" },
    { value: "rarely", label: "Rarely" },
    { value: "socially", label: "Socially" },
    { value: "regularly", label: "Regularly" },
    { value: "prefer-not-to-say", label: "Prefer not to say" }
  ],
  smoking: [
    { value: "never", label: "Never" },
    { value: "occasionally", label: "Occasionally" },
    { value: "regularly", label: "Regularly" },
    { value: "prefer-not-to-say", label: "Prefer not to say" }
  ],
  married: [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "in-relationship", label: "In a relationship" },
    { value: "divorced", label: "Divorced" },
    { value: "prefer-not-to-say", label: "Prefer not to say" }
  ]
} as const;

export const VALIDATION_RULES = {
  PHONE_MIN_LENGTH: 7,
  PHONE_MAX_LENGTH: 15,
  OTP_LENGTH: 6,
  MAX_PHOTOS: 10,
  BIO_MAX_LENGTH: 300,
  RESEND_TIMER_DURATION: 300
} as const;
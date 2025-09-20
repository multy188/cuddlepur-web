import type { SafetyGuideline, EmergencyContact } from '@types';

export const safetyGuidelines: SafetyGuideline[] = [
  {
    title: "Meeting in Public",
    description: "Always meet in public spaces for first sessions to ensure your safety and comfort."
  },
  {
    title: "Trust Your Instincts",
    description: "If something feels wrong, trust your instincts and end the session if necessary."
  },
  {
    title: "Share Your Plans",
    description: "Let someone you trust know where you're going and when you'll be back."
  },
  {
    title: "Use In-App Communication",
    description: "Keep all communication within the app to maintain a record of conversations."
  },
  {
    title: "Verify Identity",
    description: "All professionals undergo ID verification and background checks before joining."
  },
  {
    title: "Report Inappropriate Behavior",
    description: "Report any violations of our community guidelines immediately."
  }
];

export const emergencyContacts: EmergencyContact[] = [
  { name: "Ghana Police Service", number: "999" },
  { name: "National Ambulance Service", number: "193" },
  { name: "Ghana Fire Service", number: "192" }
];
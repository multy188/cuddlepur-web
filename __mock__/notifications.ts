import type { Notification } from '@types';

export const sampleNotifications: Notification[] = [
  {
    type: 'booking_request' as const,
    title: 'New Booking Request',
    message: 'Sarah wants to book a session with you for tomorrow at 2:00 PM',
    userImage: "@assets/generated_images/Professional_profile_photo_f962fff8.png",
    userName: 'Sarah Johnson'
  },
  {
    type: 'verification_approved' as const,
    title: 'Verification Approved',
    message: 'Your identity verification has been successfully completed'
  },
  {
    type: 'booking_paid' as const,
    title: 'Payment Received',
    message: 'You received $90 for your session with Michael',
    userImage: "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png",
    userName: 'Michael Brown'
  },
  {
    type: 'profile_reviewed' as const,
    title: 'New Profile Review',
    message: 'Emma left a 5-star review on your profile',
    userImage: "@assets/generated_images/Professional_profile_photo_f962fff8.png",
    userName: 'Emma Davis'
  }
];
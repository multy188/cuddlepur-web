export type NotificationType = 'booking_request' | 'verification_approved' | 'booking_paid' | 'profile_reviewed';

export interface Notification {
  type: NotificationType;
  title: string;
  message: string;
  userImage?: string;
  userName?: string;
}
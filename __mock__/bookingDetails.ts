import type { BookingDetails } from '@types';

export const mockBookingDetails: Record<string, BookingDetails> = {
  "1": {
    id: "1",
    status: "confirmed",
    professional: {
      id: "1",
      name: "Sarah",
      profileImage: "@assets/generated_images/Professional_profile_photo_f962fff8.png",
      isVerified: true,
      rating: 4.8
    },
    date: "Tomorrow, Dec 14",
    timeSlot: "14:00",
    duration: 2,
    location: "Your place",
    locationDetails: "123 Main St, Apartment 4B",
    sessionNotes: "Looking forward to a relaxing session",
    totalAmount: 90,
    platformFee: 9,
    sessionAmount: 81,
    paymentStatus: "paid",
    paymentMethod: "credit_card",
    receiptId: "receipt-456",
    createdAt: new Date().toISOString(),
    cancellationDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    refundAmount: 90
  },
  "2": {
    id: "2",
    status: "payment_required",
    professional: {
      id: "2",
      name: "Michael",
      profileImage: "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png",
      isVerified: true,
      rating: 4.6
    },
    date: "Friday, Dec 15",
    timeSlot: "18:30",
    duration: 1,
    location: "Coffee House",
    locationDetails: "Downtown Coffee House, 456 Oak St",
    sessionNotes: "Professional meetup for networking",
    totalAmount: 45,
    platformFee: 5,
    sessionAmount: 40,
    paymentStatus: "pending",
    paymentMethod: undefined,
    receiptId: undefined,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    cancellationDeadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    refundAmount: 45
  },
  "3": {
    id: "3",
    status: "completed",
    professional: {
      id: "1",
      name: "Sarah",
      profileImage: "@assets/generated_images/Professional_profile_photo_f962fff8.png",
      isVerified: true,
      rating: 4.8
    },
    date: "Yesterday, Dec 12",
    timeSlot: "16:00",
    duration: 3,
    location: "Park walk",
    locationDetails: "Central Park, Main Entrance",
    sessionNotes: "Enjoyed a lovely afternoon walk and conversation",
    totalAmount: 135,
    platformFee: 14,
    sessionAmount: 121,
    paymentStatus: "paid",
    paymentMethod: "credit_card",
    receiptId: "receipt-789",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    cancellationDeadline: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    refundAmount: 0
  }
};

export const getBookingDetails = (id: string): BookingDetails | undefined => {
  return mockBookingDetails[id];
};
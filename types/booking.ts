export interface BookingRequest {
  id: string;
  client: {
    id: string;
    name: string;
    avatar: string;
    age: number;
    rating: number;
    isVerified: boolean;
  };
  date: string;
  time: string;
  duration: number;
  location: string;
  hourlyRate: number;
  totalAmount: number;
  message: string;
  specialRequests: string[];
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  requestedAt: string;
  expiresAt: string;
}

export interface BookingDetails {
  id: string;
  status: "requested" | "accepted" | "payment_required" | "confirmed" | "identity_verified" | "meetup_verified" | "session_ready" | "in_progress" | "completed" | "cancelled";
  professional: {
    id: string;
    name: string;
    profileImage: string;
    isVerified: boolean;
    rating: number;
  };
  date: string;
  timeSlot: string;
  duration: number;
  location: string;
  locationDetails: string;
  sessionNotes: string;
  totalAmount: number;
  platformFee: number;
  sessionAmount: number;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod?: string;
  receiptId?: string;
  createdAt: string;
  cancellationDeadline: string;
  refundAmount: number;
}
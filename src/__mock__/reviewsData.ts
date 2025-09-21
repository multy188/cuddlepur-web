import type { Review, RatingData } from "@/types/user";

export const mockReviews: Review[] = [
  {
    id: "1",
    reviewer: "Sarah M.",
    rating: 5,
    comment: "Alex was wonderful company! Very respectful and great conversation.",
    date: "2 weeks ago"
  },
  {
    id: "2", 
    reviewer: "John D.",
    rating: 4,
    comment: "Had a lovely afternoon exploring the city. Highly recommend!",
    date: "3 weeks ago"
  }
];

export const mockRatingData: RatingData = {
  averageRating: 4.8,
  totalReviews: 23
};
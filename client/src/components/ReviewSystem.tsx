import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Star,
  User,
  Calendar,
  Clock,
  CheckCircle,
  Timer,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Shield
} from "lucide-react";

interface SessionData {
  id: string;
  bookingId: string;
  date: string;
  timeSlot: string;
  duration: number;
  location: string;
  totalAmount: number;
  completedAt: string;
  professional: {
    id: string;
    name: string;
    profileImage: string;
  };
  client: {
    id: string;
    name: string;
    profileImage: string;
  };
}

interface ExistingReview {
  id: string;
  rating: number;
  comment: string;
  aspects: {
    punctuality: number;
    professionalism: number;
    communication: number;
    overall: number;
  };
  createdAt: string;
}

interface ReviewSystemProps {
  session: SessionData;
  userRole: "professional" | "client";
  existingReview?: ExistingReview;
  timeRemaining: number; // minutes remaining to submit review
  onBack: () => void;
  onSubmitReview: (reviewData: any) => void;
}

const RATING_ASPECTS = {
  professional: [
    { key: "punctuality", label: "Punctuality", description: "Arrived on time" },
    { key: "professionalism", label: "Professionalism", description: "Professional behavior" },
    { key: "communication", label: "Communication", description: "Clear communication" },
    { key: "overall", label: "Overall Experience", description: "Overall satisfaction" }
  ],
  client: [
    { key: "punctuality", label: "Punctuality", description: "Arrived on time" },
    { key: "respectfulness", label: "Respectfulness", description: "Respectful behavior" },
    { key: "communication", label: "Communication", description: "Clear communication" },
    { key: "overall", label: "Overall Experience", description: "Overall satisfaction" }
  ]
};

export default function ReviewSystem({ 
  session, 
  userRole,
  existingReview,
  timeRemaining,
  onBack, 
  onSubmitReview
}: ReviewSystemProps) {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  // Initialize aspects based on user role
  const getInitialAspects = () => {
    if (existingReview?.aspects) {
      return existingReview.aspects;
    }
    if (userRole === "client") {
      return {
        punctuality: 0,
        respectfulness: 0,
        communication: 0,
        overall: 0
      };
    } else {
      return {
        punctuality: 0,
        professionalism: 0,
        communication: 0,
        overall: 0
      };
    }
  };

  const [aspects, setAspects] = useState<any>(getInitialAspects());
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const otherUser = userRole === "professional" ? session.client : session.professional;
  const ratingAspects = RATING_ASPECTS[userRole];

  const getTimeLabel = (timeSlot: string) => {
    const timeLabels: Record<string, string> = {
      "08:00": "8:00 AM",
      "09:00": "9:00 AM", 
      "10:00": "10:00 AM",
      "11:00": "11:00 AM",
      "12:00": "12:00 PM",
      "13:00": "1:00 PM",
      "14:00": "2:00 PM",
      "15:00": "3:00 PM",
      "16:00": "4:00 PM",
      "17:00": "5:00 PM",
      "18:00": "6:00 PM",
      "19:00": "7:00 PM",
      "20:00": "8:00 PM",
      "21:00": "9:00 PM"
    };
    return timeLabels[timeSlot] || timeSlot;
  };

  const formatTimeRemaining = (minutes: number) => {
    if (minutes <= 0) return "Expired";
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m remaining`;
    }
    return `${mins}m remaining`;
  };

  const handleRatingChange = (aspectKey: string, value: number) => {
    setAspects(prev => ({
      ...prev,
      [aspectKey]: value
    }));
    
    // Update overall rating based on aspects
    const aspectValues = Object.values({...aspects, [aspectKey]: value});
    const average = aspectValues.reduce((sum, val) => sum + val, 0) / aspectValues.length;
    setRating(Math.round(average));
  };

  const handleSubmitReview = async () => {
    if (timeRemaining <= 0) return;
    
    setIsSubmitting(true);

    const reviewData = {
      sessionId: session.id,
      bookingId: session.bookingId,
      reviewerRole: userRole,
      revieweeId: otherUser.id,
      rating,
      aspects,
      comment,
      submittedAt: new Date().toISOString()
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmitReview(reviewData);
    setIsSubmitting(false);
  };

  // Only check aspects that are actually displayed for the current user role
  const relevantAspectKeys = ratingAspects.map(aspect => aspect.key);
  const relevantAspectValues = relevantAspectKeys.map(key => aspects[key] || 0);
  const canSubmit = timeRemaining > 0 && rating > 0 && relevantAspectValues.every(val => val > 0);
  const isExpired = timeRemaining <= 0;

  // If review already exists and time expired
  if (existingReview && isExpired) {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                data-testid="button-back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <h1 className="font-semibold">Your Review</h1>
              
              <div className="w-10" />
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4 space-y-6 max-w-2xl">
          {/* Session Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Session Completed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={otherUser.profileImage} alt={otherUser.name} />
                  <AvatarFallback>
                    <User className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium" data-testid="reviewed-person">
                    {otherUser.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {userRole === "professional" ? "Your client" : "Your professional"}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{getTimeLabel(session.timeSlot)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review Display */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Your Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="flex justify-center items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 ${
                        star <= existingReview.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-2xl font-bold">{existingReview.rating}/5</p>
              </div>

              <div className="space-y-3">
                {ratingAspects.map((aspect) => (
                  <div key={aspect.key}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{aspect.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {existingReview.aspects[aspect.key as keyof typeof existingReview.aspects]}/5
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= existingReview.aspects[aspect.key as keyof typeof existingReview.aspects]
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {existingReview.comment && (
                <div>
                  <Label className="text-sm font-medium">Your Comment</Label>
                  <div className="mt-2 p-3 bg-muted rounded-lg">
                    <p className="text-sm">{existingReview.comment}</p>
                  </div>
                </div>
              )}

              <div className="text-center text-sm text-muted-foreground">
                Submitted {new Date(existingReview.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If time has expired and no review exists
  if (isExpired && !existingReview) {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                data-testid="button-back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <h1 className="font-semibold">Review Expired</h1>
              
              <div className="w-10" />
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4 space-y-6 max-w-2xl">
          <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <CardContent className="p-6">
              <div className="text-center">
                <Timer className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  Review Period Expired
                </h3>
                <p className="text-red-700 dark:text-red-300">
                  The 24-hour review period has ended. You can no longer submit a review for this session.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Session Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Session Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={otherUser.profileImage} alt={otherUser.name} />
                  <AvatarFallback>
                    <User className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{otherUser.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {userRole === "professional" ? "Your client" : "Your professional"}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{getTimeLabel(session.timeSlot)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <h1 className="font-semibold">
              {existingReview ? "Edit Review" : "Write Review"}
            </h1>
            
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 max-w-2xl">
        {/* Time Remaining Alert */}
        <Alert className={`${
          timeRemaining <= 60 ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950" : 
          "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950"
        }`}>
          <Timer className="h-4 w-4" />
          <AlertDescription>
            <strong>Review Deadline:</strong> {formatTimeRemaining(timeRemaining)} to submit your review.
          </AlertDescription>
        </Alert>

        {/* Session Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Session Completed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={otherUser.profileImage} alt={otherUser.name} />
                <AvatarFallback>
                  <User className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium" data-testid="reviewed-person">
                  {otherUser.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {userRole === "professional" ? "Your client" : "Your professional"}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{session.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{getTimeLabel(session.timeSlot)} • {session.duration}h</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating Aspects */}
        <Card>
          <CardHeader>
            <CardTitle>Rate Your Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {ratingAspects.map((aspect) => (
              <div key={aspect.key}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <Label className="font-medium">{aspect.label}</Label>
                    <p className="text-sm text-muted-foreground">{aspect.description}</p>
                  </div>
                  <Badge variant="outline">
                    {aspects[aspect.key as keyof typeof aspects]}/5
                  </Badge>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingChange(aspect.key, star)}
                      className="transition-colors"
                      data-testid={`rating-${aspect.key}-${star}`}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= aspects[aspect.key as keyof typeof aspects]
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 hover:text-yellow-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Overall Rating Display */}
        {rating > 0 && (
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="flex justify-center items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-2xl font-bold">{rating}/5</p>
                <p className="text-muted-foreground">Overall Rating</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Share Your Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={`Tell others about your experience with ${otherUser.name}. What went well? Any specific highlights?`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[120px]"
              data-testid="textarea-review-comment"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Optional - Help others make informed decisions
            </p>
          </CardContent>
        </Card>

        {/* Safety Notice */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Review Guidelines:</strong> Please keep reviews honest, respectful, and focused on the professional service experience.
          </AlertDescription>
        </Alert>

        {/* Submit Button */}
        <Button
          onClick={handleSubmitReview}
          disabled={!canSubmit || isSubmitting}
          className="w-full"
          size="lg"
          data-testid="button-submit-review"
        >
          <Star className="w-4 h-4 mr-2" />
          {isSubmitting ? "Submitting Review..." : 
           existingReview ? "Update Review" : "Submit Review"}
        </Button>

        {!canSubmit && !isSubmitting && (
          <p className="text-center text-sm text-muted-foreground">
            Please rate all aspects to submit your review
          </p>
        )}
      </div>
    </div>
  );
}
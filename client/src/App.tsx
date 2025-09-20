import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import WelcomeScreen from "@/components/WelcomeScreen";
import AuthFlow from "@/components/AuthFlow";
import Dashboard from "@/components/Dashboard";
import HowItWorks from "@/pages/HowItWorks";
import FAQ from "@/pages/FAQ";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import VerificationFailed from "@/components/VerificationFailed";
import VerificationBanner from "@/components/VerificationBanner";
import BottomNavigation from "@/components/BottomNavigation";
import ProfileCard from "@/components/ProfileCard";
import ProfessionalGridCard from "@/components/ProfessionalGridCard";
import SearchFilters from "@/components/SearchFilters";
import BookingCard from "@/components/BookingCard";
import Messages from "@/components/Messages";
import Profile from "@/components/Profile";
import ProfessionalView from "@/components/ProfessionalView";
import BookingRequest from "@/components/BookingRequest";
import BookingPayment from "@/components/BookingPayment";
import BookingDetails from "@/components/BookingDetails";
import Receipt from "@/components/Receipt";
import TimeChangeRequest from "@/components/TimeChangeRequest";
import TimeChangeResponse from "@/components/TimeChangeResponse";
import IDDocumentView from "@/components/IDDocumentView";
import IdentityVerification from "@/components/IdentityVerification";
import SessionStart from "@/components/SessionStart";
import ReviewSystem from "@/components/ReviewSystem";
import SafetyCenter from "@/pages/SafetyCenter";
import HelpSupport from "@/pages/HelpSupport";
import AccountSuspended from "@/pages/AccountSuspended";
import PermanentBan from "@/pages/PermanentBan";
import AgeVerificationFailed from "@/pages/AgeVerificationFailed";
import ProfessionalDashboard from "@/pages/ProfessionalDashboard";
import BookingRequests from "@/pages/BookingRequests";
import EarningsAnalytics from "@/pages/EarningsAnalytics";
import AdminDashboard from "@/pages/AdminDashboard";
import UserVerificationQueue from "@/pages/UserVerificationQueue";
import ContentModeration from "@/pages/ContentModeration";
import SafetyReportsManagement from "@/pages/SafetyReportsManagement";
import NotificationToast, { Notification } from "@/components/NotificationToast";
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";
import maleProfile from "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png";
import { mockProfessionals } from "@mock/professionals";

type AppState = "welcome" | "auth" | "dashboard" | "search" | "bookings" | "messages" | "profile" | "professional-view" | "booking-request" | "booking-payment" | "booking-details" | "receipt" | "time-change-request" | "time-change-response" | "id-document-view" | "identity-verification" | "session-start" | "review-system" | "how-it-works" | "faq" | "terms" | "privacy" | "verification-failed" | "safety-center" | "help-support" | "account-suspended" | "permanent-ban" | "age-verification-failed" | "professional-dashboard" | "booking-requests" | "earnings-analytics" | "admin-dashboard" | "admin-verification-queue" | "admin-content-moderation" | "admin-safety-reports";

function App() {
  const [currentState, setCurrentState] = useState<AppState>("welcome");
  const [activeTab, setActiveTab] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending'); // Demo: showing pending state

  // TODO: Remove mock data  
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    gender: "any",
    ageRange: [18, 65] as [number, number],
    rateRange: [20, 100] as [number, number],
    availability: "any",
    professionalsOnly: false,
    radius: 25
  });
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Booking state management
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [timeChangeRequestId, setTimeChangeRequestId] = useState<string | null>(null);
  
  // Additional state for new features
  const [profileEditMode, setProfileEditMode] = useState(false);
  
  // Notification system state
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Notification management functions
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  
  // Map image paths in mockProfessionals
  const professionalsWithImages = mockProfessionals.map(prof => ({
    ...prof,
    profileImage: prof.profileImage === "@assets/generated_images/Professional_profile_photo_f962fff8.png" 
      ? femaleProfile 
      : prof.profileImage === "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png"
      ? maleProfile
      : prof.profileImage,
    profileImages: prof.profileImages.map((img: string) => 
      img === "@assets/generated_images/Professional_profile_photo_f962fff8.png" 
        ? femaleProfile 
        : img === "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png"
        ? maleProfile
        : img
    )
  }));


  const handleAuthComplete = () => {
    setIsAuthenticated(true);
    setCurrentState("dashboard");
    setActiveTab("home");
    
    // Trigger verification completion notification
    addNotification({
      type: 'verification_approved',
      title: 'Welcome to CuddlePur!',
      message: 'Your account has been successfully verified. Start browsing professionals now!'
    });
  };

  const handleNavigation = (page: string) => {
    setCurrentState(page as AppState);
    setActiveTab(page === "dashboard" ? "home" : page);
  };

  // Handler for selecting a user from dashboard recently online
  const handleSelectUser = (userId: string) => {
    setSelectedProfessional(userId);
    setCurrentState("professional-view");
  };

  // Handler for booking from messages
  const handleBookFromMessages = (professionalId: string) => {
    setSelectedProfessional(professionalId);
    setCurrentState("booking-request");
  };

  // Handler for verification completion
  const handleVerificationSubmitted = () => {
    setVerificationStatus('pending');
    setProfileEditMode(true);
    setCurrentState('profile');
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const stateMap: Record<string, AppState> = {
      home: "dashboard",
      search: "search", 
      bookings: "bookings",
      messages: "messages",
      profile: "profile"
    };
    setCurrentState(stateMap[tabId] || "dashboard");
  };

  const renderContent = () => {
    switch (currentState) {
      case "welcome":
        return (
          <WelcomeScreen
            onGetStarted={() => setCurrentState("auth")}
            onSignIn={() => setCurrentState("auth")}
            onNavigate={(page) => setCurrentState(page as AppState)}
            isAuthenticated={isAuthenticated}
            onGoToApp={() => {
              setCurrentState("dashboard");
              setActiveTab("home");
            }}
          />
        );
      
      case "auth":
        return (
          <AuthFlow
            onComplete={handleAuthComplete}
            onBack={() => setCurrentState("welcome")}
            onNavigateTerms={() => setCurrentState("terms")}
            onNavigatePrivacy={() => setCurrentState("privacy")}
            onVerificationFailed={() => {
              setVerificationStatus('failed');
              setCurrentState("dashboard");
            }}
          />
        );
      
      case "dashboard":
        return (
          <Dashboard
            userName="Alex"
            onNavigate={handleNavigation}
            onSelectUser={handleSelectUser}
            onOpenFilters={() => setIsFiltersOpen(true)}
            verificationStatus={verificationStatus}
          />
        );
      
      case "search":
        return (
          <div className="min-h-screen bg-background pb-20">
            <VerificationBanner 
              verificationStatus={verificationStatus}
              onTryAgain={() => setCurrentState('verification-failed')}
              onSetupProfile={() => setCurrentState('profile')}
            />
            <div className="container mx-auto p-4 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Find Professionals</h1>
                <ThemeToggle />
              </div>
              
              <SearchFilters
                filters={searchFilters}
                onFiltersChange={setSearchFilters}
                onSearch={(query) => console.log('Search:', query)}
                isOpen={isFiltersOpen}
                onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
                activeFilterCount={(() => {
                  const defaults = { 
                    location: "", 
                    gender: "any", 
                    ageRange: [18, 65], 
                    rateRange: [20, 100], 
                    availability: "any", 
                    professionalsOnly: false, 
                    radius: 25 
                  };
                  return Object.entries(searchFilters).filter(([key, value]) => 
                    JSON.stringify(value) !== JSON.stringify(defaults[key as keyof typeof defaults])
                  ).length;
                })()}
              />
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {professionalsWithImages.map((professional) => (
                  <ProfessionalGridCard
                    key={professional.id}
                    id={professional.id}
                    name={professional.name}
                    age={professional.age}
                    location={professional.location}
                    rating={professional.rating}
                    reviewCount={professional.reviewCount}
                    hourlyRate={professional.hourlyRate}
                    profileImage={professional.profileImage}
                    isOnline={professional.isOnline}
                    lastSeen={professional.lastSeen}
                    isVerified={professional.isVerified}
                    isProfessional={true}
                    onClick={(id) => {
                      setSelectedProfessional(id);
                      setCurrentState("professional-view");
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      
      case "bookings":
        return (
          <div className="min-h-screen bg-background pb-20">
            <VerificationBanner 
              verificationStatus={verificationStatus}
              onTryAgain={() => setCurrentState('verification-failed')}
              onSetupProfile={() => setCurrentState('profile')}
            />
            <div className="container mx-auto p-4 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">My Bookings</h1>
                <ThemeToggle />
              </div>
              
              <div className="space-y-4">
                <BookingCard
                  id="1"
                  professionalName="Sarah"
                  professionalImage={femaleProfile}
                  status="accepted"
                  date="Tomorrow"
                  time="2:00 PM"
                  duration={2}
                  location="Your place, 123 Main St"
                  amount={90}
                  notes="Looking forward to a relaxing session"
                  onViewDetails={(id) => {
                    setSelectedBookingId(id);
                    setCurrentState("booking-details");
                  }}
                  onMessage={(id) => {
                    setCurrentState("messages");
                    setActiveTab("messages");
                  }}
                  onPay={(id) => {
                    setSelectedBookingId(id);
                    setCurrentState("booking-payment");
                  }}
                  onCancel={(id) => console.log('Cancel:', id)}
                />
                
                <BookingCard
                  id="2"
                  professionalName="Michael"
                  professionalImage={maleProfile}
                  status="confirmed"
                  date="Friday, Dec 15"
                  time="6:30 PM"
                  duration={1}
                  location="Coffee House, Downtown"
                  amount={45}
                  onViewDetails={(id) => {
                    setSelectedBookingId(id);
                    setCurrentState("booking-details");
                  }}
                  onMessage={(id) => {
                    setCurrentState("messages");
                    setActiveTab("messages");
                  }}
                  onCancel={(id) => console.log('Cancel:', id)}
                />
              </div>
            </div>
          </div>
        );
      
      case "messages":
        return (
          <div className="min-h-screen bg-background pb-20">
            <VerificationBanner 
              verificationStatus={verificationStatus}
              onTryAgain={() => setCurrentState('verification-failed')}
              onSetupProfile={() => setCurrentState('profile')}
            />
            <div className="flex items-center justify-between p-4 border-b">
              <h1 className="text-2xl font-bold">Messages</h1>
              <ThemeToggle />
            </div>
            <div className="h-[calc(100vh-140px)]">
              <Messages onBook={handleBookFromMessages} />
            </div>
          </div>
        );
      
      case "profile":
        return (
          <div className="min-h-screen bg-background pb-20">
            <VerificationBanner 
              verificationStatus={verificationStatus}
              onTryAgain={() => setCurrentState('verification-failed')}
              onSetupProfile={() => setCurrentState('profile')}
            />
            <div className="flex items-center justify-between p-4 border-b">
              <h1 className="text-2xl font-bold">My Profile</h1>
              <ThemeToggle />
            </div>
            <Profile 
              initialEditMode={profileEditMode}
              onSignOut={() => {
                setIsAuthenticated(false);
                setCurrentState("welcome");
              }}
              onBack={() => {
                setProfileEditMode(false);
                setActiveTab("home");
                setCurrentState("dashboard");
              }}
            />
          </div>
        );

      case "professional-view":
        const professional = professionalsWithImages.find(p => p.id === selectedProfessional);
        if (!professional) {
          return (
            <div className="min-h-screen bg-background flex items-center justify-center">
              <p>Professional not found</p>
            </div>
          );
        }
        return (
          <ProfessionalView
            professional={professional}
            onBack={() => setCurrentState("search")}
            onBookSession={(id) => {
              setSelectedProfessional(id);
              setCurrentState("booking-request");
            }}
          />
        );

      case "booking-request":
        const professionalForBooking = professionalsWithImages.find(p => p.id === selectedProfessional);
        if (!professionalForBooking) {
          return (
            <div className="min-h-screen bg-background flex items-center justify-center">
              <p>Professional not found</p>
            </div>
          );
        }
        return (
          <BookingRequest
            professional={professionalForBooking}
            onBack={() => setCurrentState("professional-view")}
            onSubmitRequest={(bookingData) => {
              setCurrentBooking(bookingData);
              setCurrentState("booking-payment");
              
              // Trigger booking request notification
              addNotification({
                type: 'booking_request',
                title: 'Booking Request Sent',
                message: 'Your booking request has been sent to the professional. They will respond within 24 hours.',
                userImage: femaleProfile,
                userName: 'Sarah Johnson'
              });
            }}
          />
        );

      case "booking-payment":
        if (!currentBooking) {
          return (
            <div className="min-h-screen bg-background flex items-center justify-center">
              <p>No booking found</p>
            </div>
          );
        }
        const mockBookingPayment = {
          id: "booking-123",
          professional: {
            id: currentBooking.professionalId,
            name: mockProfessionals.find(p => p.id === currentBooking.professionalId)?.name || "Unknown",
            profileImage: mockProfessionals.find(p => p.id === currentBooking.professionalId)?.profileImage || "",
            isVerified: true
          },
          date: currentBooking.date?.toDateString() || "",
          timeSlot: currentBooking.timeSlot,
          duration: currentBooking.duration,
          location: currentBooking.locationType,
          totalAmount: currentBooking.totalAmount,
          platformFee: Math.round(currentBooking.totalAmount * 0.1),
          sessionAmount: currentBooking.totalAmount - Math.round(currentBooking.totalAmount * 0.1)
        };
        return (
          <BookingPayment
            booking={mockBookingPayment}
            onBack={() => setCurrentState("booking-request")}
            onPaymentComplete={(paymentData) => {
              setCurrentState("bookings");
              setActiveTab("bookings");
              
              // Trigger payment completion notification
              addNotification({
                type: 'booking_paid',
                title: 'Payment Successful',
                message: 'Your payment has been processed successfully. Booking confirmed!',
                userImage: femaleProfile,
                userName: 'Sarah Johnson'
              });
            }}
            onSkipPayment={() => {
              setCurrentState("bookings");
              setActiveTab("bookings");
            }}
          />
        );

      case "booking-details":
        const mockBookingDetails = {
          id: selectedBookingId || "booking-123",
          status: currentBooking?.status || "confirmed" as const,
          professional: {
            id: "1",
            name: "Sarah",
            profileImage: femaleProfile,
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
          paymentStatus: "paid" as const,
          paymentMethod: "credit_card",
          receiptId: "receipt-456",
          createdAt: new Date().toISOString(),
          cancellationDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          refundAmount: 90
        };
        return (
          <BookingDetails
            booking={mockBookingDetails}
            userRole="professional"
            onBack={() => setCurrentState("bookings")}
            onPayNow={() => setCurrentState("booking-payment")}
            onMessage={() => {
              setCurrentState("messages");
              setActiveTab("messages");
            }}
            onRequestTimeChange={() => setCurrentState("time-change-request")}
            onCancel={() => setCurrentState("bookings")}
            onDownloadReceipt={() => setCurrentState("receipt")}
            onVerifyIdentity={() => setCurrentState("id-document-view")}
            onMeetupVerification={() => setCurrentState("identity-verification")}
            onStartSession={() => setCurrentState("session-start")}
            onReviewSession={() => setCurrentState("review-system")}
          />
        );

      case "receipt":
        const mockReceipt = {
          id: "receipt-456",
          transactionId: "TXN-789123456",
          bookingId: "booking-123",
          professional: {
            name: "Sarah",
            profileImage: femaleProfile
          },
          customer: {
            name: "John Doe",
            email: "john@example.com"
          },
          date: "Tomorrow, Dec 14",
          timeSlot: "14:00",
          duration: 2,
          location: "Your place, 123 Main St",
          sessionAmount: 81,
          platformFee: 9,
          totalAmount: 90,
          paymentMethod: "credit_card",
          paymentTimestamp: new Date().toISOString(),
          status: "paid" as const
        };
        return (
          <Receipt
            receipt={mockReceipt}
            onBack={() => setCurrentState("booking-details")}
            onDownload={() => console.log("Download receipt")}
            onEmailReceipt={() => console.log("Email receipt")}
            onPrint={() => window.print()}
          />
        );

      case "time-change-request":
        const mockCurrentBooking = {
          id: selectedBookingId || "booking-123",
          date: "Tomorrow, Dec 14",
          timeSlot: "14:00",
          duration: 2,
          professional: {
            name: "Sarah"
          }
        };
        return (
          <TimeChangeRequest
            booking={mockCurrentBooking}
            onBack={() => setCurrentState("booking-details")}
            onSubmitRequest={(requestData) => {
              console.log("Time change request:", requestData);
              setCurrentState("booking-details");
            }}
          />
        );

      case "time-change-response":
        const mockTimeChangeRequest = {
          id: timeChangeRequestId || "request-789",
          bookingId: "booking-123",
          customer: {
            name: "John Doe",
            profileImage: ""
          },
          currentDate: "Tomorrow, Dec 14",
          currentTimeSlot: "14:00",
          requestedDate: "Friday, Dec 15",
          requestedTimeSlot: "19:00",
          duration: 2,
          reason: "schedule_conflict",
          additionalNotes: "I have a work meeting that got moved to tomorrow afternoon. Would Friday evening work?",
          createdAt: new Date().toISOString()
        };
        return (
          <TimeChangeResponse
            request={mockTimeChangeRequest}
            onBack={() => setCurrentState("bookings")}
            onAccept={(responseData) => {
              console.log("Accepted time change:", responseData);
              setCurrentState("bookings");
            }}
            onDecline={(responseData) => {
              console.log("Declined time change:", responseData);
              setCurrentState("bookings");
            }}
            onCounterOffer={(responseData) => {
              console.log("Counter offer:", responseData);
              setCurrentState("bookings");
            }}
          />
        );

      case "how-it-works":
        return (
          <HowItWorks
            onBack={() => setCurrentState("welcome")}
          />
        );

      case "faq":
        return (
          <FAQ
            onBack={() => setCurrentState("welcome")}
          />
        );

      case "terms":
        return (
          <TermsOfService
            onBack={() => setCurrentState("auth")}
          />
        );

      case "privacy":
        return (
          <PrivacyPolicy
            onBack={() => setCurrentState("welcome")}
          />
        );

      case "id-document-view":
        const mockUserData = {
          id: "user-123",
          name: "Alex Johnson",
          profileImage: femaleProfile,
          idDocument: {
            type: "national_id" as const,
            number: "GHA-001234567",
            frontImage: "id-front.jpg",
            backImage: "id-back.jpg",
            expiryDate: "2028-12-15",
            issuingAuthority: "Ghana Immigration Service"
          },
          personalDetails: {
            fullName: "Alexander Johnson",
            dateOfBirth: "1995-03-22",
            address: "123 Main Street, East Legon, Accra, Ghana",
            phoneNumber: "+233 20 123 4567"
          }
        };
        
        const mockBookingForVerification = {
          id: "booking-123",
          date: "Tomorrow, Dec 14",
          timeSlot: "14:00",
          duration: 2,
          location: "Client's place",
          totalAmount: 90,
          status: "confirmed"
        };

        return (
          <IDDocumentView
            user={mockUserData}
            booking={mockBookingForVerification}
            onBack={() => setCurrentState("bookings")}
            onVerifyIdentity={(verificationData) => {
              console.log("Identity verified:", verificationData);
              setCurrentState("identity-verification");
            }}
            onReportIssue={(issueData) => {
              console.log("Issue reported:", issueData);
              setCurrentState("bookings");
            }}
          />
        );

      case "identity-verification":
        const mockProfessionalForVerification = {
          id: "prof-1",
          name: "Sarah",
          profileImage: femaleProfile,
          phoneNumber: "+233 20 987 6543"
        };

        const mockClientForVerification = {
          id: "client-1", 
          name: "Alex Johnson",
          profileImage: femaleProfile,
          phoneNumber: "+233 20 123 4567"
        };

        const mockBookingForIdentityVerification = {
          id: "booking-123",
          date: "Tomorrow, Dec 14",
          timeSlot: "14:00",
          duration: 2,
          location: "Client's place",
          totalAmount: 90,
          status: "confirmed"
        };

        return (
          <IdentityVerification
            professional={mockProfessionalForVerification}
            client={mockClientForVerification}
            booking={mockBookingForIdentityVerification}
            userRole="professional"
            onBack={() => setCurrentState("id-document-view")}
            onConfirmIdentity={() => {
              console.log("Identity confirmed");
              setCurrentState("session-start");
            }}
            onReportConcern={(concern) => {
              console.log("Concern reported:", concern);
              setCurrentState("bookings");
            }}
            onEmergencyContact={() => {
              console.log("Emergency contact triggered");
            }}
          />
        );

      case "session-start":
        const mockSession = {
          id: "session-123",
          bookingId: "booking-123",
          date: "Today, Dec 13", 
          timeSlot: "14:00",
          duration: 2,
          location: "Client's place",
          totalAmount: 90,
          professional: {
            id: "prof-1",
            name: "Sarah",
            profileImage: femaleProfile,
            role: "professional" as const,
            hasConfirmed: true,
            confirmedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
          },
          client: {
            id: "client-1",
            name: "Alex Johnson", 
            profileImage: femaleProfile,
            role: "client" as const,
            hasConfirmed: false
          },
          status: "waiting_confirmation" as const
        };

        return (
          <SessionStart
            session={mockSession}
            currentUserId="client-1"
            userRole="client"
            onBack={() => setCurrentState("identity-verification")}
            onConfirmStart={() => {
              console.log("Session confirmed");
              // Update booking status to in_progress and navigate back
              setCurrentBooking((prev: any) => ({ ...prev, status: "in_progress" }));
              setCurrentState("booking-details");
            }}
            onStartSession={() => {
              console.log("Session started");
              setCurrentState("review-system");
            }}
            onEndSession={() => {
              console.log("Session ended");
              setCurrentState("review-system");
            }}
          />
        );

      case "review-system":
        const mockCompletedSession = {
          id: "session-123",
          bookingId: "booking-123",
          date: "Today, Dec 13",
          timeSlot: "14:00", 
          duration: 2,
          location: "Client's place",
          totalAmount: 90,
          completedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          professional: {
            id: "prof-1",
            name: "Sarah",
            profileImage: femaleProfile
          },
          client: {
            id: "client-1",
            name: "Alex Johnson",
            profileImage: femaleProfile
          }
        };

        return (
          <ReviewSystem
            session={mockCompletedSession}
            userRole="client"
            timeRemaining={1380} // 23 hours remaining
            onBack={() => setCurrentState("bookings")}
            onSubmitReview={(reviewData) => {
              console.log("Review submitted:", reviewData);
              setCurrentState("bookings");
              
              // Trigger review submission notification
              addNotification({
                type: 'profile_reviewed',
                title: 'Review Submitted',
                message: 'Your review has been submitted successfully. Thank you for your feedback!'
              });
            }}
          />
        );

      case "verification-failed":
        return (
          <VerificationFailed
            onBack={() => setCurrentState("dashboard")}
            onRetry={() => {
              // Reset verification status and navigate to verification
              setVerificationStatus('pending');
              setCurrentState("auth");
            }}
            attemptCount={1}
          />
        );

      case "safety-center":
        return (
          <SafetyCenter onBack={() => setCurrentState("dashboard")} />
        );

      case "help-support":
        return (
          <HelpSupport onBack={() => setCurrentState("dashboard")} />
        );

      case "account-suspended":
        return <AccountSuspended />;

      case "permanent-ban":
        return <PermanentBan />;

      case "age-verification-failed":
        return <AgeVerificationFailed />;

      case "professional-dashboard":
        return (
          <ProfessionalDashboard
            onBack={() => setCurrentState("dashboard")}
            onNavigateToBookingRequests={() => setCurrentState("booking-requests")}
            onNavigateToEarnings={() => setCurrentState("earnings-analytics")}
          />
        );

      case "booking-requests":
        return (
          <BookingRequests
            onBack={() => setCurrentState("professional-dashboard")}
            onViewUserProfile={(userId) => {
              setSelectedProfessional(userId);
              setCurrentState("professional-view");
            }}
          />
        );

      case "earnings-analytics":
        return (
          <EarningsAnalytics
            onBack={() => setCurrentState("professional-dashboard")}
          />
        );

      case "admin-dashboard":
        return (
          <AdminDashboard
            onNavigate={handleNavigation}
          />
        );

      case "admin-verification-queue":
        return (
          <UserVerificationQueue
            onNavigate={handleNavigation}
          />
        );

      case "admin-content-moderation":
        return (
          <ContentModeration
            onNavigate={handleNavigation}
          />
        );

      case "admin-safety-reports":
        return (
          <SafetyReportsManagement
            onNavigate={handleNavigation}
          />
        );
      
      default:
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <p>Page not found</p>
          </div>
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            {renderContent()}
            
            {/* Notification Toast System */}
            <NotificationToast 
              notifications={notifications}
              onDismiss={dismissNotification}
              onMarkAsRead={markNotificationAsRead}
            />
           
            
            {/* Bottom Navigation - only show when authenticated and not on welcome/auth */}
            {isAuthenticated && currentState !== "welcome" && currentState !== "auth" && (
              <BottomNavigation
                activeTab={activeTab}
                onTabChange={handleTabChange}
                unreadMessages={2}
                upcomingBookings={1}
              />
            )}
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

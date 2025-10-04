import { Route, Switch, Redirect } from "wouter";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "./contexts/AuthContext";

// Components
import BasicInfoForm from "@/components/BasicInfoForm";

// Pages
import HowItWorks from "@/pages/HowItWorks";
import FAQ from "@/pages/FAQ";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
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
import IdVerificationFailed from "@/pages/IdVerificationFailed";
import Auth from "@/pages/Auth";
import SearchPage from "@/pages/SearchPage";
import UserPage from "@/pages/UserPage";
import ApplyToPro from "@/pages/ApplyToPro";

// Wrapper components
import WelcomeWrapper from "@/wrappers/WelcomeWrapper";
import BasicInfoWrapper from "@/wrappers/BasicInfoWrapper";
import PhotoUploadWrapper from "@/wrappers/PhotoUploadWrapper";
import IdVerificationWrapper from "@/wrappers/IdVerificationWrapper";
import DashboardWrapper from "@/wrappers/DashboardWrapper";
import MessagesWrapper from "@/wrappers/MessagesWrapper";
import ProfileWrapper from "@/wrappers/ProfileWrapper";
import ProfessionalViewWrapper from "@/wrappers/ProfessionalViewWrapper";
import BookingRequestWrapper from "@/wrappers/BookingRequestWrapper";
import BookingDetailsWrapper from "@/wrappers/BookingDetailsWrapper";
import BookingPaymentWrapper from "@/wrappers/BookingPaymentWrapper";
import BookingPageWrapper from "@/wrappers/BookingPageWrapper";
import { useIsCompletedRegistration } from "./hooks/useIsCompletedRegistration";

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
);

export function Routes() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const isRegistrationComplete = useIsCompletedRegistration();

  // Debug logging
  console.log('Routes render:', {
    isAuthenticated,
    isLoading,
    hasUser: !!user,
    pathname: window.location.pathname,
    search: window.location.search,
    fullUrl: window.location.href
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
 

  // Handle account status redirects
  if (isAuthenticated && user) {
    if (user.status === 'SUSPENDED') {
      return <AccountSuspended />;
    }
    if (user.status === 'BANNED') {
      return <PermanentBan />;
    }
  }
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Switch>
        {/* Public routes - always accessible */}
        <Route path="/" component={WelcomeWrapper} />
        <Route path="/auth" component={Auth} />
        <Route path="/how-it-works" component={() => <HowItWorks onBack={() => window.history.back()} />} />
        <Route path="/faq" component={() => <FAQ onBack={() => window.history.back()} />} />
        <Route path="/terms" component={() => <TermsOfService onBack={() => window.history.back()} />} />
        <Route path="/privacy" component={() => <PrivacyPolicy onBack={() => window.history.back()} />} />
        <Route path="/safety-center" component={() => <SafetyCenter onBack={() => window.history.back()} />} />
        <Route path="/help" component={() => <HelpSupport onBack={() => window.history.back()} />} />

        {/* Protected routes - Setup */}
        {isAuthenticated && isRegistrationComplete && (
          <Route path="/setup/id-verification" component={IdVerificationWrapper} />
        )}

        {/* Protected routes - Main app */}
        {isAuthenticated && isRegistrationComplete && <Route path="/dashboard" component={DashboardWrapper} />}
        {isAuthenticated && isRegistrationComplete && <Route path="/search" component={SearchPage} />}
        {isAuthenticated && isRegistrationComplete && <Route path="/bookings" component={BookingPageWrapper} />}
        {isAuthenticated && isRegistrationComplete && <Route path="/messages" component={MessagesWrapper} />}
        {isAuthenticated && isRegistrationComplete && <Route path="/profile" component={ProfileWrapper} />}
        {isAuthenticated && isRegistrationComplete && <Route path="/user/:id" component={UserPage} />}
        {isAuthenticated && isRegistrationComplete && <Route path="/apply-to-pro" component={ApplyToPro} />}

        {/* Professional routes */}
        {isAuthenticated && isRegistrationComplete && <Route path="/professional/:id" component={ProfessionalViewWrapper} />}

        {/* Booking routes */}
        {isAuthenticated && isRegistrationComplete && <Route path="/booking/request/:professionalId" component={BookingRequestWrapper} />}
        {isAuthenticated && isRegistrationComplete && <Route path="/booking/details/:bookingId" component={BookingDetailsWrapper} />}
        {isAuthenticated && isRegistrationComplete && <Route path="/booking/payment/:bookingId" component={BookingPaymentWrapper} />}

        {/* Professional dashboard */}
        {isAuthenticated && isRegistrationComplete && (
          <Route path="/professional-dashboard" component={() => (
            <ProfessionalDashboard
              onBack={() => window.history.back()}
              onNavigateToBookingRequests={() => window.location.href = '/professional/bookings'}
              onNavigateToEarnings={() => window.location.href = '/professional/earnings'}
            />
          )} />
        )}
        {isAuthenticated && isRegistrationComplete && (
          <Route path="/professional/bookings" component={() => (
            <BookingRequests
              onBack={() => window.history.back()}
              onViewUserProfile={(userId) => window.location.href = `/professional/${userId}`}
            />
          )} />
        )}
        {isAuthenticated && isRegistrationComplete && (
          <Route path="/professional/earnings" component={() => (
            <EarningsAnalytics onBack={() => window.history.back()} />
          )} />
        )}

        {/* Admin routes */}
        {isAuthenticated && isRegistrationComplete && (
          <Route path="/admin" component={() => (
            <AdminDashboard onNavigate={(path) => window.location.href = path} />
          )} />
        )}
        {isAuthenticated && isRegistrationComplete && (
          <Route path="/admin/verification-queue" component={() => (
            <UserVerificationQueue onNavigate={(path) => window.location.href = path} />
          )} />
        )}
        {isAuthenticated && isRegistrationComplete && (
          <Route path="/admin/content-moderation" component={() => (
            <ContentModeration onNavigate={(path) => window.location.href = path} />
          )} />
        )}
        {isAuthenticated && isRegistrationComplete && (
          <Route path="/admin/safety-reports" component={() => (
            <SafetyReportsManagement onNavigate={(path) => window.location.href = path} />
          )} />
        )}

        {/* Account status */}
        {isAuthenticated && isRegistrationComplete && <Route path="/account/suspended" component={() => <AccountSuspended />} />}
        {isAuthenticated && isRegistrationComplete && <Route path="/account/banned" component={() => <PermanentBan />} />}
        {isAuthenticated && isRegistrationComplete && <Route path="/account/age-verification-failed" component={() => <AgeVerificationFailed />} />}
        {isAuthenticated && isRegistrationComplete && <Route path="/account/id-verification-failed" component={() => <IdVerificationFailed />} />}

        {/* Default redirects */}
        {isAuthenticated && isRegistrationComplete && <Route path="/:rest*">{() => <Redirect to="/dashboard" />}</Route>}
        {isAuthenticated && !isRegistrationComplete && <Route path="/:rest*">{() => <Redirect to="/auth" />}</Route>}
        {!isAuthenticated && <Route path="/:rest*">{() => <Redirect to="/" />}</Route>}
      </Switch>
    </Suspense>
  );
}
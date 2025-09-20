import { Route, Switch, Redirect } from "wouter";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

// Components
import SearchPage from "@/components/SearchPage";

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

// Wrapper components
import WelcomeWrapper from "@/wrappers/WelcomeWrapper";
import AuthWrapper from "@/wrappers/AuthWrapper";
import DashboardWrapper from "@/wrappers/DashboardWrapper";
import MessagesWrapper from "@/wrappers/MessagesWrapper";
import ProfileWrapper from "@/wrappers/ProfileWrapper";
import ProfessionalViewWrapper from "@/wrappers/ProfessionalViewWrapper";
import BookingRequestWrapper from "@/wrappers/BookingRequestWrapper";
import BookingDetailsWrapper from "@/wrappers/BookingDetailsWrapper";
import BookingPaymentWrapper from "@/wrappers/BookingPaymentWrapper";
import BookingPageWrapper from "@/wrappers/BookingPageWrapper";

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
);

interface RoutesProps {
  isAuthenticated: boolean;
  onAuthComplete: () => void;
}

export function Routes({ isAuthenticated, onAuthComplete }: RoutesProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Switch>
        {/* Public routes */}
        <Route path="/" component={WelcomeWrapper} />
        <Route path="/auth" component={() => <AuthWrapper onAuthComplete={onAuthComplete} />} />
        <Route path="/how-it-works" component={() => <HowItWorks onBack={() => window.history.back()} />} />
        <Route path="/faq" component={() => <FAQ onBack={() => window.history.back()} />} />
        <Route path="/terms" component={() => <TermsOfService onBack={() => window.history.back()} />} />
        <Route path="/privacy" component={() => <PrivacyPolicy onBack={() => window.history.back()} />} />
        
        {/* Protected routes */}
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" component={DashboardWrapper} />
            <Route path="/search" component={() => <SearchPage />} />
            <Route path="/bookings" component={BookingPageWrapper} />
            <Route path="/messages" component={MessagesWrapper} />
            <Route path="/profile" component={ProfileWrapper} />
            
            {/* Professional routes */}
            <Route path="/professional/:id" component={ProfessionalViewWrapper} />
            
            {/* Booking routes */}
            <Route path="/booking/request/:professionalId" component={BookingRequestWrapper} />
            <Route path="/booking/details/:bookingId" component={BookingDetailsWrapper} />
            <Route path="/booking/payment/:bookingId" component={BookingPaymentWrapper} />
            
            {/* Support */}
            <Route path="/safety-center" component={() => <SafetyCenter onBack={() => window.history.back()} />} />
            <Route path="/help" component={() => <HelpSupport onBack={() => window.history.back()} />} />
            
            {/* Professional dashboard */}
            <Route path="/professional-dashboard" component={() => (
              <ProfessionalDashboard 
                onBack={() => window.history.back()}
                onNavigateToBookingRequests={() => window.location.href = '/professional/bookings'}
                onNavigateToEarnings={() => window.location.href = '/professional/earnings'}
              />
            )} />
            <Route path="/professional/bookings" component={() => (
              <BookingRequests 
                onBack={() => window.history.back()}
                onViewUserProfile={(userId) => window.location.href = `/professional/${userId}`}
              />
            )} />
            <Route path="/professional/earnings" component={() => (
              <EarningsAnalytics onBack={() => window.history.back()} />
            )} />
            
            {/* Admin routes */}
            <Route path="/admin" component={() => (
              <AdminDashboard onNavigate={(path) => window.location.href = path} />
            )} />
            <Route path="/admin/verification-queue" component={() => (
              <UserVerificationQueue onNavigate={(path) => window.location.href = path} />
            )} />
            <Route path="/admin/content-moderation" component={() => (
              <ContentModeration onNavigate={(path) => window.location.href = path} />
            )} />
            <Route path="/admin/safety-reports" component={() => (
              <SafetyReportsManagement onNavigate={(path) => window.location.href = path} />
            )} />
            
            {/* Account status */}
            <Route path="/account/suspended" component={() => <AccountSuspended />} />
            <Route path="/account/banned" component={() => <PermanentBan />} />
            <Route path="/account/age-verification-failed" component={() => <AgeVerificationFailed />} />
            
            {/* Default redirect for authenticated users */}
            <Route path="/:rest*">{() => <Redirect to="/dashboard" />}</Route>
          </>
        ) : (
          /* Redirect to welcome for non-authenticated users */
          <Route path="/:rest*">{() => <Redirect to="/" />}</Route>
        )}
      </Switch>
    </Suspense>
  );
}
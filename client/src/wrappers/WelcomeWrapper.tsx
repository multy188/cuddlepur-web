import { useLocation } from "wouter";
import WelcomeScreen from "@/components/WelcomeScreen";

export default function WelcomeWrapper() {
  const [, setLocation] = useLocation();
  
  return (
    <WelcomeScreen
      onGetStarted={() => setLocation("/auth")}
      onSignIn={() => setLocation("/auth")}
      onNavigate={(page) => {
        const routes: Record<string, string> = {
          'how-it-works': '/how-it-works',
          'faq': '/faq',
          'terms': '/terms',
          'privacy': '/privacy'
        };
        setLocation(routes[page] || '/');
      }}
      isAuthenticated={false}
      onGoToApp={() => setLocation("/dashboard")}
    />
  );
}
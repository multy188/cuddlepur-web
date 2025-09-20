import { ReactNode } from "react";
import { useLocation } from "wouter";
import BottomNavigation from "./BottomNavigation";
import { useMessages } from "@/hooks";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const { unreadMessages } = useMessages();

  // Pages that should not show bottom navigation
  const hideBottomNavPages = [
    "/",
    "/auth",
    "/how-it-works",
    "/faq",
    "/terms",
    "/privacy",
  ];

  const shouldShowBottomNav = !hideBottomNavPages.includes(location);

  const getActiveTab = () => {
    if (location === "/dashboard") return "home";
    if (location === "/search") return "search";
    if (location.startsWith("/booking")) return "bookings";
    if (location === "/messages") return "messages";
    if (location === "/profile") return "profile";
    return "home";
  };

  const handleTabChange = (tabId: string) => {
    const routes: Record<string, string> = {
      home: "/dashboard",
      search: "/search",
      bookings: "/bookings",
      messages: "/messages",
      profile: "/profile",
    };
    setLocation(routes[tabId] || "/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {children}

      {shouldShowBottomNav && (
        <BottomNavigation
          activeTab={getActiveTab()}
          onTabChange={handleTabChange}
          unreadMessages={unreadMessages}
          upcomingBookings={1}
        />
      )}
    </div>
  );
}

import { useState } from "react";
import BottomNavigation from '../BottomNavigation';

export default function BottomNavigationExample() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="relative h-24">
      <div className="absolute inset-0">
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          unreadMessages={3}
          upcomingBookings={1}
        />
      </div>
    </div>
  );
}
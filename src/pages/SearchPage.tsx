import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { useDebounce } from "@/hooks/use-debounce";
import SearchFilters from "@/components/SearchFilters";
import UserGridCard from "@/components/UserGridCard";
import UserCardSkeleton from "@/components/UserCardSkeleton";
import { useAllUsers } from "@/hooks";
import { useSocket } from "@/contexts/SocketContext";
import { useSearchPreferences } from "@/hooks/useSearchPreferences";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_FILTERS = {
  location: "",
  gender: "any",
  relationshipStatus: "any",
  hasPicture: false,
  ageRange: [18, 65] as [number, number],
  rateRange: [20, 100] as [number, number],
  availability: "any",
  userType: "any",
  radius: 25,
  professionalsOnly: false,
};

export default function SearchPage() {
  const [, setLocation] = useLocation();
  const { onlineUsers } = useSocket();
  const { preferences, savePreferences, isSaving } = useSearchPreferences();
  const { toast } = useToast();

  // Initialize with preferences (from localStorage) or defaults
  const [searchFilters, setSearchFilters] = useState(() => {
    return preferences || DEFAULT_FILTERS;
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Debounce filter changes for 500ms
  const debouncedFilters = useDebounce(searchFilters, 500);

  // Convert filters to API params
  const apiParams = useMemo(() => {
    const params: any = {};

    if (debouncedFilters.gender !== "any") {
      params.gender = debouncedFilters.gender;
    }

    if (debouncedFilters.relationshipStatus !== "any") {
      params.relationshipStatus = debouncedFilters.relationshipStatus;
    }

    if (debouncedFilters.hasPicture) {
      params.hasPicture = true;
    }

    if (debouncedFilters.userType !== "any") {
      params.userType = debouncedFilters.userType === "professionals" ? "PROFESSIONAL" : undefined;
    }

    if (debouncedFilters.professionalsOnly) {
      params.userType = "PROFESSIONAL";
    }

    params.radius = debouncedFilters.radius;
    params.minAge = debouncedFilters.ageRange[0];
    params.maxAge = debouncedFilters.ageRange[1];

    return params;
  }, [debouncedFilters]);

  // Fetch users with debounced filters
  const { users, isLoading } = useAllUsers(apiParams);

  // Handle save preferences
  const handleSavePreferences = () => {
    savePreferences(searchFilters);
    toast({
      title: "Preferences Saved",
      description: "Your search preferences have been saved successfully.",
    });
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="min-h-screen bg-background pb-20 overflow-y-auto pt-1">
      <div className="container mx-auto p-4 space-y-6">
        <SearchFilters
          filters={searchFilters}
          onFiltersChange={setSearchFilters}
          onSearch={(query) => console.log("Search:", query)}
          isOpen={isFiltersOpen}
          onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
          onSavePreferences={handleSavePreferences}
          onClearFilters={handleClearFilters}
          activeFilterCount={(() => {
            return Object.entries(searchFilters).filter(
              ([key, value]) =>
                JSON.stringify(value) !==
                JSON.stringify(DEFAULT_FILTERS[key as keyof typeof DEFAULT_FILTERS])
            ).length;
          })()}
        />

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <UserCardSkeleton key={index} variant="medium" />
            ))}
          </div>
        ) : users.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-12">
            <img
              src="/assets/emptySearch.svg"
              alt="No results found"
              className="w-64 h-64 mb-6"
            />
            <h3 className="text-lg font-semibold mb-2">No users found</h3>
            <p className="text-muted-foreground text-center mb-6">
              Try adjusting your search filters to find more results
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {users.map((user: any) => (
              <UserGridCard
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username}
                age={user.age}
                gender={user.gender}
                location={user.location}
                rating={user.rating}
                reviewCount={user.reviewCount}
                hourlyRate={user.hourlyRate}
                profileImage={user.profileImage}
                isOnline={onlineUsers.includes(user.id)}
                lastSeen={user.lastSeen}
                isVerified={user.isVerified}
                isProfessional={user.userType === 'PROFESSIONAL'}
                onClick={(id) => {
                  // Navigate to user page
                  setLocation(`/user/${id}`);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

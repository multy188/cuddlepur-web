import { useState } from "react";
import { useLocation } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import SearchFilters from "@/components/SearchFilters";
import ProfessionalGridCard from "@/components/ProfessionalGridCard";
import { useAllUsers } from "@/hooks";

export default function SearchPage() {
  const [, setLocation] = useLocation();
  const { users } = useAllUsers();

  const [searchFilters, setSearchFilters] = useState({
    location: "",
    gender: "any",
    ageRange: [18, 65] as [number, number],
    rateRange: [20, 100] as [number, number],
    availability: "any",
    userType: "any", // Changed from professionalsOnly to userType
    radius: 25,
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Find Cuddlers</h1>
          <ThemeToggle />
        </div>

        <SearchFilters
          filters={searchFilters}
          onFiltersChange={setSearchFilters}
          onSearch={(query) => console.log("Search:", query)}
          isOpen={isFiltersOpen}
          onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
          activeFilterCount={(() => {
            const defaults = {
              location: "",
              gender: "any",
              ageRange: [18, 65],
              rateRange: [20, 100],
              availability: "any",
              userType: "any",
              radius: 25,
            };
            return Object.entries(searchFilters).filter(
              ([key, value]) =>
                JSON.stringify(value) !==
                JSON.stringify(defaults[key as keyof typeof defaults])
            ).length;
          })()}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map((user: any) => (
            <ProfessionalGridCard
              key={user.id}
              id={user.id}
              name={user.name}
              age={user.age}
              location={user.location}
              rating={user.rating}
              reviewCount={user.reviewCount}
              hourlyRate={user.hourlyRate}
              profileImage={user.profileImage}
              isOnline={user.isOnline}
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
      </div>
    </div>
  );
}

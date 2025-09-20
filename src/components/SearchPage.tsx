import { useState } from "react";
import { useLocation } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import VerificationBanner from "@/components/VerificationBanner";
import SearchFilters from "@/components/SearchFilters";
import ProfessionalGridCard from "@/components/ProfessionalGridCard";
import { useProfessionals } from "@/hooks";

export default function SearchPage() {
  const [, setLocation] = useLocation();
  const { professionals } = useProfessionals();
  
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    gender: "any",
    ageRange: [18, 65] as [number, number],
    rateRange: [20, 100] as [number, number],
    availability: "any",
    professionalsOnly: false,
    radius: 25
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <VerificationBanner 
        verificationStatus="pending"
        onTryAgain={() => setLocation('/verification/failed')}
        onSetupProfile={() => setLocation('/profile')}
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
          {professionals.map((professional) => (
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
                setLocation(`/professional/${id}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
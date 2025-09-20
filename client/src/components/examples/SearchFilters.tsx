import { useState } from "react";
import SearchFilters from '../SearchFilters';

export default function SearchFiltersExample() {
  const [filters, setFilters] = useState({
    location: "",
    gender: "any",
    ageRange: [18, 65] as [number, number],
    rateRange: [20, 100] as [number, number],
    availability: "any",
    professionalsOnly: false,
    radius: 25
  });
  const [isOpen, setIsOpen] = useState(false);

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'location') return value !== "";
    if (key === 'gender' || key === 'availability') return value !== "any";
    if (key === 'ageRange') {
      const range = value as [number, number];
      return range[0] !== 18 || range[1] !== 65;
    }
    if (key === 'rateRange') {
      const range = value as [number, number];
      return range[0] !== 20 || range[1] !== 100;
    }
    if (key === 'professionalsOnly') return value !== false;
    if (key === 'radius') return value !== 25;
    return false;
  }).length;

  return (
    <div className="p-4 max-w-md">
      <SearchFilters
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={(query) => console.log('Search:', query)}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        activeFilterCount={activeFilterCount}
      />
    </div>
  );
}
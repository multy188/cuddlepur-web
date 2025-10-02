import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, X } from "lucide-react";

interface Filters {
  location: string;
  gender: string;
  ageRange: [number, number];
  rateRange: [number, number];
  availability: string;
  professionalsOnly: boolean;
  radius: number;
}

interface SearchFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onSearch: (query: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  activeFilterCount: number;
}

export default function SearchFilters({
  filters,
  onFiltersChange,
  onSearch,
  isOpen,
  onToggle,
  activeFilterCount
}: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      location: "",
      gender: "any",
      ageRange: [18, 65],
      rateRange: [20, 100],
      availability: "any",
      professionalsOnly: false,
      radius: 25
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="space-y-4">
      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onToggle}
          className="flex items-center gap-2"
          data-testid="button-filter-toggle"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
        </Button>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            data-testid="button-clear-filters"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <Card className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Filter Results</h3>
            <Button variant="ghost" size="sm" onClick={onToggle}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter city or area"
              value={filters.location}
              onChange={(e) => updateFilter("location", e.target.value)}
              data-testid="input-location"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label>Gender</Label>
            <Select value={filters.gender} onValueChange={(value) => updateFilter("gender", value)}>
              <SelectTrigger data-testid="select-gender">
                <SelectValue placeholder="Any gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any gender</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Age Range */}
          <div className="space-y-3">
            <Label>Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}</Label>
            <Slider
              value={filters.ageRange}
              onValueChange={(value) => updateFilter("ageRange", value as [number, number])}
              min={18}
              max={65}
              step={1}
              className="w-full"
              data-testid="slider-age"
            />
          </div>

          {/* Rate Range */}
          <div className="space-y-3">
            <Label>Hourly Rate: ${filters.rateRange[0]} - ${filters.rateRange[1]}</Label>
            <Slider
              value={filters.rateRange}
              onValueChange={(value) => updateFilter("rateRange", value as [number, number])}
              min={20}
              max={100}
              step={5}
              className="w-full"
              data-testid="slider-rate"
            />
          </div>


          {/* Availability */}
          <div className="space-y-2">
            <Label>Availability</Label>
            <Select value={filters.availability} onValueChange={(value) => updateFilter("availability", value)}>
              <SelectTrigger data-testid="select-availability">
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="online">Online now</SelectItem>
                <SelectItem value="morning">Morning available</SelectItem>
                <SelectItem value="afternoon">Afternoon available</SelectItem>
                <SelectItem value="evening">Evening available</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Professionals Only */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="professionalsOnly"
              checked={filters.professionalsOnly}
              onCheckedChange={(checked) => updateFilter("professionalsOnly", !!checked)}
              data-testid="checkbox-professionals-only"
            />
            <Label htmlFor="professionalsOnly">Verified professionals only</Label>
          </div>

          {/* Radius */}
          <div className="space-y-3">
            <Label>Search Radius: {filters.radius} km</Label>
            <Slider
              value={[filters.radius]}
              onValueChange={(value) => updateFilter("radius", value[0])}
              min={5}
              max={50}
              step={5}
              className="w-full"
              data-testid="slider-radius"
            />
          </div>
        </Card>
      )}
    </div>
  );
}
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
  hasPicture: boolean;
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
  onSavePreferences?: () => void;
  onClearFilters?: () => void;
}

export default function SearchFilters({
  filters,
  onFiltersChange,
  onSearch,
  isOpen,
  onToggle,
  activeFilterCount,
  onSavePreferences,
  onClearFilters
}: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="space-y-2">
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

        <div className="flex items-center gap-2">
          {onSavePreferences && (
            <Button variant="outline" size="sm" onClick={onSavePreferences}>
              Save Preference
            </Button>
          )}
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              data-testid="button-clear-filters"
            >
              Clear all
            </Button>
          )}
        </div>
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

          <div className="space-y-6">
            {/* Gender - Half Width on Desktop, Full Width on Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="hidden md:block"></div> {/* Empty column - hidden on mobile */}
            </div>

            {/* Age Range and Radius - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              {/* Radius */}
              <div className="space-y-3">
                <Label>Search Radius: {filters.radius} km</Label>
                <Slider
                  value={[filters.radius]}
                  onValueChange={(value) => updateFilter("radius", value[0])}
                  min={0}
                  max={150}
                  step={5}
                  className="w-full"
                  data-testid="slider-radius"
                />
              </div>
            </div>

            {/* Checkboxes - Same Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasPicture"
                  checked={filters.hasPicture}
                  onCheckedChange={(checked) => updateFilter("hasPicture", !!checked)}
                  data-testid="checkbox-has-picture"
                />
                <Label htmlFor="hasPicture">Has profile picture</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="professionalsOnly"
                  checked={filters.professionalsOnly}
                  onCheckedChange={(checked) => updateFilter("professionalsOnly", !!checked)}
                  data-testid="checkbox-professionals-only"
                />
                <Label htmlFor="professionalsOnly">Verified professionals only</Label>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
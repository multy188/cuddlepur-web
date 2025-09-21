import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LocationSuggestionsProps {
  location: string;
  filteredSuggestions: string[];
  showSuggestions: boolean;
  onLocationChange: (value: string) => void;
  onLocationFocus: () => void;
  onLocationBlur: () => void;
  onSuggestionClick: (city: string) => void;
}

const LocationSuggestions = ({
  location,
  filteredSuggestions,
  showSuggestions,
  onLocationChange,
  onLocationFocus,
  onLocationBlur,
  onSuggestionClick
}: LocationSuggestionsProps) => {
  return (
    <div className="relative">
      <Label htmlFor="location">Location</Label>
      <Input
        id="location"
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
        onFocus={onLocationFocus}
        onBlur={onLocationBlur}
        placeholder="Enter your city"
        required
      />
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
          {filteredSuggestions.slice(0, 8).map((city, index) => (
            <button
              key={index}
              type="button"
              className="w-full px-3 py-2 text-left hover:bg-muted transition-colors text-sm"
              onClick={() => onSuggestionClick(city)}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSuggestions;
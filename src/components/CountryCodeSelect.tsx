import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ChevronDown, Check } from "lucide-react";
import { countryCodes, CountryCode } from "@/data/countryCodes";
import { cn } from "@/lib/utils";

interface CountryCodeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export default function CountryCodeSelect({ value, onValueChange, disabled, className }: CountryCodeSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const selectedCountry = countryCodes.find(c => c.dial_code === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select country code"
          className={cn(
            "w-[120px] justify-between bg-background hover:bg-background border-input text-foreground hover:text-foreground",
            className
          )}
          disabled={disabled}
          data-testid="select-country-code"
        >
          {selectedCountry ? (
            <span className="flex items-center gap-2 truncate">
              <span className="text-lg">{selectedCountry.flag}</span>
              <span className="text-sm">{selectedCountry.dial_code}</span>
            </span>
          ) : (
            <span>Select...</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search country..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countryCodes
                .filter(country => {
                  const query = searchQuery.toLowerCase();
                  return (
                    country.name.toLowerCase().includes(query) ||
                    country.dial_code.includes(query) ||
                    country.code.toLowerCase().includes(query)
                  );
                })
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.dial_code}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue);
                      setOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="flex-1">{country.name}</span>
                    <span className="text-sm text-muted-foreground">{country.dial_code}</span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === country.dial_code ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
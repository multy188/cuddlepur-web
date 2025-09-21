import { Label } from "@/components/ui/label";
import { VALIDATION_RULES } from "@/constants/auth";

interface WhatFriendsSayFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const WhatFriendsSayField = ({ value, onChange }: WhatFriendsSayFieldProps) => {
  return (
    <div>
      <Label htmlFor="whatFriendsSay">What do your friends say about you? *</Label>
      <textarea
        id="whatFriendsSay"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tell us what your friends would say about your personality..."
        className="w-full min-h-[80px] p-3 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        maxLength={VALIDATION_RULES.BIO_MAX_LENGTH}
        required
      />
      <div className="text-xs text-muted-foreground text-right">
        {value.length}/{VALIDATION_RULES.BIO_MAX_LENGTH} characters
      </div>
    </div>
  );
};

export default WhatFriendsSayField;
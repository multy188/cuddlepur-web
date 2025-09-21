import { Label } from "@/components/ui/label";

interface SessionPreferencesProps {
  openToIncall: boolean;
  openToOutcall: boolean;
  onIncallChange: (value: boolean) => void;
  onOutcallChange: (value: boolean) => void;
}

const SessionPreferences = ({
  openToIncall,
  openToOutcall,
  onIncallChange,
  onOutcallChange
}: SessionPreferencesProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Session Preferences</Label>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="openToIncall"
          checked={openToIncall}
          onChange={(e) => onIncallChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <Label htmlFor="openToIncall" className="text-sm font-normal cursor-pointer">
          I am open to incall (hosting sessions at my location)
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="openToOutcall"
          checked={openToOutcall}
          onChange={(e) => onOutcallChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <Label htmlFor="openToOutcall" className="text-sm font-normal cursor-pointer">
          I am open to outcall (traveling to someone else's location)
        </Label>
      </div>
    </div>
  );
};

export default SessionPreferences;
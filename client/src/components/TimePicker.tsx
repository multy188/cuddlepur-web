import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface TimePickerProps {
  value: string; // Format: "HH:MM"
  onChange: (time: string) => void;
  className?: string;
}

export default function TimePicker({ value, onChange, className }: TimePickerProps) {
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("PM");

  // Parse initial value
  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      const hourNum = parseInt(h);
      
      if (hourNum === 0) {
        setHour("12");
        setPeriod("AM");
      } else if (hourNum < 12) {
        setHour(hourNum.toString());
        setPeriod("AM");
      } else if (hourNum === 12) {
        setHour("12");
        setPeriod("PM");
      } else {
        setHour((hourNum - 12).toString());
        setPeriod("PM");
      }
      
      setMinute(m);
    }
  }, [value]);

  // Update parent when time changes
  useEffect(() => {
    let hourNum = parseInt(hour);
    
    if (period === "AM" && hourNum === 12) {
      hourNum = 0;
    } else if (period === "PM" && hourNum !== 12) {
      hourNum += 12;
    }
    
    const timeString = `${hourNum.toString().padStart(2, "0")}:${minute}`;
    onChange(timeString);
  }, [hour, minute, period, onChange]);

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

  const ScrollPicker = ({ 
    items, 
    value, 
    onChange, 
    label 
  }: { 
    items: string[]; 
    value: string; 
    onChange: (value: string) => void; 
    label: string;
  }) => {
    return (
      <div className="flex flex-col items-center">
        <Label className="text-sm font-medium mb-2">{label}</Label>
        <div className="h-32 w-16 overflow-y-scroll border rounded-md bg-card">
          <div className="py-2">
            {items.map((item) => (
              <button
                key={item}
                onClick={() => onChange(item)}
                className={`
                  w-full py-2 px-3 text-center hover:bg-accent transition-colors
                  ${value === item ? "bg-primary text-primary-foreground" : ""}
                `}
                data-testid={`time-picker-${label.toLowerCase()}-${item}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex justify-center gap-4 items-end">
          <ScrollPicker
            items={hours}
            value={hour}
            onChange={setHour}
            label="Hour"
          />
          
          <div className="text-2xl font-bold pb-8">:</div>
          
          <ScrollPicker
            items={minutes.filter((_, i) => i % 15 === 0)} // Show 00, 15, 30, 45
            value={minute}
            onChange={setMinute}
            label="Minutes"
          />
          
          <ScrollPicker
            items={["AM", "PM"]}
            value={period}
            onChange={setPeriod}
            label="Period"
          />
        </div>
      </CardContent>
    </Card>
  );
}
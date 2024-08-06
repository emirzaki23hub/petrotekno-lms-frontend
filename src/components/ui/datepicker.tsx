"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Define props interface for DatePicker
interface DatePickerProps {
  date?: Date; // Currently selected date
  onDateChange?: (date: Date | undefined) => void; // Callback for date change
  placeholder?: string; // Placeholder text
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left bg-white font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <span className="w-full">
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </span>
          <CalendarIcon className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          className="bg-white"
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

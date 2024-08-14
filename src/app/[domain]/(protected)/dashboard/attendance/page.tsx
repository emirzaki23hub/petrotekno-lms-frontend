"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { DatePicker } from "@/components/ui/datepicker";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dummy data for the table
const dummyData = [
  { date: "2024-08-01", clockedInTime: "08:30:00" },
  { date: "2024-08-02", clockedInTime: "" }, // Empty clocked in time
  { date: "2024-08-03", clockedInTime: "08:45:00" },
  { date: "2024-08-04", clockedInTime: "" }, // Empty clocked in time
  { date: "2024-08-05", clockedInTime: "08:50:00" },
];

const Page = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const getDayOfWeek = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return format(date, "EEEE"); // Day of the week
  };

  // Filter data based on the selected date
  const filteredData = selectedDate
    ? dummyData.filter(
        (item) =>
          format(new Date(item.date), "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
      )
    : dummyData;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full max-lg:gap-2 max-lg:flex-col justify-between items-center">
        <h1 className="text-[34px] font-bold">Absence</h1>
        <div className="flex items-center space-x-2">
          <DatePicker
            date={selectedDate} // Use `date` prop instead of `selected`
            onDateChange={(date) => setSelectedDate(date)} // Use `onDateChange` prop
          />
        </div>
      </div>
      <div className="bg-white h-full rounded-m flex gap-4 flex-col p-4">
        <div className="text-[20px] leading-6 pb-4 font-bold border-[rgb(228,230,232)] border-b flex items-start justify-between">
          <div>List Attendance</div>
        </div>

        <Table className="max-w-[629px] rounded-lg font-mono">
          <TableHeader className="rounded-lg">
            <TableRow className="bg-neutral-100 h-10 rounded-lg">
              <TableHead>Attendance Date</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>In</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <TableRow
                  className={index % 2 === 0 ? "bg-[#FAFAFA]" : ""} // Add background color to even rows
                  key={index}
                >
                  <TableCell>
                    {format(new Date(item.date), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell>{getDayOfWeek(item.date)}</TableCell>
                  <TableCell>{item.clockedInTime || "-"}</TableCell>{" "}
                  {/* Display '-' if clockedInTime is empty */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No records found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;

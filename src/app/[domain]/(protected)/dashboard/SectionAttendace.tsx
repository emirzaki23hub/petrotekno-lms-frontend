import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AbsenceAttendance = () => {
  const getCurrentDate = () => format(new Date(), "dd MMM yyyy");
  const getCurrentTime = () => format(new Date(), "HH:mm:ss");

  const [currentDate, setCurrentDate] = useState(getCurrentDate);
  const [currentTime, setCurrentTime] = useState(getCurrentTime);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(getCurrentTime());
    };

    // Set interval to update time every second
    const intervalId = setInterval(updateClock, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const checkInTime = localStorage.getItem("checkInTime");
    if (checkInTime) {
      setIsCheckedIn(true);
    }
  }, []);

  const handleClockIn = () => {
    const now = new Date();
    localStorage.setItem("checkInTime", now.toISOString());
    setIsCheckedIn(true);
    alert("Check-in time saved!");
  };

  return (
    <div className="bg-white h-full rounded-m flex gap-4 flex-col p-4">
      <div className="text-[20px] leading-6 pb-4 font-bold border-[rgb(228,230,232)] border-b flex items-start justify-between">
        <div>Absence Attendance</div>
        <Link
          className="!text-base !text-success-500 transition-all duration-300 hover:opacity-70"
          href={"/dashboard/attendance"}
        >
          View all
        </Link>
      </div>

      <div className="flex gap-2 items-center max-lg:justify-between">
        <div className="flex flex-col py-4 font-mono text-[18px] leading-7 text-neutral-800 font-bold">
          <div suppressHydrationWarning>Date: {currentDate}</div>
          <div suppressHydrationWarning>Time: {currentTime}</div>
        </div>
        <Button
          className="bg-success-500 transition-all duration-300 hover:opacity-70 h-[56px] text-base rounded-m font-mono text-white"
          onClick={handleClockIn}
          disabled={isCheckedIn}
        >
          {isCheckedIn ? "Checked In" : "Clock IN"}
        </Button>
      </div>
    </div>
  );
};

export default AbsenceAttendance;

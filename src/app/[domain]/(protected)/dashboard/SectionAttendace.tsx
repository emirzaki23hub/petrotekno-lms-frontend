"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { restAttendance } from "@/rest/restAttendance";
import { useDomainHelper } from "@/hooks/useDomainHelper";

const AbsenceAttendance = () => {
  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();
  const [currentDate, setCurrentDate] = useState(() =>
    format(new Date(), "dd MMM yyyy")
  );
  const [currentTime, setCurrentTime] = useState(() =>
    format(new Date(), "HH:mm:ss")
  );
  const [attendanceStatus, setAttendanceStatus] = useState<string>("");
  const [message, setMessage] = useState<string>("Checking status...");
  const [loading, setLoading] = useState(false);

  // ⏰ Update current time every second
  useEffect(() => {
    const intervalId = setInterval(
      () => setCurrentTime(format(new Date(), "HH:mm:ss")),
      1000
    );
    return () => clearInterval(intervalId);
  }, []);

  // 📡 Fetch attendance status
  const fetchStatus = async () => {
    try {
      const res = await restAttendance.getStatus(partBeforeDot);
      const apiData = res?.data?.data;

      if (apiData) {
        // Determine the status manually
        if (!apiData.clock_in_at) {
          setAttendanceStatus("ready_to_clock_in");
          setMessage("Anda siap untuk Clock In hari ini.");
        } else if (apiData.clock_in_at && !apiData.clock_out_at) {
          setAttendanceStatus("ready_to_clock_out");
          setMessage("Anda siap untuk Clock Out hari ini.");
        } else if (apiData.clock_in_at && apiData.clock_out_at) {
          setAttendanceStatus("done");
          setMessage("Kehadiran Anda hari ini sudah lengkap.");
        }
      } else {
        setAttendanceStatus("");
        setMessage("Status tidak tersedia");
      }
    } catch (error) {
      console.error("Failed to fetch attendance status:", error);
      setMessage("Gagal memuat status absensi");
    }
  };


  useEffect(() => {
    fetchStatus();
  }, []);

  const handleClockIn = async () => {
    try {
      setLoading(true);
      const res = await restAttendance.clockIn(partBeforeDot);
      await fetchStatus();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClockOut = async () => {
    try {
      setLoading(true);
      const res = await restAttendance.clockOut(partBeforeDot);
      await fetchStatus();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🎛 Determine button label and behavior
  const getButtonProps = () => {
    switch (attendanceStatus) {
      case "ready_to_clock_in":
        return { label: "Clock IN", action: handleClockIn, disabled: false };
      case "ready_to_clock_out":
        return { label: "Clock OUT", action: handleClockOut, disabled: false };
      case "done":
        return { label: "Attendance Complete", action: () => { }, disabled: true };
      default:
        return { label: "Loading...", action: () => { }, disabled: true };
    }
  };

  const { label, action, disabled } = getButtonProps();

  return (
    <div className="bg-white h-full rounded-m flex gap-4 flex-col p-4">
      <div className="text-[20px] leading-6 pb-4 font-bold border-b border-gray-200 flex items-start justify-between">
        <div>Absence Attendance</div>
        {/* <Link
          className="!text-base !text-success-500 transition-all duration-300 hover:opacity-70"
          href="/dashboard/attendance"
        >
          View all
        </Link> */}
      </div>

      <div className="flex gap-5 items-center max-lg:justify-between">
        <div className="flex flex-col py-4 font-mono text-[18px] leading-7 text-neutral-800 font-bold">
          <div suppressHydrationWarning>Date: {currentDate}</div>
          <div suppressHydrationWarning>Time: {currentTime}</div>
          <div className="text-sm text-gray-500 mt-2">{message}</div>
        </div>

        <Button
          className="bg-success-500 transition-all duration-300 hover:opacity-70 h-[56px] text-base rounded-m font-mono text-white"
          onClick={action}
          disabled={loading || disabled}
        >
          {loading ? "Processing..." : label}
        </Button>
      </div>
    </div>
  );
};

export default AbsenceAttendance;

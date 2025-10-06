import { getData } from "@/lib/fetch";
import { BaseResponse } from "@/types/auth";

const getAuthToken = () => {
    if (typeof window === "undefined") return ""; // avoid SSR issues
    return localStorage.getItem("authToken") || "";
};

// 📡 Get current attendance status
const getStatus = (domain: string) => {
    const url = `/company/attendance/status`;
    const token = getAuthToken();

    return getData<BaseResponse<any>>(url, {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "X-Company": domain,
        },
    });
};

// 🕐 Clock IN (now using GET)
const clockIn = (domain: string) => {
    const url = `/company/attendance/clock-in`;
    const token = getAuthToken();

    return getData<BaseResponse<any>>(url, {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "X-Company": domain,
        },
    });
};

// 🕓 Clock OUT (now using GET)
const clockOut = (domain: string) => {
    const url = `/company/attendance/clock-out`;
    const token = getAuthToken();

    return getData<BaseResponse<any>>(url, {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "X-Company": domain,
        },
    });
};

export const restAttendance = {
    getStatus,
    clockIn,
    clockOut,
};

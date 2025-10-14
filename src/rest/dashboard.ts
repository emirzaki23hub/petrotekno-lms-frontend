import { getData } from "@/lib/fetch";
import { Agenda } from "@/types";
import { BaseResponse } from "@/types/auth";

const getAgendaList = (token: string, domain: string, date?: string) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  // ✅ Append date query param if provided
  const url = date ? `/company/agenda?date=${date}` : `/company/agenda`;

  return getData<BaseResponse<Agenda>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

export const restDashboard = {
  getAgendaList,
};

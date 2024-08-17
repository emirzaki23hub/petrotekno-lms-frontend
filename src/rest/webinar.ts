import { getData } from "@/lib/fetch";
import { Webinar } from "@/types";
import { BaseResponse } from "@/types/auth";

// Define the structure of a single webinar

const getWebinarList = (token: string, domain: string) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  return getData<BaseResponse<Webinar[]>>("/company/webminar", {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

export const restWebinar = {
  getWebinarList,
};

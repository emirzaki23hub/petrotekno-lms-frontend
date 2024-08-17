import { getData } from "@/lib/fetch";
import { Webinar } from "@/types";
import { BaseResponse } from "@/types/auth";

// Define the structure of a single webinar

const getWebinarList = (token: string, domain: string, page: number) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  // Construct the URL, adding the page parameter only if page > 1
  const url = page > 1 ? `/company/webminar?page=${page}` : `/company/webminar`;

  return getData<BaseResponse<Webinar[]>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

export const restWebinar = {
  getWebinarList,
};

import { getData, putData } from "@/lib/fetch";
import { Elearning, Webinar } from "@/types";
import { BaseResponse } from "@/types/auth";

// Define the structure of a single webinar

const getElearningList = (token: string, domain: string, page: number) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  // Construct the URL, adding the page parameter only if page > 1
  const url =
    page > 1 ? `/company/elearnings?page=${page}` : `/company/elearnings`;

  return getData<BaseResponse<Elearning[]>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

const getElearningDetail = (slug: string, token: string, domain: string) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  // Construct the URL, adding the page parameter only if page > 1
  const url = `/company/elearnings/${slug}`;

  return getData<BaseResponse<Elearning>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

const putParticipantRead = (
  slug: string,
  sessionId: number,
  token: string,
  domain: string
) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  const url = `/company/elearnings/${slug}/sessions/${sessionId}/read`;

  return putData<BaseResponse<Webinar[]>>(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Company": domain,
      },
    }
  );
};

export const restElearning = {
  getElearningList,
  getElearningDetail,
  putParticipantRead,
};

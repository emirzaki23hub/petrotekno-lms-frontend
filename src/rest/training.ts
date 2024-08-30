import { getData, putData } from "@/lib/fetch";
import { Elearning, Module, Section, Training, Webinar } from "@/types";
import { BaseResponse } from "@/types/auth";

// Define the structure of a single webinar

const getTrainingList = (token: string, domain: string, page?: number) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  // Construct the URL, adding the page parameter only if page > 1
  const url = `/company/training`;

  return getData<BaseResponse<Training>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

const getModuleList = (token: string, domain: string) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  // Construct the URL, adding the page parameter only if page > 1
  const url = `/company/module`;

  return getData<BaseResponse<Module[]>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

const getSection = (token: string, domain: string, slug: number) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  // Construct the URL, adding the page parameter only if page > 1
  const url = `/company/module/${slug}`;

  return getData<BaseResponse<Section[]>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};
export const restTraining = {
  getTrainingList,
  getModuleList,
  getSection,
};

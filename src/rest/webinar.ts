import { getData } from "@/lib/fetch";
import { BaseResponse } from "@/types/auth";

const getWebinarList = (token: string) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  return getData<BaseResponse>("/company/webminar", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const restWebinar = {
  getWebinarList,
};

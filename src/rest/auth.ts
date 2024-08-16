import { deleteData, getData, postData } from "@/lib/fetch";
import { BaseResponse } from "@/types/auth";

const postLogin = (body: { email: string; password: string }) =>
  postData<BaseResponse>("/company/login", {
    ...body,
  });

const postLogout = async (token: string) => {
  return deleteData<BaseResponse>(
    "/company/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getCompany = (domain: string) => {
  return getData<BaseResponse>("/company", {
    headers: {
      "X-Company": domain,
    },
  });
};
export const restAuth = {
  postLogin,
  getCompany,
  postLogout,
};

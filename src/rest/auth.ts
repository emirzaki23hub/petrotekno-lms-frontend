import { deleteData, getData, postData } from "@/lib/fetch";
import { BaseResponse } from "@/types/auth";

const postLogin = (body: {
  email: string;
  password: string;
  domain: string;
}) => {
  return postData<BaseResponse>(
    "/company/login",
    {
      email: body.email,
      password: body.password,
    },
    {
      headers: {
        "X-Company": body.domain,
      },
    }
  );
};

const postLogout = async (token: string, domain: string) => {
  return deleteData<BaseResponse>(
    "/company/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Company": domain,
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

export type ResLogin = {
  access_token?: string;
  tokken?: string;
};

export type BaseResponse<
  TData = Record<string, never>,
  TError = Record<string, never>
> = {
  status: number;
  success: boolean;
  message: string;
  data?: TData;
  errors?: TError;
};

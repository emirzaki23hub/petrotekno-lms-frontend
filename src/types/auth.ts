export type ResLogin = {
  access_token?: string;
  tokken?: string;
};

type PaginationMeta = {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: Record<string, never>;
};

export type BaseResponse<
  TData = Record<string, never>,
  TError = Record<string, never>
> = {
  status: number;
  success: boolean;
  message: string;
  data?: TData;
  meta: {
    pagination: PaginationMeta;
  };
  errors?: TError;
};

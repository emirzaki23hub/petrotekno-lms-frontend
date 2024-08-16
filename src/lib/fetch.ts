export const baseFetch = async <ResDataType>(
  url: string | URL | Request,
  options?: RequestInit & { domain?: string }
) => {
  const headers: any = {
    "Content-Type": "application/json",
    "X-Company": options?.domain || "company1",
    ...options?.headers,
  };

  if (headers["Content-Type"] === "") delete headers["Content-Type"];

  const res = (await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${url.toString()}`, // Convert to string if it's URL or Request
    {
      next: {
        revalidate: 0,
      },
      ...options,
      headers,
    }
  )) as Response & { data?: ResDataType };

  try {
    res.data = await res.json();
  } catch {}

  if (!res.ok) throw res;

  return res;
};

export const getData = <ResDataType>(
  url: string,
  options?: RequestInit & { domain?: string }
) => {
  return baseFetch<ResDataType>(url, {
    ...options,
    method: "GET",
  });
};

export const postData = async <ResDataType>(
  input: Parameters<typeof fetch>["0"],
  body: Record<string, unknown>,
  init?: Parameters<typeof fetch>["1"]
) => {
  const headers = {
    "Content-Type": "application/json",
    ...(init?.headers ?? {}),
  };

  let formattedBody: string;

  if (headers["Content-Type"] === "application/x-www-form-urlencoded") {
    formattedBody = new URLSearchParams(
      body as Record<string, string>
    ).toString();
  } else {
    formattedBody = JSON.stringify(body);
  }

  return await baseFetch<ResDataType>(input, {
    ...init,
    headers,
    body: formattedBody,
    method: "POST",
  });
};

export const putData = async <ResDataType>(
  input: Parameters<typeof fetch>["0"],
  body: Record<string, unknown>,
  init?: Parameters<typeof fetch>["1"]
) => {
  return await baseFetch<ResDataType>(input, {
    ...init,
    body: JSON.stringify(body),
    method: "PUT",
  });
};

export const deleteData = async <ResDataType>(
  input: Parameters<typeof fetch>["0"],
  body: Record<string, unknown>,
  init?: Parameters<typeof fetch>["1"]
) => {
  return await baseFetch<ResDataType>(input, {
    ...init,
    body: JSON.stringify(body),
    method: "delete",
  });
};

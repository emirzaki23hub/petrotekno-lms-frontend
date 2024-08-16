import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

async function getCompany(domain: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company`, {
      headers: {
        "X-Company": domain,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch company data: ${response.status} ${response.statusText}. ${errorText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error(`Error in getCompany for domain ${domain}:`, error);
    throw error;
  }
}

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${
      process.env.NEXT_PUBLIC_ROOT_DOMAIN
    }`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  try {
    const subdomain = hostname.split(".")[0];
    const companyData = await getCompany(subdomain);

    if (companyData.message === "Company not found") {
      return NextResponse.rewrite(new URL("/404", req.url));
    }

    if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
      return NextResponse.rewrite(
        new URL(`/app${path === "/" ? "" : path}`, req.url)
      );
    }
    if (hostname === "vercel.pub") {
      return NextResponse.redirect(
        "https://vercel.com/blog/platforms-starter-kit"
      );
    }
    if (
      hostname === "localhost:3000" ||
      hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
    ) {
      return NextResponse.rewrite(
        new URL(`/home${path === "/" ? "" : path}`, req.url)
      );
    }
    return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
  } catch (error) {
    // Redirect to 404 in case of an error during fetching the company data
    return NextResponse.rewrite(new URL(`/${hostname}/404`, req.url));
  }
}

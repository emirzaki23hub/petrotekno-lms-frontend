import { Metadata } from "next";
import { ReactNode } from "react";
import { restAuth } from "@/rest/auth";
import { Company } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata | null> {
  const decodedDomain = decodeURIComponent(params.domain);
  const domain = decodedDomain.split(".")[0];
  try {
    const data = await restAuth.getCompany(domain);

    if (!data.data?.data) {
      return null;
    }

    const { name } = data.data.data as unknown as Company;

    return {
      title: name,
      metadataBase: new URL(`https://${domain}`),
    };
  } catch (error) {
    console.error("Failed to fetch company data:", error, domain);
    return null;
  }
}

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

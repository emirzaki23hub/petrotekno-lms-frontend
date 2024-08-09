import { getHostnameDataBySubdomain } from "@/lib/db";

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const sites = await getHostnameDataBySubdomain(params.domain);

  return (
    <>
      <h1>domain</h1>
    </>
  );
}

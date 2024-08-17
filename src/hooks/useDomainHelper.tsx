"use client";
import { useParams } from "next/navigation";

type DomainParams = {
  domain?: string | string[];
};

export const useDomainHelper = () => {
  const params = useParams<DomainParams>();

  const getPartBeforeDot = (): string => {
    const domain = Array.isArray(params.domain)
      ? params.domain[0]
      : params.domain || ""; // Ensure domain is a string and handle undefined or null

    const decodedDomain = decodeURIComponent(domain);
    const partBeforeDot = decodedDomain.split(".")[0];

    return partBeforeDot;
  };

  return { getPartBeforeDot };
};

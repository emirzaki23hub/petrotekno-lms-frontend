import { getData } from "@/lib/fetch";
import {
  Certification,
  LatestPerfomance,
  ModuleScore,
  Score,
  Stats,
  TrainingStats,
} from "@/types";
import { BaseResponse } from "@/types/auth";

export const getStats = (token: string, domain: string) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  const url = `/company/performance/stats`;

  return getData<BaseResponse<Stats>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

export const getIntakes = (token: string, domain: string) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  const url = `/company/performance/intake`;

  return getData<BaseResponse<TrainingStats[]>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

export const getLatestPerfomance = (token: string, domain: string) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  const url = `/company/performance/latest-performance`;

  return getData<BaseResponse<LatestPerfomance[]>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

export const getScore = (token: string, domain: string) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  const url = `/company/performance/score`;

  return getData<BaseResponse<Score[]>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

export const getModuleScore = (token: string, domain: string) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  const url = `/company/performance/training-module-score`;

  return getData<BaseResponse<ModuleScore[]>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

export const getCertificaiton = (token: string, domain: string) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  const url = `/company/performance/certifications`;

  return getData<BaseResponse<Certification[]>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

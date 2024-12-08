"use client";

import IconArrowRight from "@/components/icons/IconArrowRight";
import { Button } from "@/components/ui/button";
import { useDomainHelper } from "@/hooks/useDomainHelper";
import { getLatestPerfomance } from "@/rest/perfomance";
import React from "react";

export interface LatestPerfomance {
  id: string;
  title: string;
  date: string;
}

const LatestPerfomance = () => {
  const [trainings, setTrainings] = React.useState<LatestPerfomance[]>([]);
  const [loading, setLoading] = React.useState(true);

  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        setLoading(true);

        const response = await getLatestPerfomance(token, partBeforeDot);
        const data = response?.data?.data;

        if (!Array.isArray(data)) {
          console.error("Training data is not an array");
          setTrainings([]);
          return;
        }

        setTrainings(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [partBeforeDot]);

  return (
    <div className="lg:w-2/5 p-4 bg-white rounded-m flex flex-col gap-4">
      <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
        Latest Performance{" "}
      </div>
      {trainings.length > 0 ? (
        <div className="flex flex-col gap-4 font-mono">
          {trainings.map(
            (item: LatestPerfomance, index: React.Key | null | undefined) => (
              <div
                key={index}
                className="min-h-[72px] border border-[#E4E6E8] rounded-m flex justify-between gap-2 p-4">
                <div className="flex flex-col gap-1">
                  <div className="text-base text-neutral-800 font-bold">
                    {item.title}
                  </div>
                  <span className="text-xs leading-4 text-neutral-400">
                    {item.date}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="rounded-m bg-[#E4E6E8]"
                  size="icon">
                  <IconArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6">
          <div className="text-lg font-semibold text-neutral-800">
            No recent performance data available
          </div>
          <div className="mt-4 text-neutral-400">
            Please check back later or contact support.
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestPerfomance;

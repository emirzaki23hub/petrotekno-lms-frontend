"use client";
import { useDomainHelper } from "@/hooks/useDomainHelper";
import { getModuleScore } from "@/rest/perfomance";
import { ModuleScore } from "@/types";
import React from "react";

const TrainingModuleScore = () => {
  const [trainings, setTrainings] = React.useState<ModuleScore[]>([]);
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

        const response = await getModuleScore(token, partBeforeDot);
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
    <div className="col-span-3 max-lg:w-full p-6 bg-white rounded-m h-[404px] overflow-y-auto flex flex-col gap-4">
      <div className="flex justify-between text-[20px] items-center font-bold leading-6 px-4">
        <div className="max-lg:text-sm">Training Module Score</div>
        <div className="text-base max-lg:text-xs leading-5">Theory</div>
        <div className="text-base max-lg:text-xs leading-5">Practical</div>
      </div>
      {trainings.length > 0 ? (
        trainings.map((item, index) => (
          <div
            key={index}
            className="border l border-[#E4E6E8] rounded-m flex max-lg:items-start items-center justify-between gap-2 p-4">
            <div className="text-base w-[40%] max-lg:line-clamp-2 line-clamp-3 max-lg:text-sm max-lg:leading-none text-neutral-800 font-bold">
              {item.title}
            </div>
            <span className="text-sm leading-4 pr-10 text-success-400 font-bold">
              {item.theory_percent}
            </span>
            <span className="text-sm leading-4 pr-4 text-success-400 font-bold">
              {item.practical_percent}
            </span>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center p-6">
          <div className="text-lg font-semibold text-neutral-800">
            No data available
          </div>
          <div className="mt-4 text-neutral-400">
            Please check back later or contact support.
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingModuleScore;

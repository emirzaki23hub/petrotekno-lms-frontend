"use client";

import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import Image1 from "../../../../../public/images/1.png";
import { Training } from "@/types";
import { restTraining } from "@/rest/training";
import { useDomainHelper } from "@/hooks/useDomainHelper";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale"; // Import Indonesian locale

const Page = () => {
  const [trainings, setTrainings] = useState<Training[]>([]); // Ensure it's an array
  const [loading, setLoading] = useState<boolean>(true);

  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();

  useEffect(() => {
    const loadModules = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }
        setLoading(true); // Set loading to true before fetching data
        const response = await restTraining.getTrainingList(
          token,
          partBeforeDot
        );
        const data = response?.data?.data; // Optional chaining to safely access `data`

        if (Array.isArray(data)) {
          setTrainings(data); // Ensure we only set if `data` is an array
        } else {
          setTrainings([]); // Set an empty array if `data` is undefined or not an array
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    loadModules();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (trainings.length === 0) {
    return <div>No training data available.</div>;
  }

  return (
    <div className="flex flex-col h-full gap-6 overflow-hidden">
      <div className="h-auto rounded-m flex gap-4 flex-col">
        <div className="text-[20px] leading-6 pb-4 font-bold flex items-start justify-start">
          On-going Training
        </div>

        {trainings.map((training) => (
          <div
            key={training.id}
            className="flex bg-white flex-col border border-[#E4E6E8] drop-shadow-md rounded-m"
          >
            <div className="flex max-lg:flex-col lg:p-6 p-4 gap-2 justify-between font-mono lg:items-end">
              <div className="flex max-lg:flex-col w-full gap-2">
                <Image
                  src={training.training.data.image_url} // Use actual image from training if available, e.g., training.training.data.image_url
                  width={0}
                  height={0}
                  sizes="40vw"
                  className="h-auto w-full lg:w-[161px] lg:h-[104px]"
                  alt="prod"
                />
                <div className="flex flex-col gap-4">
                  <div className="text-sm text-primary-500 font-bold">
                    {training?.training?.data?.module_total} Module •{" "}
                    {training.days} days
                    {/* Add periode field if available */}
                  </div>
                  <div className="text-[20px] leading-6 text-neutral-800 font-bold font-sans">
                    {training.training?.data.title}
                  </div>
                  <div className="text-sm leading-6 text-neutral-400">
                    Start Date:{" "}
                    {format(new Date(training.start_date), "dd MMMM yyyy", {
                      locale: localeID,
                    })}{" "}
                    • {format(new Date(training.start_date), "HH:mm")} WIB
                  </div>
                </div>
              </div>
              <Link
                href={`/program/training/module/${training.id}`}
                className="h-[56px] flex justify-center items-center px-5 whitespace-nowrap rounded-m bg-success-500 text-white text-base"
              >
                Start Training
              </Link>
            </div>
            <div className="bg-[#E4E6E8] rounded-b-m">
              <div className="py-4 px-6 flex flex-col gap-4">
                <Progress
                  className="bg-success-50 h-1"
                  value={
                    (training.progress_module /
                      training.training?.data?.module_total) *
                    100
                  }
                />
                <div className="text-sm font-mono">
                  Progression: Module {training.progress_module} /{" "}
                  {training.training?.data?.module_total}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

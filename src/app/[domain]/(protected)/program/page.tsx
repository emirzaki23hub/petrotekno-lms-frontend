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
  const [training, setTraining] = useState<Training | null>(null);
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
        const data = await restTraining.getTrainingList(token, partBeforeDot);
        setTraining(data?.data?.data ?? null); // Default to null if data is undefined
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    loadModules();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!training) {
    return <div>No training data available.</div>;
  }

  const fixedStartDate = training.start_date.replace(/=>/g, ":");

  // Format the date and time
  const formattedDate = format(new Date(fixedStartDate), "dd MMM yyyy", {
    locale: localeID,
  });
  const formattedTime = format(new Date(fixedStartDate), "HH.mm");
  return (
    <div className="flex flex-col h-full gap-6 overflow-hidden">
      <div className="h-auto rounded-m flex gap-4 flex-col">
        <div className="text-[20px] leading-6 pb-4 font-bold flex items-start justify-start">
          On-going Training
        </div>

        <div className="flex bg-white flex-col border border-[#E4E6E8] drop-shadow-md rounded-m">
          <div className="flex max-lg:flex-col lg:p-6 p-4 gap-2 justify-between font-mono lg:items-end">
            <div className="flex max-lg:flex-col w-full gap-2">
              <Image
                src={Image1}
                width={0}
                height={0}
                sizes="40vw"
                className="h-auto w-full lg:w-[161px] lg:h-[104px]"
                alt="prod"
              />
              <div className="flex flex-col gap-4">
                <div className="text-sm text-primary-500 font-bold">
                  {training.module} Module • {training.periode}
                </div>
                <div className="text-[20px] leading-6 text-neutral-800 font-bold font-sans">
                  {training.title}
                </div>
                <div className="text-sm leading-6 text-neutral-400">
                  Start Date: {formattedDate} • {formattedTime} WIB
                </div>
              </div>
            </div>
            <Link
              href="/program/training/module"
              className="h-[56px] flex justify-center items-center px-5 whitespace-nowrap rounded-m bg-success-500 text-white text-base"
            >
              Start Training
            </Link>
          </div>
          <div className="bg-[#E4E6E8] rounded-b-m">
            <div className="py-4 px-6 flex flex-col gap-4">
              <Progress className="bg-success-50 h-1" value={0.5} />
              <div className="text-sm font-mono">Progression: Module 01</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

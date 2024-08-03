"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

const page = () => {
  const trainingData = [
    {
      title: "Production Operations: Test Module 24",
      date: "25 June 2025",
    },
    {
      title: "OPITO Test",
      date: "25 June 2025",
    },
    {
      title: "ECITB Test",
      date: "25 June 2025",
    },
    {
      title: "ECITB Test pt.2",
      date: "25 June 2025",
    },
  ];

  return (
    <div className="flex flex-col h-full gap-6 overflow-hidden">
      {/* section1 */}

      <div className=" h-auto rounded-m  flex gap-4 flex-col ">
        <div className="text-[20px] leading-6 pb-4 font-bold flex items-start justify-start">
          On-going Training{" "}
        </div>

        <div className="flex bg-white flex-col border drop-shadow-md border-[#E4E6E8] rounded-m">
          <div className="flex max-lg:flex-col lg:p-6 p-4 gap-2 justify-between font-mono lg;items-end">
            <div className="flex max-lg:flex-col  gap-2">
              <Image
                src={"/images/4.png"}
                width={0}
                height={0}
                sizes="40vw"
                className="h-auto w-full lg:w-[161px] object-contain lg:h-[104px]"
                alt="prod"
              />
              <div className="flex flex-col gap-4">
                <div className="text-[20px] leading-6 text-neutral-800 font-bold font-sans">
                  City & Guilds Certification{" "}
                </div>
                <div className="text-sm leading-6 text-neutral-400 ">
                  Start Date: 25 Jun 2024 • 09.00 WIB
                </div>
              </div>
            </div>
            <Button className="h-[56px] rounded-m bg-secondary-500 text-white text-base">
              Start Training
            </Button>
          </div>
          <div className=" bg-[#E4E6E8] rounded-b-m">
            <div className="py-4 px-6 flex flex-col gap-4">
              <Progress className="bg-success-50 h-1" value={50} />
              <div className="text-sm font-mono">Progression: 50%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

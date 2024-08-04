"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex flex-col h-full gap-6 overflow-hidden">
      <div className=" h-auto rounded-m  flex gap-4 flex-col ">
        <div className="text-[20px] leading-6 pb-4 font-bold flex items-start justify-start">
          On-going Training{" "}
        </div>

        <div className="flex bg-white flex-col border border-[#E4E6E8] drop-shadow-md rounded-m">
          <div className="flex max-lg:flex-col lg:p-6 p-4 gap-2 justify-between font-mono lg;items-end">
            <div className="flex max-lg:flex-col  gap-2">
              <Image
                src={"/images/1.png"}
                width={0}
                height={0}
                sizes="40vw"
                className="h-auto w-full lg:w-[161px] lg:h-[104px]"
                alt="prod"
              />
              <div className="flex flex-col gap-4">
                <div className="text-sm text-primary-500  font-bold">
                  25 Module • 30 Days
                </div>
                <div className="text-[20px] leading-6 text-neutral-800 font-bold font-sans">
                  Production Operations Training
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
              <Progress className="bg-success-50 h-1" value={0.5} />
              <div className="text-sm font-mono">Progression: Module 01</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

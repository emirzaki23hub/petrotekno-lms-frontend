"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import Image1 from "../../../../../public/images/1.png";
const page = () => {
  return (
    <div className="flex flex-col h-full gap-6 overflow-hidden">
      <div className=" h-auto rounded-m  flex gap-4 flex-col ">
        <div className="text-[20px] leading-6 pb-4 font-bold flex items-start justify-start">
          On-going Training{" "}
        </div>

        <div className="flex bg-white flex-col border border-[#E4E6E8] drop-shadow-md rounded-m">
          <div className="flex max-lg:flex-col lg:p-6 p-4 gap-2 justify-between font-mono lg:items-end">
            <div className="flex max-lg:flex-col w-full  gap-2">
              <Image
                src={Image1}
                width={0}
                height={0}
                sizes="40vw"
                className="h-auto w-full lg:w-[161px] lg:h-[104px]"
                alt="prod"
              />
              <div className="flex flex-col gap-4">
                <div className="text-sm text-primary-500  font-bold">
                  3 Module • 30 Days
                </div>
                <div className="text-[20px] leading-6 text-neutral-800 font-bold font-sans">
                  East Africa Crude Oil Pipeline Project Training Programme{" "}
                </div>
                <div className="text-sm leading-6 text-neutral-400 ">
                  Start Date: 01 Sep 2024 • 09.00 WIB
                </div>
              </div>
            </div>
            <Link
              href={
                "/program/training/east-africa-crude-oil-pipeline-project-training-programme"
              }
              className="h-[56px] flex justify-center items-center px-5 whitespace-nowrap rounded-m bg-success-500 text-white text-base"
            >
              Start Training
            </Link>
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

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex flex-col h-full gap-6 overflow-hidden">
      {/* section1 */}

      <div className=" h-auto rounded-m  flex gap-4 flex-col ">
        <div className="text-[20px] leading-6 pb-4 font-bold flex items-start justify-start">
          On-going Training{" "}
        </div>

        <div className="flex bg-white flex-col border border-[#E4E6E8] drop-shadow-md rounded-m">
          <div className="flex max-lg:flex-col rounded-m gap-2 justify-between font-mono lg:items-center">
            <div className="flex max-lg:flex-col  gap-2">
              <Image
                src={"/images/3.png"}
                width={0}
                height={0}
                sizes="40vw"
                className="h-auto w-full rounded-l-m lg:w-[161px] lg:h-[104px]"
                alt="prod"
              />
              <div className="flex flex-col gap-4 justify-center">
                <div className="text-[20px] leading-6 text-neutral-800 font-bold font-sans">
                  Fundamental keselamatan dan kesehatan kerja internasional{" "}
                </div>
                <div className="text-sm leading-6 text-neutral-400 ">
                  Start Date: 28 Jun 2024 • 18.00 WIB{" "}
                </div>
              </div>
            </div>
            <div className="pr-4">
              <Button className="h-[56px] rounded-m bg-secondary-500 text-white text-base">
                Start Training
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

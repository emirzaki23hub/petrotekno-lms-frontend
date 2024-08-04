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

        <div className="flex bg-white flex-col border drop-shadow-md border-[#E4E6E8] rounded-m">
          <div className="flex max-lg:flex-col rounded-m gap-2 justify-between font-mono lg:items-center">
            <div className="flex max-lg:flex-col  gap-2">
              <Image
                src={"/images/2.png"}
                width={0}
                height={0}
                sizes="40vw"
                className="h-auto w-full rounded-l-m lg:w-[161px] lg:h-[104px]"
                alt="prod"
              />
              <div className="flex flex-col gap-4 justify-center max-lg:px-4">
                <div className="text-sm text-primary-500  font-bold">
                  5 Session{" "}
                </div>
                <div className="text-[20px] leading-6 text-neutral-800 font-bold font-sans">
                  Health Safety Enviroment{" "}
                </div>
              </div>
            </div>
            <div className="lg:pr-4 max-lg:p-4">
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

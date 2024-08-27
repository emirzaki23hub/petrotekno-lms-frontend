"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import IconArrowRight from "@/components/icons/IconArrowRight";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Image from "next/image";
import SectionAgenda from "./SectionAgenda";
import AbsenceAttendance from "./SectionAttendace";
import Image1 from "../../../../../public/images/1.png";
import Link from "next/link";

const page = () => {
  const trainingModules = [
    {
      id: 1,
      title: "Marine Transport of Oil and Gas",
      sessions: "6 Sessions",
      completedSessions: "3/6 Sessions",
      progress: 50,
    },
    {
      id: 2,
      title: "Crude Oil Characteristic and Types",
      sessions: "13 Sessions",
      completedSessions: "1/13 Sessions",
      progress: 0,
    },
    {
      id: 3,
      title: "Thermal Equipment",
      sessions: "5 Sessions",
      completedSessions: "0/5 Sessions",
      progress: 0,
    },
  ];

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
      <div className="flex w-full max-lg:gap-2 max-lg:flex-col justify-between items-center">
        <h1 className="text-[34px] font-bold">Home</h1>
        {/* <Input
          className="lg:w-[400px] "
          sectionLeft={<IconSearch className="text-neutral-400" />}
          placeholder="Looking for something?"
        /> */}
      </div>
      <AbsenceAttendance />
      {/* section2 */}
      <div className="flex gap-6 max-lg:flex-col ">
        <div className="lg:w-3/5 w-full bg-white rounded-m flex flex-col gap-6 p-4">
          <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
            Program Progress
          </div>
          <div className="flex flex-col divide-y divide-[#E4E6E8] font-mono">
            {trainingModules.map((module, index) => (
              <div
                key={index}
                className={cn(
                  " h-full flex flex-col items-end justify-end",
                  index !== 0 && "lg:mt-4 pt-4"
                )}>
                <div className="flex gap-5 w-full max-xl:gap-5 justify-between">
                  <div className="flex gap-2 max-xl:flex-col justify-between w-full">
                    <div className="flex flex-col gap-1 lg:min-w-[205px] 2xl:min-w-[295px]">
                      <div className="text-neutral-400 text-xs leading-4">
                        Training
                      </div>
                      <div className="text-neutral-800 max-lg:text-xs text-sm leadin-5 font-bold">
                        {module.title}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full lg:max-w-[145px] 2xl:min-w-[165px]">
                      <div className="text-neutral-400 text-xs leading-4">
                        Sessions
                      </div>
                      <div className="text-neutral-800 text-sm max-lg:text-xs leadin-5 font-bold">
                        {module.sessions}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="text-neutral-400 flex w-full justify-between text-xs leading-4">
                        <span>{module.completedSessions}</span>
                        <span>{module.progress}%</span>
                      </div>
                      <div className="h-5 flex items-center">
                        <Progress
                          className="bg-success-50 h-1"
                          value={module.progress}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center h-full">
                    <Link
                      href={`/program/training/module/${module.id}`}
                      className="flex bg-secondary-500 rounded-m h-[56px] items-center text-white px-5">
                      Learn
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-2/5 p-4 bg-white rounded-m flex flex-col gap-4">
          <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
            Upcoming Test{" "}
          </div>
          <div className="flex flex-col gap-4 font-mono">
            {trainingData.map((item, index) => (
              <div
                key={index}
                className="min-h-[72px] border border-[#E4E6E8] rounded-m flex justify-between gap-2 p-4">
                <div className="flex flex-col gap-1">
                  <div className="text-base text-neutral-800 font-bold ">
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
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white h-full rounded-m  flex gap-4 flex-col p-4">
        <div className="text-[20px] leading-6 pb-4 font-bold border-[#E4E6E8] border-b   flex items-start justify-start">
          On-going Training{" "}
        </div>

        <div className="flex flex-col border border-[#E4E6E8] rounded-m">
          <div className="flex max-lg:flex-col lg:p-6 p-4 gap-2 justify-between font-mono lg;items-end">
            <div className="flex max-lg:flex-col  gap-2">
              <Image
                src={Image1.src}
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

      <SectionAgenda />
    </div>
  );
};

export default page;

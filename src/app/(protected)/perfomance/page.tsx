"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Input } from "@/components/ui/input";
import IconSearch from "@/components/icons/IconSearch";
import IconArrowRight from "@/components/icons/IconArrowRight";

import Image from "next/image";
import dynamic from "next/dynamic";

const ChartTable = dynamic(() => import("./ChartTable"), {
  loading: () => <p>Loading...</p>,
});

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
  ];

  const cardData = [
    {
      icon: "/icons/icon-clock.svg",
      value: "25",
      unit: "H",
      description: "Total Learning Hours",
    },
    {
      icon: "/icons/icon-complete.svg",
      value: "5",
      description: "Module Complete",
    },
    {
      icon: "/icons/icon-monitor.svg",
      value: "4",
      description: "Webinar Complete",
    },
    {
      icon: "/icons/icon-elearning.svg",
      value: "12",
      description: "E-Learning Complete",
    },
    {
      icon: "/icons/icon-certification.svg",
      value: "3",
      description: "Certification Complete",
    },
  ];
  return (
    <div className="flex flex-col gap-6 h-auto w-full ">
      <div className="flex w-full max-lg:flex-col justify-between items-center">
        <h1 className="text-[34px] font-bold">Performance</h1>
        <Input
          className="lg:w-[400px] w-full "
          sectionLeft={<IconSearch className="text-neutral-400" />}
          placeholder="Looking for something?"
        />
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-5 w-full">
        {cardData.map((card, index) => (
          <div key={index} className="bg-white rounded-m">
            <div className="flex h-full p-4 px-6 gap-4">
              <div>
                <div className="p-2 h-auto bg-[#E4E6E8] rounded-full">
                  <Image src={card.icon} height={19} width={19} alt="icon" />
                </div>
              </div>
              <div className="text-neutral-700 font-mono">
                <div className="text-2xl font-bold flex items-center gap-1">
                  <span className="text-[20px] leading-6 font-bold">
                    {card.value}
                  </span>
                  {card.unit && <span className="text-sm">{card.unit}</span>}
                </div>
                <p className="text-xs mt-1">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-6 max-lg:flex-col ">
        <div className="lg:w-3/5 w-full bg-white rounded-m flex flex-col gap-6 p-4">
          <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
            Overall In-Take{" "}
          </div>

          <ChartTable />
        </div>
        <div className="lg:w-2/5 p-4 bg-white rounded-m flex flex-col gap-4">
          <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
            Latest Performace{" "}
          </div>
          <div className="flex flex-col gap-4 font-mono">
            {trainingData.map((item, index) => (
              <div
                key={index}
                className="min-h-[72px] border border-[#E4E6E8] rounded-m flex justify-between gap-2 p-4"
              >
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
                  size="icon"
                >
                  <IconArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

import { Button } from "@/components/ui/button";
import React from "react";
import IconArrowRight from "@/components/icons/IconArrowRight";

import Image from "next/image";
import dynamic from "next/dynamic";
// import { TrainingModuleChart } from "./TrainingModuleChart";
import CertificationCard from "./CertificationCard";
import IconClock from "../../../../../public/icons/icon-clock.svg";
import IconComplete from "../../../../../public/icons/icon-complete.svg";
import IconMonitor from "../../../../../public/icons/icon-monitor.svg";
import IconLearning from "../../../../../public/icons/icon-elearning.svg";
import IconCertification from "../../../../../public/icons/icon-certification.svg";
import BadgeBg from "../../../../../public/images/badge-bg.png";
import BadgeEffect from "../../../../../public/images/badge-effect.png";
import BadgeOutline from "../../../../../public/images/bg-outline.png";
import BadgeEcitb from "../../../../../public/images/badge-ecitb.png";

const ChartTable = dynamic(() => import("./ChartTable"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const TrainingModuleChart = dynamic(() => import("./TrainingModuleChart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

interface TableDataItem {
  module: string;
  theory: number;
  practical: number;
}

interface Certification {
  id: number;
  title: string;
  imageSrc: {
    src: string;
  };
}

const page = () => {
  // const trainingData = [
  //   {
  //     title: "Production Operations: Test Module 24",
  //     date: "25 June 2025",
  //   },
  //   {
  //     title: "OPITO Test",
  //     date: "25 June 2025",
  //   },
  //   {
  //     title: "ECITB Test",
  //     date: "25 June 2025",
  //   },
  // ];

  const trainingData: any = [];

  const cardData = [
    {
      icon: IconClock,
      value: "0",
      unit: "H",
      description: "Total Learning Hours",
    },
    {
      icon: IconComplete,
      value: "0",
      description: "Module Complete",
    },
    {
      icon: IconMonitor,
      value: "0",
      description: "Webinar Complete",
    },
    {
      icon: IconLearning,
      value: "0",
      description: "E-Learning Complete",
    },
    {
      icon: IconCertification,
      value: "0",
      description: "Certification Complete",
    },
  ];

  const tableData: TableDataItem[] = [
    // { module: "Production Operations: Module 20", theory: 90, practical: 85 },
    // { module: "Production Operations: Module 21", theory: 90, practical: 85 },
    // { module: "Production Operations: Module 22", theory: 90, practical: 85 },
    // { module: "Production Operations: Module 23", theory: 85, practical: 100 },
    // { module: "Production Operations: Module 24", theory: 90, practical: 85 },
  ];

  const certifications: Certification[] = [
    // Example items
    // { id: 1, title: "Certification A", imageSrc: { src: "/path/to/imageA.jpg" } },
    // { id: 2, title: "Certification B", imageSrc: { src: "/path/to/imageB.jpg" } },
  ];

  return (
    <div className="flex flex-col gap-6 h-auto w-full ">
      <div className="flex w-full max-lg:flex-col max-lg:gap-2  justify-between items-center">
        <h1 className="text-[34px] font-bold">Performance</h1>
        {/* <Input
          className="lg:w-[400px] w-full "
          sectionLeft={<IconSearch className="text-neutral-400" />}
          placeholder="Looking for something?"
        /> */}
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-5 w-full">
        {cardData.map((card, index) => (
          <div key={index} className="bg-white rounded-m">
            <div className="flex h-full p-4 px-6 gap-4">
              <div>
                <div className="p-2 h-auto bg-[#E4E6E8] rounded-full">
                  <Image
                    src={card.icon.src}
                    height={19}
                    width={19}
                    alt="icon"
                  />
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
            Latest Performance{" "}
          </div>
          {trainingData.length > 0 ? (
            <div className="flex flex-col gap-4 font-mono">
              {trainingData.map(
                (
                  item: {
                    title:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                    date:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                  },
                  index: React.Key | null | undefined
                ) => (
                  <div
                    key={index}
                    className="min-h-[72px] border border-[#E4E6E8] rounded-m flex justify-between gap-2 p-4"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="text-base text-neutral-800 font-bold">
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
                )
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6">
              <div className="text-lg font-semibold text-neutral-800">
                No recent performance data available
              </div>
              <div className="mt-4 text-neutral-400">
                Please check back later or contact support.
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-6 w-full  overflow-hidden  max-lg:flex-col">
        <div className="lg:p-6 p-4 overflow-hidden bg-white lg:min-h-[404px] h-full  rounded-m  lg:w-2/5">
          <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
            Training Module Score
          </div>
          <div className="w-full  lg:mx-auto flex flex-col  overflow-hidden h-auto pt-6">
            <div className="min-h-[220px] h-full w-full overflow-hidden">
              <TrainingModuleChart />
            </div>
          </div>
        </div>
        <div className="w-3/5 max-lg:w-full p-6 bg-white rounded-m flex flex-col gap-4">
          <div className="flex justify-between text-[20px] items-center font-bold leading-6 px-4">
            <div className="max-lg:text-sm">Training Module Score</div>
            <div className="text-base max-lg:text-xs leading-5">Theory</div>
            <div className="text-base max-lg:text-xs leading-5">Practical</div>
          </div>
          {tableData.length > 0 ? (
            tableData.map((item, index) => (
              <div
                key={index}
                className="border lg:min-h-[52px] border-[#E4E6E8] rounded-m flex max-lg:items-start items-center justify-between gap-2 p-4"
              >
                <div className="text-base max-lg:text-sm max-lg:leading-none text-neutral-800 font-bold">
                  {item.module}
                </div>
                <span className="text-sm leading-4 pr-10 text-success-400 font-bold">
                  {item.theory}
                </span>
                <span className="text-sm leading-4 pr-4 text-success-400 font-bold">
                  {item.practical}
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
      </div>
      <div className="p-6 bg-white rounded-m flex flex-col gap-4">
        <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
          Certification Obtain{" "}
        </div>

        <div className="flex flex-col items-center justify-center p-6">
          {certifications.length > 0 ? (
            <div className="grid grid-cols-4 max-lg:grid-cols-1 gap-2">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="flex border border-[#E4E6E8] p-6 rounded-m flex-col gap-4 justify-center items-center"
                >
                  <CertificationCard
                    index={cert.id}
                    title={cert.title}
                    imageSrc={cert.imageSrc.src}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-lg text-neutral-800">
              No certifications available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;

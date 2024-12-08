import React from "react";

import dynamic from "next/dynamic";
// import { TrainingModuleChart } from "./TrainingModuleChart";

import SectionStats from "./SectionStats";
import LatestPerfomance from "./LatestPerfomance";
import TrainingModuleScore from "./TrainingModuleScore";
import CerticationSection from "./CerticationSection";

const ChartTable = dynamic(() => import("./ChartTable"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const TrainingModuleChart = dynamic(() => import("./TrainingModuleChart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const page = () => {
  return (
    <div className="flex flex-col gap-6 h-auto w-full ">
      <div className="flex w-full max-lg:flex-col max-lg:gap-2  justify-between items-center">
        <h1 className="text-[34px] font-bold">Performance</h1>
      </div>
      <SectionStats />
      <div className="flex gap-6 max-lg:flex-col ">
        <div className="lg:w-3/5 w-full bg-white rounded-m flex flex-col gap-6 p-4">
          <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
            Overall In-Take{" "}
          </div>

          <ChartTable />
        </div>

        <LatestPerfomance />
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
        <TrainingModuleScore />
      </div>
      <CerticationSection />
    </div>
  );
};

export default page;

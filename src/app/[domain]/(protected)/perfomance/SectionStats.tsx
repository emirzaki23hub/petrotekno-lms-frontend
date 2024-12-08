"use client";
import React, { useEffect, useState } from "react";

import IconClock from "../../../../../public/icons/icon-clock.svg";
import IconComplete from "../../../../../public/icons/icon-complete.svg";
import IconMonitor from "../../../../../public/icons/icon-monitor.svg";
import IconLearning from "../../../../../public/icons/icon-elearning.svg";
import IconCertification from "../../../../../public/icons/icon-certification.svg";
import Image from "next/image";
import { Stats } from "@/types";
import { useDomainHelper } from "@/hooks/useDomainHelper";
import { getStats } from "@/rest/perfomance";

const SectionStats = () => {
  const [modules, setModules] = useState<Stats | null>(null); // Change to `null` if it's not an array

  const [loading, setLoading] = useState(true); // Add loading state

  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();
  const loadData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No authentication token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await getStats(token, partBeforeDot);

      const moduleData = response?.data?.data;
      setModules(moduleData || null);
      if (!moduleData) {
        console.error("Module data is not valid");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setModules(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-5 w-full">
      <div className="bg-white rounded-m">
        <div className="flex h-full p-4 px-6 gap-4">
          <div>
            <div className="p-2 h-auto bg-[#E4E6E8] rounded-full">
              <Image src={IconClock} height={19} width={19} alt="icon" />
            </div>
          </div>
          <div className="text-neutral-700 font-mono">
            <div className="text-2xl font-bold flex items-center gap-1">
              <span className="text-[20px] leading-6 font-bold">
                {modules?.totalEarningHour ?? 0} H{" "}
              </span>
            </div>
            <p className="text-xs mt-1">Total Learning Hour</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-m">
        <div className="flex h-full p-4 px-6 gap-4">
          <div>
            <div className="p-2 h-auto bg-[#E4E6E8] rounded-full">
              <Image src={IconComplete} height={19} width={19} alt="icon" />
            </div>
          </div>
          <div className="text-neutral-700 font-mono">
            <div className="text-2xl font-bold flex items-center gap-1">
              <span className="text-[20px] leading-6 font-bold">
                {modules?.moduleComplete ?? 0}
              </span>
            </div>
            <p className="text-xs mt-1">Module Complete</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-m">
        <div className="flex h-full p-4 px-6 gap-4">
          <div>
            <div className="p-2 h-auto bg-[#E4E6E8] rounded-full">
              <Image src={IconMonitor} height={19} width={19} alt="icon" />
            </div>
          </div>
          <div className="text-neutral-700 font-mono">
            <div className="text-2xl font-bold flex items-center gap-1">
              <span className="text-[20px] leading-6 font-bold">
                {modules?.webminarComplete ?? 0}
              </span>
            </div>
            <p className="text-xs mt-1">Webinar Complete</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-m">
        <div className="flex h-full p-4 px-6 gap-4">
          <div>
            <div className="p-2 h-auto bg-[#E4E6E8] rounded-full">
              <Image src={IconLearning} height={19} width={19} alt="icon" />
            </div>
          </div>
          <div className="text-neutral-700 font-mono">
            <div className="text-2xl font-bold flex items-center gap-1">
              <span className="text-[20px] leading-6 font-bold">
                {modules?.elearningComplete ?? 0}
              </span>
            </div>
            <p className="text-xs mt-1">E-Learning Complete</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-m">
        <div className="flex h-full p-4 px-6 gap-4">
          <div>
            <div className="p-2 h-auto bg-[#E4E6E8] rounded-full">
              <Image
                src={IconCertification}
                height={19}
                width={19}
                alt="icon"
              />
            </div>
          </div>
          <div className="text-neutral-700 font-mono">
            <div className="text-2xl font-bold flex items-center gap-1">
              <span className="text-[20px] leading-6 font-bold">
                {modules?.certificationComplete ?? 0}
              </span>
            </div>
            <p className="text-xs mt-1">Certification Complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionStats;

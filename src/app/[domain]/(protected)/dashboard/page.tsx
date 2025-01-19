"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import IconArrowRight from "@/components/icons/IconArrowRight";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Image from "next/image";
import SectionAgenda from "./SectionAgenda";
import AbsenceAttendance from "./SectionAttendace";
import Link from "next/link";
import { restTraining } from "@/rest/training";
import { useDomainHelper } from "@/hooks/useDomainHelper";
import { Training, TrainingProgramData } from "@/types";
import { format, isAfter, parseISO } from "date-fns";
import { id as localeID } from "date-fns/locale"; // Import Indonesian locale

interface TrainingDataItem {
  title: string;
  date: string;
}

export default function Page() {
  const [trainings, setTrainings] = useState<Training[]>([]); // Ensure it's an array

  const [modules, setModules] = useState<TrainingProgramData | null>(null); // Change to `null` if it's not an array

  const [loading, setLoading] = useState(true); // Add loading state

  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        setLoading(true);

        const response = await restTraining.getTrainingList(
          token,
          partBeforeDot
        );
        const data = response?.data?.data;
        if (!Array.isArray(data)) {
          console.error("Training data is not an array");
          setTrainings([]);
          return;
        }

        setTrainings(data);

        if (data.length > 0) {
          const moduleResponse = await restTraining.getTrainingDetailList(
            token,
            partBeforeDot,
            data[0].id
          );
          const moduleData = moduleResponse?.data?.data;
          if (moduleData) {
            setModules(moduleData);
          } else {
            console.error("Module data is not valid");
            setModules(null);
          }
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [partBeforeDot]);

  const trainingData: TrainingDataItem[] = [
    // Uncomment the lines below to simulate data.
    // { title: "Test Module 1", date: "2024-09-10" },
    // { title: "Test Module 2", date: "2024-09-15" },
  ];

  const startDate = modules?.start_date
    ? new Date(trainings[0].start_date)
    : null;

  return (
    <div className="flex flex-col h-full gap-6 overflow-hidden">
      <div className="flex w-full max-lg:gap-2 max-lg:flex-col justify-between items-center">
        <h1 className="text-[34px] font-bold">Home</h1>
      </div>
      <AbsenceAttendance />
      <div className="grid lg:grid-cols-5 gap-6 max-lg:flex-col ">
        <div className="lg:col-span-3 lg:h-[450px] overflow-y-auto w-full bg-white rounded-m flex flex-col gap-6 p-4">
          <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
            Program Progress
          </div>
          <div className="flex flex-col divide-y divide-[#E4E6E8] font-mono">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                Loading...
              </div>
            ) : !modules ||
              !modules.sessions ||
              modules.sessions.data.length === 0 ? (
              <div className="text-center text-neutral-500">
                No upcoming sessions.
              </div>
            ) : (
              modules.sessions.data.map((session) => (
                <div
                  key={session.id}
                  className=" flex justify-between gap-5 p-4"
                >
                  <div className="flex justify-between w-full items-start gap-5">
                    <div className="flex flex-col gap-1 lg:min-w-[205px] 2xl:min-w-[295px]">
                      <div className="text-neutral-400  text-xs leading-4">
                        {session.module.data.subtitle}
                      </div>
                      <div className="text-base text-neutral-800 line-clamp-3 font-bold">
                        {session.module.data.title}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-1 w-full lg:max-w-[145px] 2xl:min-w-[165px]">
                      <div className="text-neutral-400 text-xs leading-4">
                        Sessions
                      </div>
                      {session.progress_session}
                      <div className="text-neutral-800 text-sm max-lg:text-xs leading-5 font-bold">
                        {/* Display the number of sessions for this module */}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-2 w-full">
                      <div className="text-neutral-400 flex w-full justify-between text-xs leading-4">
                        <span>
                          {0}/{modules.training.data.module_total} Sessions
                        </span>{" "}
                        {/* Display the random number of completed sessions */}
                        <span>{modules.score}%</span>
                      </div>
                      <Progress
                        className="bg-success-50 h-1"
                        value={session.score}
                      />
                      <Link
                    href={`/program/training/module/${modules.id}/sessions/${session.id}`}
                    className={cn(
                      "flex bg-secondary-500 lg:hidden rounded-m justify-center h-[56px] items-center text-white px-5"
                    )}
                  >
                    Learn
                  </Link>
                    </div>
                  </div>
                  <Link
                    href={`/program/training/module/${modules.id}/sessions/${session.id}`}
                    className={cn(
                      "flex bg-secondary-500 max-lg:hidden rounded-m justify-center h-[56px] items-center text-white px-5"
                    )}
                  >
                    Learn
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="lg:col-span-2 p-4 bg-white rounded-m flex flex-col gap-4">
          <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
            Upcoming Test
          </div>
          {trainingData.length > 0 ? (
            <div className="flex flex-col gap-4 font-mono">
              {trainingData.map((item, index) => (
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
                  <Link
                    href="/program/training/module/1?section=9"
                    className="rounded-m bg-[#E4E6E8] w-10 h-10 flex justify-center items-center"
                  >
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center text-neutral-800">
              <div className="text-lg font-semibold">
                No upcoming tests available.
              </div>
              <div className="mt-2 text-neutral-400">
                Please check back later.
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white h-full rounded-m  flex gap-4 flex-col p-4">
        <div className="text-[20px] leading-6 pb-4 font-bold border-[#E4E6E8] border-b   flex items-start justify-start">
          On-going Training{" "}
        </div>

        {modules ? (
          <div className="flex flex-col border border-[#E4E6E8] rounded-m">
            <div className="flex max-lg:flex-col lg:p-6 p-4 gap-2 justify-between font-mono lg;items-end">
              <div className="flex max-lg:flex-col  gap-2">
                <Image
                  src={modules?.training?.data.image_url ?? ""}
                  width={0}
                  height={0}
                  sizes="40vw"
                  className="h-auto w-full lg:w-[161px] lg:h-[104px]"
                  alt="prod"
                />
                <div className="flex flex-col gap-4">
                  <div className="text-sm text-primary-500  font-bold">
                    {modules?.training?.data.module_total} Module •{" "}
                    {modules?.days} Days
                  </div>
                  <div className="text-[20px] leading-6 text-neutral-800 font-bold font-sans">
                    {modules?.training?.data.title}
                  </div>
                  {startDate ? (
                    <>
                      Start Date:{" "}
                      {format(startDate, "dd MMMM yyyy", {
                        locale: localeID,
                      })}{" "}
                      • {format(startDate, "HH:mm")} WIB
                    </>
                  ) : (
                    <span>Date not available</span>
                  )}
                </div>
              </div>

              <Link
                href={`/program/training/module/${modules?.id}/sessions/${modules?.sessions.data[0].id}`}
                className="flex bg-secondary-500 rounded-m h-[56px] items-center text-white px-5"
              >
                Start Training
              </Link>
            </div>
            <div className=" bg-[#E4E6E8] rounded-b-m">
              <div className="py-4 px-6 flex flex-col gap-4">
                <Progress
                  className="bg-success-50 h-1"
                  value={trainings[0]?.progress_module}
                />
                <div className="text-sm font-mono">
                  Progression: Module {trainings[0]?.progress_module}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>No Data</div>
        )}
      </div>

      <SectionAgenda />
    </div>
  );
}

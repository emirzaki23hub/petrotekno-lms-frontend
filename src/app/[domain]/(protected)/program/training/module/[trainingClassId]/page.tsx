"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import IconHome from "@/components/icons/IconHome";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
// } from "@/components/ui/pagination";
import Link from "next/link";
import { format, isAfter, parseISO } from "date-fns";
import { restTraining } from "@/rest/training";
import { useDomainHelper } from "@/hooks/useDomainHelper";
import { Training, TrainingProgramData } from "@/types"; // Ensure TrainingProgramData is correctly imported
import { id as localeID } from "date-fns/locale"; // Import Indonesian locale

export default function Page({
  params,
}: {
  params: {
    trainingClassId: string;
  };
}) {
  const router = useRouter();

  // const ITEMS_PER_PAGE = 5;
  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = Math.ceil(trainingModules.length / ITEMS_PER_PAGE);
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
            params.trainingClassId
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
  }, [partBeforeDot, params.trainingClassId]); // Added params.trainingClassId to dependency array

  // --- Computed Variables for Assessment Status ---
  const currentScore = modules?.score ?? 0;
  const passingThreshold = modules?.threshold ?? 0;
  const maxAttempts = modules?.total_max ?? 0;
  const attemptsUsed = modules?.total_retry ?? 0;
  const remainingAttempts = maxAttempts - attemptsUsed;
  const hasPassed = currentScore >= passingThreshold;
  const scoreProgress = currentScore > 100 ? 100 : currentScore; // Cap progress at 100%

  // const handlePageChange = (page: React.SetStateAction<number>) => {
  //   setCurrentPage(page);
  // };

  // const paginatedModules = trainingModules.slice(
  //   (currentPage - 1) * ITEMS_PER_PAGE,
  //   currentPage * ITEMS_PER_PAGE
  // );

  // const renderPagination = () => {
  //   return (
  //     <Pagination>
  //       <PaginationContent>
  //         {Array.from({ length: totalPages }, (_, index) => index + 1).map(
  //           (page) => (
  //             <PaginationItem key={page}>
  //               <PaginationLink
  //                 onClick={() => handlePageChange(page)}
  //                 className={cn(
  //                   page === currentPage ? "bg-white" : "",
  //                   "cursor-pointer"
  //                 )}
  //                 isActive={page === currentPage}
  //               >
  //                 {page}
  //               </PaginationLink>
  //             </PaginationItem>
  //           )
  //         )}

  //         <PaginationItem>
  //           <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
  //         </PaginationItem>
  //       </PaginationContent>
  //     </Pagination>
  //   );
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  const trainingData = trainings?.find(
    (item) => item.id === params.trainingClassId
  );

  return (
    <div className="flex flex-col gap-9">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/program">Program</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/program">Training</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary-500 font-bold">
              Module
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-4 items-center">
        <Button
          onClick={() => router.push("/program")}
          className="h-10 w-10 bg-[#E4E6E] border-black border"
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.24829 0.351588C7.47325 0.576621 7.59963 0.881791 7.59963 1.19999C7.59963 1.51818 7.47325 1.82335 7.24829 2.04839L3.29669 5.99999L7.24829 9.95159C7.46688 10.1779 7.58783 10.481 7.5851 10.7957C7.58236 11.1103 7.45616 11.4113 7.23367 11.6338C7.01118 11.8563 6.71021 11.9825 6.39557 11.9852C6.08093 11.9879 5.77781 11.867 5.55149 11.6484L0.75149 6.84839C0.526525 6.62335 0.400146 6.31818 0.400146 5.99999C0.400146 5.68179 0.526525 5.37662 0.75149 5.15159L5.55149 0.351588C5.77652 0.126623 6.08169 0.000244141 6.39989 0.000244141C6.71809 0.000244141 7.02326 0.126623 7.24829 0.351588Z"
              fill="#474E53"
            />
          </svg>
        </Button>
        <h1 className="text-[34px] leading-9 font-bold">
          {trainingData?.training.data.title}
        </h1>

      </div>
      <div className="flex flex-col rounded-m">
        {trainingData?.training.data.image_url ? (
          <Image
            alt="hi"
            src={trainingData.training.data.image_url}
            width={0}
            height={0}
            className="h-[365px] w-full rounded-t-m object-cover"
            sizes="50vw"
          />
        ) : (
          <div className="h-[365px] w-full rounded-t-m bg-gray-200" />
        )}
        <div className="p-6 flex flex-col text-neutral-700 rounded-b-m bg-white gap-4">
          <div className="flex gap-2">
            <IconHome /> {trainingData?.training.data.module_total} Module
          </div>
          <div className="text-base text-neutral-400">
            <div className="text-sm leading-6 text-neutral-400">
              {trainingData?.start_date ? (
                <>
                  Start Date:{" "}
                  {format(new Date(trainingData.start_date), "dd MMMM yyyy", {
                    locale: localeID,
                  })}
                  • {format(new Date(trainingData.start_date), "HH:mm")} WIB
                </>
              ) : (
                "Start Date: TBA"
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-6 max-lg:flex-col ">

        {modules && modules.type === 'QUIZ' && (
          <div className="lg:w-1/3 w-full bg-white rounded-m flex flex-col gap-6 p-4 h-fit border border-[#E4E6E8]">
            <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b pb-4">
              Assessment Status
            </div>

            {/* Current Score */}
            <div className="flex flex-col gap-1">
              <div className="text-sm text-neutral-500 font-medium">Your Current Score</div>
              <div className={cn("text-5xl font-extrabold", hasPassed ? "text-success-500" : "text-danger-500")}>
                {currentScore}%
              </div>
            </div>

            {/* Threshold and Attempts */}
            <div className="flex flex-col divide-y divide-[#E4E6E8] font-mono">
              <div className="flex justify-between items-center py-2">
                <div className="text-base text-neutral-800 font-medium">Passing Threshold</div>
                <div className="text-base font-bold text-primary-500">
                  {passingThreshold}%
                </div>
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="text-base text-neutral-800 font-medium">Attempts Used</div>
                <div className="text-base font-bold text-neutral-500">
                  {attemptsUsed} / {maxAttempts}
                </div>
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="text-base text-neutral-800 font-medium">Remaining Attempts</div>
                <div className={cn("text-base font-bold", remainingAttempts > 0 ? "text-success-500" : "text-danger-500")}>
                  {remainingAttempts}
                </div>
              </div>
            </div>

            {/* Progress Bar for Score */}
            <div className="pt-2">
              <Progress
                className={cn("h-2", hasPassed ? "bg-success-50" : "bg-danger-50")}

                value={scoreProgress}
              />
              <div className={cn("text-sm font-semibold mt-1", hasPassed ? "text-success-500" : "text-danger-500")}>
                {hasPassed ? "Congratulations! Passed." : `Needs ${passingThreshold - currentScore}% more to pass.`}
              </div>
            </div>

          </div>
        )}

        <div className="w-full bg-white rounded-m flex flex-col gap-6 p-4">
          <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
            Program Progress
          </div>
          <div className="flex flex-col divide-y divide-[#E4E6E8] font-mono">
            {loading ? (
              <div className="flex justify-center items-center h-20">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : modules?.sessions?.data?.length ? (
              <div className="flex flex-col divide-y divide-[#E4E6E8] font-mono">
                {modules.sessions.data.map((session, index) => {
                  // Parse the session date
                  const sessionDate = parseISO(session.class_date);
                  const formattedDate = format(sessionDate, "d MMMM yyyy");
                  const now = new Date();

                  const isSessionToday = isAfter(now, sessionDate);

                  const isLearnDisabled = !isSessionToday;

                  return (
                    <div
                      key={session.id} // Use `session.id` as the key
                      className={cn(
                        "h-full flex flex-col items-end justify-end",
                        index !== 0 && "lg:mt-4 pt-4"
                      )}
                    >
                      <div className="flex gap-2 w-full items-center max-xl:gap-5 justify-between">
                        <div className="flex flex-col gap-2 w-full">
                          <div className="text-sm text-primary-500 font-bold">
                            {session.module.data.subtitle}
                          </div>
                          <div className="text-[20px] leading-6 text-neutral-800 font-bold">
                            {session.module.data.title}
                          </div>
                          {session.score && (
                            <div className="text-success-400 text-[20px] leading-6 font-bold">
                              Progress {session.score}%
                            </div>
                          )}

                          <div className="text-sm text-neutral-400">
                            {formattedDate}
                          </div>
                          <Progress
                            className="bg-success-50 h-1 w-full"
                            value={session.progress_session}
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <Link
                            href={`/program/training/module/${modules.id}/sessions/${session.id}`}
                            className={cn(
                              "flex bg-secondary-500 rounded-m justify-center h-[56px] items-center text-white px-5",
                              isLearnDisabled
                                ? "opacity-50 cursor-not-allowed pointer-events-none"
                                : ""
                            )}
                            aria-disabled={isLearnDisabled}
                          >
                            Learn
                          </Link>
                          {session.module.data.url_download_zip && partBeforeDot === 'eacop' && (
                            <a
                              href={session.module.data.url_download_zip || "#"}
                              download
                              target="_blank"
                              className={cn(
                                "flex bg-secondary-500 rounded-m h-[56px] items-center text-white px-5"
                              )}
                              aria-disabled={isLearnDisabled}
                            >
                              Download
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>No sessions available</div>
            )}
          </div>
        </div>
      </div>
      {/* {renderPagination()} */}
    </div>
  );
}
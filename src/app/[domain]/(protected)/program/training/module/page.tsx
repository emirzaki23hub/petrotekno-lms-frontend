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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination"; // Assuming you have these components
import Link from "next/link";
import Bg1 from "../../../../../../../public/images/bg-1.png";
import { format, parseISO } from "date-fns";

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://private-013718-petro8.apiary-mock.com/module"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

interface Module {
  id: number;
  subtitle: string;
  progress: number;
  date: string;
}

export default function Page({ params }: { params: { slug: string } }) {
  const trainingModules = Array.from({ length: 26 }, (_, index) => ({
    module: 1,
    title: `Module ${index + 1}: Title`,
    sessions: "4 Sessions",
    completedSessions: "1/4 Sessions",
    progress: 30,
    startDate: "25 June 2024",
    score: index % 3 === 0 ? 100 : 0, // Dummy score for illustration
    slug: `module-${index + 1}`,
  }));

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(trainingModules.length / ITEMS_PER_PAGE);

  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const loadModules = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const data = await fetchData();
        setModules(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    loadModules();
  }, []);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const paginatedModules = trainingModules.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderPagination = () => {
    return (
      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  className={cn(
                    page === currentPage ? "bg-white" : "",
                    "cursor-pointer"
                  )}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  const router = useRouter();
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
              Production Operations Training
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-4 items-center">
        <Button
          onClick={() => router.back()}
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
          East Africa Crude Oil Pipeline Project Training Programme{" "}
        </h1>
      </div>
      <div className="flex flex-col rounded-m">
        <Image
          alt="hi"
          src={Bg1.src}
          width={0}
          height={0}
          className="h-auto w-full rounded-t-m object-cover"
          sizes="50vw"
        />
        <div className="p-6 flex flex-col text-neutral-700 rounded-b-m bg-white gap-4">
          <div className="flex gap-2">
            <IconHome /> 3 Module
          </div>
          <div className="text-base text-neutral-400">
            Start Date: 01 Jun 2024 • 09.00 WIB
          </div>
        </div>
      </div>
      <div className="flex gap-6 max-lg:flex-col ">
        <div className="w-full bg-white rounded-m flex flex-col gap-6 p-4">
          <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
            Program Progress
          </div>
          <div className="flex flex-col divide-y divide-[#E4E6E8] font-mono">
            {loading ? (
              <div className="flex justify-center items-center h-20">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              modules.map((module, index) => {
                // Format the date
                const date = parseISO(module.date);
                const formattedDate = format(date, "d MMMM yyyy");
                return (
                  <div
                    key={module.id} // Use `module.id` as the key
                    className={cn(
                      "h-full flex flex-col items-end justify-end",
                      index !== 0 && "lg:mt-4 pt-4"
                    )}
                  >
                    <div className="flex gap-2 w-full items-center max-xl:gap-5 justify-between">
                      <div className="flex flex-col gap-2 w-full">
                        <div className="text-sm text-primary-500 font-bold">
                          M{module.id}
                        </div>
                        <div className="text-[20px] leading-6 text-neutral-800 font-bold">
                          {module.subtitle}
                        </div>
                        {module.progress > 0 && (
                          <div className="text-success-400 text-[20px] leading-6 font-bold">
                            Progress {module.progress}%
                          </div>
                        )}
                        <div className="text-sm text-neutral-400">
                          {formattedDate}
                        </div>
                        <Progress
                          className="bg-success-50 h-1 w-full"
                          value={module.progress}
                        />
                      </div>

                      <Link
                        href={`/program/training/module/${module.id}`}
                        className="flex bg-secondary-500 rounded-m h-[56px] items-center text-white px-5"
                      >
                        Learn
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {/* {renderPagination()} */}
    </div>
  );
}

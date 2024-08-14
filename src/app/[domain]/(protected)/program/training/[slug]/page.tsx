"use client";
import React, { useState } from "react";
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
import IconArrowRight from "@/components/icons/IconArrowRight";
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
          Production Operations Training
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
            <IconHome /> 26 Module
          </div>
          <div className="text-base text-neutral-400">
            Start Date: 25 Jun 2024 • 09.00 WIB
          </div>
        </div>
      </div>
      <div className="flex gap-6 max-lg:flex-col ">
        <div className="w-full bg-white rounded-m flex flex-col gap-6 p-4">
          <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
            Program Progress
          </div>
          <div className="flex flex-col divide-y divide-[#E4E6E8] font-mono">
            {paginatedModules.map((module, index) => (
              <div
                key={index}
                className={cn(
                  "h-full flex flex-col items-end justify-end",
                  index !== 0 && "lg:mt-4 pt-4"
                )}
              >
                <div className="flex gap-2 w-full max-xl:gap-5 justify-between">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="text-sm text-primary-500 font-bold">
                      Module 0{module.module}
                    </div>
                    <div className="text-[20px] leading-6 text-neutral-800 font-bold">
                      {module.title}
                    </div>
                    {module.score > 0 && (
                      <div className="text-success-400 text-[20px] leading-6 font-bold">
                        Score {module.score}
                      </div>
                    )}
                    <div className="text-sm text-neutral-400">
                      {module.startDate}
                    </div>
                    <Progress
                      className="bg-success-50 h-1 w-full"
                      value={module.progress}
                    />
                  </div>

                  <Link
                    href={`/program/training/${params.slug}/${module.slug}`}
                    className="flex items-center h-full"
                  >
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {renderPagination()}
    </div>
  );
}

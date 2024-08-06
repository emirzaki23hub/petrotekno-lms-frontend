"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const dummyData = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  slug: "training-1",
  title: `Training ${index + 1}`,
  startDate: `28 Jun 2024 • 18.00 WIB`,
  imageUrl: "/images/2.png",
  status: index % 2 === 0 ? "completed" : "upcoming", // Dynamic status
}));

const ITEMS_PER_PAGE = 5;

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dummyData.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const currentItems = dummyData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const router = useRouter();

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

  return (
    <div className="flex flex-col h-full gap-6 overflow-hidden">
      <div className="text-[20px] leading-6 pb-4 font-bold flex items-start justify-start">
        On-going Training
      </div>

      {currentItems.map((item) => (
        <div key={item.id} className="h-auto rounded-m flex gap-4 flex-col">
          <div className="flex bg-white flex-col border border-[#E4E6E8] drop-shadow-md rounded-m">
            <div className="flex max-lg:flex-col rounded-m gap-2 justify-between font-mono lg:items-center">
              <div className="flex max-lg:flex-col gap-2">
                <Image
                  src={item.imageUrl}
                  width={0}
                  height={0}
                  sizes="40vw"
                  className="h-auto w-full rounded-l-m lg:w-[161px] lg:h-[104px]"
                  alt="Training Image"
                />
                <div className="flex flex-col gap-4 justify-center max-lg:px-4">
                  <div className="text-sm text-primary-500 font-bold">
                    5 Session
                  </div>
                  <div className="text-[20px] leading-6 text-neutral-800 font-bold font-sans">
                    {item.title}
                  </div>
                  <div className="text-sm leading-6 text-neutral-400">
                    Start Date: {item.startDate}
                  </div>
                </div>
              </div>
              <div className="lg:pr-4 max-lg:p-4">
                <Button
                  onClick={() => router.push(`/program/elearning/${item.slug}`)}
                  className={`h-[56px] rounded-m ${
                    item.status === "completed"
                      ? "bg-gray-400"
                      : "bg-secondary-500"
                  } text-white text-base`}
                  disabled={item.status === "completed"}
                >
                  {item.status === "completed" ? "Completed" : "Start Training"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center items-center mt-4">
        {renderPagination()}
      </div>
    </div>
  );
};

export default Page;

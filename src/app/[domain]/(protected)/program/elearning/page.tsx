"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

import { useDomainHelper } from "@/hooks/useDomainHelper";
import { restElearning } from "@/rest/elearning";
import { Elearning } from "@/types";
import Link from "next/link";
import WebinarList from "@/components/skeleton/WebinarList";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [webinars, setWebinars] = useState<Elearning[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const fetchWebinars = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        const response = await restElearning.getElearningList(
          token,
          partBeforeDot,
          currentPage
        );

        if (response?.data?.success) {
          const webinarsData = response.data.data || [];

          setWebinars(webinarsData);
          setTotalPages(response?.data?.meta?.pagination.total_pages || 1);
        } else {
          throw new Error("Failed to fetch webinars.");
        }
      } catch (error) {
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWebinars();
  }, [currentPage]);

  const renderPagination = () => {
    return (
      <Pagination>
        <PaginationContent>
          {totalPages > 1 && (
            <>
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
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={cn(
                    "cursor-pointer",
                    currentPage === totalPages ? "pointer-events-none" : ""
                  )}
                />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="flex flex-col h-full gap-6 overflow-hidden">
      <div className="text-[20px] leading-6 pb-4 font-bold flex items-start justify-start">
        On-going Training
      </div>

      {loading ? (
        <>
          {Array.from({ length: 10 }).map((_, index) => (
            <WebinarList key={index} />
          ))}
        </>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        webinars.map((item, index) => (
          <div key={index} className="h-auto rounded-m flex gap-4 flex-col">
            <div className="flex bg-white flex-col border border-[#E4E6E8] drop-shadow-md rounded-m">
              <div className="flex max-lg:flex-col rounded-m gap-2 justify-between font-mono lg:items-center">
                <div className="flex max-lg:flex-col gap-2">
                  <Image
                    src={item.image_url}
                    width={0}
                    height={0}
                    sizes="40vw"
                    className="h-auto w-full rounded-l-m lg:w-[161px] lg:h-[104px]"
                    alt="Training Image"
                  />
                  <div className="flex flex-col gap-4 justify-center max-lg:px-4">
                    <div className="text-sm text-primary-500 font-bold">
                      {item.session_total} Session
                      {item.session_total > 1 ? "s" : ""}
                    </div>
                    <div className="text-[20px] leading-6 text-neutral-800 font-bold font-sans">
                      {item.title}
                    </div>
                  </div>
                </div>
                <div className="lg:pr-4 max-lg:p-4">
                  <Link
                    href={`/program/elearning/${item.slug}`}
                    className="!h-[56px] flex px-4 justify-center items-center rounded-m bg-secondary-500 text-white text-base"
                  >
                    Start Training
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      <div className="flex justify-center items-center mt-4">
        {renderPagination()}
      </div>
    </div>
  );
};

export default Page;

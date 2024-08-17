"use client";
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
import IconPdf from "@/components/icons/IconPdf";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Page({ params }: { params: { slug: string } }) {
  const trainingData = [
    {
      title: "Session - 1",
      fileName: "LHP-APP-GEN-DQ-PPR24-02 Rev0 Lesson Plan - Level.pdf",
      date: "25 June 2025",
      status: "Done", // Status for Session 1
    },
    {
      title: "Session - 2",
      fileName: "LHP-APP-GEN-DQ-PPR24-03 Rev0 Instructors Guide - Level.pdf",
      date: "25 June 2025",
      status: "Upcoming", // Status for Session 2
    },
    {
      title: "Session - 3",
      fileName: "LHP-APP-GEN-DK-PPR24-01 Rev0 JC 1.pdf",
      date: "25 June 2025",
      status: "Upcoming", // Status for Session 3
    },
    {
      title: "Session - 4",
      fileName: "LHP-APP-GEN-DK-PPR24-01 Rev0 JC 1.pdf",
      date: "25 June 2025",
      status: "Upcoming", // Status for Session 4
    },
    {
      title: "Session - 5",
      fileName: "LHP-APP-GEN-DK-PPR24-01 Rev0 JC 1.pdf",
      date: "25 June 2025",
      status: "Upcoming", // Status for Session 5
    },
  ];

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
            <BreadcrumbLink href="/program/elearning">
              E-Learning
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/program/elearning/${params.slug}`}>
              Production Operations Training
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary-500 font-bold">
              Session - 1
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>{" "}
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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.24829 0.351588C7.47325 0.576621 7.59963 0.881791 7.59963 1.19999C7.59963 1.51818 7.47325 1.82335 7.24829 2.04839L3.29669 5.99999L7.24829 9.95159C7.46688 10.1779 7.58783 10.481 7.5851 10.7957C7.58236 11.1103 7.45616 11.4113 7.23367 11.6338C7.01118 11.8563 6.71021 11.9825 6.39557 11.9852C6.08093 11.9879 5.77781 11.867 5.55149 11.6484L0.75149 6.84839C0.526525 6.62335 0.400146 6.31818 0.400146 5.99999C0.400146 5.68179 0.526525 5.37662 0.75149 5.15159L5.55149 0.351588C5.77652 0.126623 6.08169 0.000244141 6.39989 0.000244141C6.71809 0.000244141 7.02326 0.126623 7.24829 0.351588Z"
              fill="#474E53"
            />
          </svg>
        </Button>
        <h1 className="text-[34px] leading-9 font-bold">Session - 1</h1>
      </div>
      <PdfViewer url={"/dummy.pdf"} />
      <div className="flex gap-6 max-lg:flex-col ">
        <div className="w-full p-6 bg-white rounded-m flex flex-col gap-4">
          <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
            List
          </div>
          <div className="flex flex-col gap-4 font-mono">
            {trainingData.map((item, index) => (
              <div key={index} className="min-h-12 flex justify-between gap-2">
                <div className={cn("flex gap-6 items-center text-neutral-100")}>
                  <div
                    className={cn(
                      "py-3 px-[15px] rounded-full bg-neutral-100 text-neutral-400",

                      item.status === "Done" && "bg-success-500 text-white"
                    )}
                  >
                    <IconPdf />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div
                      className={cn(
                        "text-base text-neutral-800 font-bold",
                        item.status === "Done" && "text-success-500"
                      )}
                    >
                      {item.title}
                    </div>
                    <span
                      className={cn(
                        "text-xs leading-4 text-neutral-400",
                        item.status === "Done" && "text-success-500"
                      )}
                    >
                      {item.fileName}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="rounded-m border-neutral-500 border-2 text-sm font-bold px-6 py-2.5 min-w-20"
                  size="icon"
                >
                  Read
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

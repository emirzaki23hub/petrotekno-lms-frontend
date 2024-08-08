"use client";
import IconChevron from "@/components/icons/IconChevron";
import IconPdf from "@/components/icons/IconPdf";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carouselHeader";
import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PdfViewer from "../../../elearning/[slug]/PdfViewer";
import IconPlay from "@/components/icons/IconPlay";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { z, ZodSchema } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const dummyData = [
  {
    id: 1,
    question: "What is your favorite color?",
    options: ["Red", "Blue", "Green"],
  },
  {
    id: 2,
    question: "What is your favorite animal?",
    options: ["Dog", "Cat", "Bird"],
    image: "/images/bg-1.png",
  },
  {
    id: 3,
    question: "What is your preferred vacation destination?",
    options: ["Beach", "Mountain", "City"],
  },
];

// Generate Zod schema dynamically
const dynamicSchema = z.object(
  dummyData.reduce((schema, item) => {
    schema[`question-${item.id}`] = z
      .string()
      .min(1, "Please select an option.");
    return schema;
  }, {} as Record<string, z.ZodTypeAny>)
);

export default function Page({
  params,
}: {
  params: { slug: string; subslug: string };
}) {
  const router = useRouter();
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

  const materiData = [
    {
      title: "Video 1",
      src: "https://www.youtube.com/embed/K4TOrB7at0Y?si=PbKol3mB7JIbPtW8",
    },
    {
      title: "Session - 2",
      src: "https://www.youtube.com/embed/K4TOrB7at0Y?si=PbKol3mB7JIbPtW8",
    },
  ];

  const form = useForm<z.infer<typeof dynamicSchema>>({
    resolver: zodResolver(dynamicSchema),
  });

  function onSubmit(data: z.infer<typeof dynamicSchema>) {
    console.log(data);
  }
  const [currentSection, setCurrentSection] = useState(1);

  const goToNextSection = () => {
    setCurrentSection((prev) => prev + 1);
  };

  const goToPrevSection = () => {
    setCurrentSection((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col gap-6">
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
            <BreadcrumbLink href="/program">
              Production Operations Training /
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary-500 font-bold">
              Module 24: Level Measurement{" "}
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
          Module 24: Level Measurement{" "}
        </h1>
      </div>
      <div className=" bg-white flex min-h-[60px] rounded-m justify-between">
        <div className="w-full">
          <Carousel className="w-full h-full flex mx-auto justify-between">
            <CarouselPrevious />
            <CarouselContent className="h-full px-6 flex  w-full justify-between">
              <CarouselItem className="basis-1/4 pl-6 flex gap-4 items-center">
                <div
                  className={cn(
                    "py-3 px-[15px] rounded-full bg-neutral-100 text-neutral-400"
                  )}
                >
                  <IconPdf />
                </div>
                Section 1
              </CarouselItem>
              <CarouselItem className="basis-1/4 pl-6 flex gap-4 items-center">
                <div
                  className={cn(
                    "py-3 px-[15px] rounded-full bg-neutral-100 text-neutral-400"
                  )}
                >
                  <IconPdf />
                </div>
                Section 2
              </CarouselItem>
              <CarouselItem className="basis-1/4 pl-6 flex gap-4 items-center">
                <div
                  className={cn(
                    "py-3 px-[15px] rounded-full bg-neutral-100 text-neutral-400"
                  )}
                >
                  <IconPdf />
                </div>
                Section 3
              </CarouselItem>
              <CarouselItem className="basis-1/4 pl-6 flex gap-4 items-center">
                <div
                  className={cn(
                    "py-3 px-[15px] rounded-full bg-neutral-100 text-neutral-400"
                  )}
                >
                  <IconPdf />
                </div>
                Section 4
              </CarouselItem>
            </CarouselContent>
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {currentSection === 1 && (
        <>
          <PdfViewer url={"/dummy.pdf"} />
          <div className="p-6 font-mono bg-white rounded-m flex justify-end items-start">
            <div className="flex items-end gap-6">
              <div className="flex flex-col justify-end  gap-0.5">
                <div className="text-sm text-right ">Next</div>
                <div className="text-[20px] leading-6 font-bold">Section 2</div>
              </div>
              <div
                onClick={goToNextSection}
                className="h-10 w-10 flex justify-center items-center rounded-m border-[#E4E6E8] bg-[#E4E6E8]"
              >
                <IconChevron dir="right" />
              </div>
            </div>
          </div>
        </>
      )}

      {/* section 2 */}
      {currentSection === 2 && (
        <>
          <PdfViewer url={"/dummy.pdf"} />
          <div className="p-6 font-mono bg-white rounded-m flex justify-between items-start">
            <div className="flex items-end gap-6">
              <div className="h-10 w-10 flex justify-center items-center rounded-m border-[#E4E6E8] bg-[#E4E6E8]">
                <IconChevron dir="left" />
              </div>
              <div className="flex flex-col justify-end  gap-0.5">
                <div className="text-sm text-right ">Previous</div>
                <div
                  onClick={goToPrevSection}
                  className="text-[20px] leading-6 font-bold"
                >
                  Section 1
                </div>
              </div>
            </div>
            <div className="flex items-end gap-6">
              <div className="flex flex-col justify-end  gap-0.5">
                <div className="text-sm text-right ">Next</div>
                <div className="text-[20px] leading-6 font-bold">Quiz</div>
              </div>
              <div
                onClick={goToNextSection}
                className="h-10 w-10 flex justify-center items-center rounded-m border-[#E4E6E8] bg-[#E4E6E8]"
              >
                <IconChevron dir="right" />
              </div>
            </div>
          </div>
          <div className="p-6 font-mono bg-white rounded-m flex  items-start">
            <div className="flex gap-6 w-full max-lg:flex-col ">
              <div className="w-full  bg-white rounded-m flex flex-col gap-4">
                <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
                  Materi
                </div>
                <div className="flex flex-col gap-4 font-mono">
                  {materiData.map((item, index) => (
                    <div
                      key={index}
                      className="min-h-12 flex justify-between gap-2"
                    >
                      <div
                        className={cn(
                          "flex gap-6 items-center text-neutral-700 font-bold"
                        )}
                      >
                        <div
                          className={cn(
                            "h-12 w-12 flex justify-center items-center rounded-full bg-neutral-100 text-neutral-400"
                          )}
                        >
                          <IconPlay />
                        </div>
                        {item.title}
                      </div>
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            variant="outline"
                            className="rounded-m border-neutral-500 border-2 text-sm font-bold px-6 py-2.5 min-w-20"
                            size="icon"
                          >
                            Play
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white p-0">
                          <DialogHeader className="pt-5 px-5">
                            <DialogTitle className="text-[28px]  font-bold leading-8">
                              {item.title}
                            </DialogTitle>
                          </DialogHeader>
                          <DialogDescription className="rounded-b-m">
                            <iframe
                              src={item.src}
                              frameBorder="0"
                              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-80 rounded-b-m"
                            ></iframe>
                          </DialogDescription>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 font-mono bg-white rounded-m flex  items-start">
            <div className="flex gap-6 w-full max-lg:flex-col ">
              <div className="w-full  bg-white rounded-m flex flex-col gap-4">
                <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
                  Document
                </div>
                <div className="flex flex-col gap-4 font-mono">
                  {trainingData.map((item, index) => (
                    <div
                      key={index}
                      className="min-h-12 flex justify-between gap-2"
                    >
                      <div
                        className={cn(
                          "flex gap-6 items-center text-neutral-100"
                        )}
                      >
                        <div
                          className={cn(
                            "h-12 w-12 flex justify-center items-center rounded-full bg-neutral-100 text-neutral-400",

                            item.status === "Done" &&
                              "bg-success-500 text-white"
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
                        className="rounded-m border-neutral-500 border-2 text-sm font-bold px-6 py-2.5 min-w-[135px]"
                        size="icon"
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {currentSection === 3 && (
        <div className="flex gap-6 flex-col">
          <div className="p-6 font-mono bg-white rounded-m flex justify-between items-start">
            <div className="flex items-end gap-6">
              <div className="h-10 w-10 flex justify-center items-center rounded-m border-[#E4E6E8] bg-[#E4E6E8]">
                <IconChevron dir="left" />
              </div>
              <div className="flex flex-col justify-end  gap-0.5">
                <div className="text-sm text-right ">Previous</div>
                <div
                  onClick={goToPrevSection}
                  className="text-[20px] leading-6 font-bold"
                >
                  Section 2
                </div>
              </div>
            </div>
            <div className="flex items-end gap-6">
              <div className="flex flex-col justify-end  gap-0.5">
                <div className="text-sm text-right ">Next</div>
                <div className="text-[20px] leading-6 font-bold">Section 3</div>
              </div>
              <div
                onClick={goToNextSection}
                className="h-10 w-10 flex justify-center items-center rounded-m border-[#E4E6E8] bg-[#E4E6E8]"
              >
                <IconChevron dir="right" />
              </div>
            </div>
          </div>
          <div className="p-6 font-mono bg-white rounded-m flex  items-start">
            <div className="flex gap-6 w-full max-lg:flex-col ">
              <div className="w-full  bg-white rounded-m flex flex-col gap-4">
                <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
                  Question{" "}
                </div>

                <div className="flex p-6 flex-col border border-[#E4E6E8] rounded-m">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full space-y-6"
                    >
                      {dummyData.map((item, index) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name={`question-${item.id}`}
                          render={({ field }) => (
                            <FormItem className="space-y-6 border p-6 rounded-m">
                              {/* Display question index + 1 */}
                              <div className="flex flex-col space-y-1">
                                <FormLabel className="font-bold text-primary-500 mb-4">
                                  Question {index + 1}
                                </FormLabel>
                                {/* Conditionally render image if it exists */}
                                {item.image && (
                                  <div className="pb-5">
                                    <img
                                      src={item.image}
                                      alt={`Question ${index + 1} image`}
                                      className=" w-full object-cover rounded-md"
                                    />
                                  </div>
                                )}
                                <FormLabel className="font-mono text-base font-bold">
                                  {item.question}
                                </FormLabel>
                              </div>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  {item.options.map((option, optionIndex) => (
                                    <FormItem
                                      key={optionIndex}
                                      className="flex items-center space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <RadioGroupItem value={option} />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {option}
                                      </FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}

                      <Button
                        className="h-[56px] px-5 bg-[#E4E6E8] rounded-m text-black"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

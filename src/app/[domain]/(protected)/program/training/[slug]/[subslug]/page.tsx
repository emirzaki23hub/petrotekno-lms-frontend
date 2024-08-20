"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carouselHeader";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import IconPlay from "@/components/icons/IconPlay";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { DatePicker } from "@/components/ui/datepicker";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import SectionNavigation from "@/components/SectionNavigation";
import { Loader2 } from "lucide-react";
import IconSlider from "@/components/icons/IconSlider";
import { startOfToday } from "date-fns";
import Link from "next/link";
import Bg1 from "../../../../../../../../public/images/bg-1.png";

import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  loading: () => <p>Loading...</p>,

  ssr: false,
});

interface Section {
  title: string;
  type: string;
  link: string;
}

const dummyData = [
  {
    id: 1,
    question: "What is your favorite color?",
    options: ["Red", "Blue", "Green"],
    correctAnswer: "Blue", // Define the correct answer
  },
  {
    id: 2,
    question: "What is your favorite animal?",
    options: ["Dog", "Cat", "Bird"],
    correctAnswer: "Dog",
    image: Bg1,
  },
  {
    id: 3,
    question: "What is your preferred vacation destination?",
    options: ["Beach", "Mountain", "City"],
    correctAnswer: "Mountain",
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

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  summary: z.string(),
});

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

const items = [
  {
    id: "ppe",
    label: "Correct PPE worn at all times",
    score: Math.floor(Math.random() * 11),
  },
  {
    id: "spool",
    label: "Spool removal/reassembly procedure carried out correctly",
    score: Math.floor(Math.random() * 11),
  },
  {
    id: "tools",
    label: "Correct tools selected for the task",
    score: Math.floor(Math.random() * 11),
  },
  {
    id: "flanges",
    label: "Correct Blind Flanges selected",
    score: Math.floor(Math.random() * 11),
  },
  {
    id: "gaskets",
    label: "Gaskets removed/replaced from flanges correctly",
    score: Math.floor(Math.random() * 11),
  },
  {
    id: "safe",
    label: "Safe working and tool use observed throughout",
    score: Math.floor(Math.random() * 11),
  },
  {
    id: "alignment",
    label: "Blind Flanges correctly aligned",
    score: Math.floor(Math.random() * 11),
  },
  {
    id: "tension",
    label: "Blind Flanges correctly tensioned using tension gauge",
    score: Math.floor(Math.random() * 11),
  },
  {
    id: "clean",
    label: "Work area kept clean and tidy",
    score: Math.floor(Math.random() * 11),
  },
  {
    id: "storage",
    label: "Tools stored in correct cabinets",
    score: Math.floor(Math.random() * 11),
  },
  {
    id: "hazards",
    label:
      "Correctly identified all hazards and control measures related to the job",
    score: Math.floor(Math.random() * 11),
  },
  {
    id: "function",
    label: "Described the function of the tools required satisfactorily",
    score: Math.floor(Math.random() * 11),
  },
  {
    id: "safety",
    label: "Described the safe use of the tools required satisfactorily",
    score: Math.floor(Math.random() * 11),
  },
  {
    id: "mechanical",
    label:
      "Described mechanical processes involved in the task performed when removing/replacing spool",
    score: Math.floor(Math.random() * 11),
  },
];

type FormSchemaType = z.infer<typeof FormSchema>;

const fetchData = async ({ id }: { id: number }) => {
  try {
    const response = await fetch(
      `https://private-013718-petro8.apiary-mock.com/module/${id}`
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

export default function Page({
  params,
}: {
  params: { slug: string; subslug: string };
}) {
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const loadModules = async () => {
      const id = parseInt(params.subslug, 10);
      if (!isNaN(id)) {
        const data = await fetchData({ id });
        setSections(data); // Assuming result is an array of Section
      } else {
        console.error("Invalid ID:", params.subslug);
      }
    };
    loadModules();
  }, [params.subslug]);

  const form = useForm<z.infer<typeof dynamicSchema>>({
    resolver: zodResolver(dynamicSchema),
  });

  const checkboxForm = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
      summary: "",
    },
  });

  const onCheckboxSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log("Submitted data:", data);
    // Your submit logic here
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<z.infer<
    typeof dynamicSchema
  > | null>(null);

  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(data: z.infer<typeof dynamicSchema>) {
    setIsLoading(true);

    const results = dummyData.map((item) => ({
      id: item.id,
      isCorrect: data[`question-${item.id}`] === item.correctAnswer,
    }));

    setTimeout(() => {
      setSubmittedData(results);
      setIsLoading(false);
      setSubmitted(true); // Set submitted state to true

      setIsDialogOpen(false);
    }, 2000); // Simulate an API call delay with setTimeout
  }

  const searchParams = useSearchParams();
  const totalSections = 5; // Adjust this based on your total number of sections

  const [currentSection, setCurrentSection] = useState<number>(() => {
    const sectionParam = searchParams.get("section");
    const section = sectionParam ? parseInt(sectionParam, 10) : 1;

    // Ensure the section is within the valid range
    return section >= 1 && section <= totalSections ? section : 1;
  });
  const goToNextSection = () => {
    setCurrentSection((prev) => {
      const nextSection = prev + 1;
      updateUrl(nextSection);
      return nextSection;
    });
  };

  const goToPrevSection = () => {
    setCurrentSection((prev) => {
      if (prev > 1) {
        const prevSection = prev - 1;
        updateUrl(prevSection);
        return prevSection;
      }
      return prev; // Return the current value if it's already 1
    });
  };

  const updateUrl = (section: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("section", section.toString()); // Convert section to string
    router.push(`?${params.toString()}`);
  };

  const initialDate = startOfToday();
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const getStatus = (score: number) => {
    return score > 5 ? "Pass" : "Fail";
  };

  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    // Access localStorage only on the client side
    const savedResults = localStorage.getItem("quizResults");
    const isSubmitted = localStorage.getItem("isSubmitted");

    setHasSubmitted(isSubmitted === "true");
  }, []);

  const currentSectionData = sections[currentSection - 1];

  console.log(currentSectionData);

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
            <BreadcrumbLink href="/east-africa-crude-oil-pipeline-project-training-programme">
              East Africa Crude Oil Pipeline Project Training Programme /
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary-500 font-bold">
              Module {params.subslug}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-4 items-center">
        <Link
          href={`/program/training/${params.slug}`}
          className="h-10 w-10 flex items-center justify-center rounded-m bg-[#E4E6E] border-black border"
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
        </Link>
        <h1 className="text-[34px] leading-9 font-bold">
          Module {params.subslug}
        </h1>
      </div>
      <div className=" bg-white flex min-h-[60px] rounded-m justify-between">
        <div className="w-full">
          <Carousel className="w-full h-full flex mx-auto justify-between">
            <CarouselPrevious />
            <CarouselContent className="h-full max-lg:px-0 px-6 flex w-full justify-between">
              {sections.map((section, index) => (
                <CarouselItem
                  key={section.title}
                  className={cn(
                    `basis-1/5 pl-0 max-lg:basis-1/2 lg:pl-6 font-bold flex max-lg:gap-2 gap-4 items-center`,
                    currentSection > index + 1 && "text-success-500",
                    currentSection === index + 1 && "text-primary-500"
                  )}
                >
                  <div
                    className={cn(
                      "w-9 h-9 flex justify-center items-center rounded-full",
                      currentSection > index + 1 && "bg-success-400 text-white",
                      currentSection === index + 1 &&
                        "bg-primary-500 text-white",
                      currentSection < index + 1 &&
                        "bg-neutral-100 text-neutral-400"
                    )}
                  >
                    <div className="m-5">
                      <IconSlider />
                    </div>
                  </div>
                  <span className="whitespace-nowrap">{section.title}</span>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {currentSectionData ? (
        <>
          <PdfViewer
            title={currentSectionData.title}
            url={currentSectionData.link}
          />
          <SectionNavigation
            currentSection={currentSection}
            sections={sections}
            goToPrevSection={goToPrevSection}
            goToNextSection={goToNextSection}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

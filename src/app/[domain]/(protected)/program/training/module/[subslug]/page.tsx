"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import IconPdf from "@/components/icons/IconPdf";
import Slider from "react-slick";

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

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// import IconPlay from "@/components/icons/IconPlay";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { DialogTitle } from "@radix-ui/react-dialog";
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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ArrowProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

import dynamic from "next/dynamic";
import IconChevron from "@/components/icons/IconChevron";

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  loading: () => <p>Loading...</p>,

  ssr: false,
});

interface Option {
  choice: string;
  answer: boolean;
}

interface QuestionItem {
  question: string;
  choices: Option[];
  type: string;
}

interface Section {
  title: string;
  type: string;
  link: string;
  data: QuestionItem[]; // Assuming all data is of type QuestionItem[]
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

  const searchParams = useSearchParams();
  const totalSections = sections.length; // Adjust this based on your total number of sections

  const sectionParam = searchParams.get("section");

  const [currentSection, setCurrentSection] = useState<number>(() => {
    const section = sectionParam ? parseInt(sectionParam, 10) : 1;

    return section >= 1 && section <= totalSections ? section : 1;
  });

  useEffect(() => {
    const section = sectionParam ? parseInt(sectionParam, 10) : 1;
    if (section >= 1 && section <= totalSections) {
      setCurrentSection(section);
    }
  }, [sectionParam, totalSections]);

  const sliderRef = useRef<Slider>(null);
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

  useEffect(() => {
    if (
      sliderRef.current &&
      currentSection > 0 &&
      currentSection <= sections.length
    ) {
      sliderRef.current.slickGoTo(currentSection - 1);
    }
  }, [sections, currentSection]);

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

  const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <button
      onClick={onClick}
      className={cn(
        "border-[#E4E6E8] min-w-[56px] border-r  left-0 top-0 absolute flex justify-center items-center border-l rounded-none h-full bg-white z-10 rounded-l-m   "
      )}>
      <IconChevron dir="left" />
    </button>
  );

  const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <button
      onClick={onClick}
      className={cn(
        "border-[#E4E6E8] min-w-[56px] right-0 top-0 absolute flex justify-center items-center border-l rounded-none h-full bg-white z-10 rounded-r-m "
      )}>
      <IconChevron dir="right" />
    </button>
  );
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5, // Show 4 slides on desktop
    slidesToScroll: 5, // Scroll 4 slides at a time
    prevArrow: (
      <PrevArrow
        onClick={function (
          event: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    nextArrow: (
      <NextArrow
        onClick={function (
          event: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 1024, // For screens smaller than 1024px
        settings: {
          slidesToShow: 2, // Show 2 slides on smaller screens
          slidesToScroll: 2, // Scroll 2 slides at a time
        },
      },
      {
        breakpoint: 600, // For screens smaller than 600px
        settings: {
          slidesToShow: 1, // Show 1 slide on very small screens
          slidesToScroll: 1, // Scroll 1 slide at a time
        },
      },
    ],
  };

  const [jobCardSubmitted, setJobCarSubmitted] = useState(false); // State to track form submission

  const onCheckboxSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log("Submitted data:", data);
    setJobCarSubmitted(true);
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
    console.log("Form submit initiated");
    try {
      setIsLoading(true);

      console.log("Current section data:", currentSectionData);

      // Map through the current section's questions and check answers
      const results = currentSectionData.data.map((item, index) => {
        const selectedAnswer = data[`question-${index}`];
        const correctAnswer = item.choices.find(
          (choice) => choice.answer
        )?.choice;

        console.log(
          `Question ${
            index + 1
          } - Selected: ${selectedAnswer}, Correct: ${correctAnswer}`
        );

        return {
          id: index, // Or use item.id if available
          isCorrect: selectedAnswer === correctAnswer,
        };
      });

      console.log("Results:", results);

      // Simulate an API call delay with setTimeout
      setTimeout(() => {
        setSubmittedData(results);
        setIsLoading(false);
        setSubmitted(true); // Set submitted state to true
        setIsDialogOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error during form submission:", error);
      setIsLoading(false);
    }
  }

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
  // const getStatus = (score: number) => {
  //   return score > 5 ? "Pass" : "Fail";
  // };

  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    // Access localStorage only on the client side
    const savedResults = localStorage.getItem("quizResults");
    const isSubmitted = localStorage.getItem("isSubmitted");

    setHasSubmitted(isSubmitted === "true");
  }, []);

  const currentSectionData = sections[currentSection - 1];

  const getScoreAndStatus = () => {
    const score = Math.floor(Math.random() * 11); // Random score between 0-10
    const status = score > 5 ? "Pass" : "Fail"; // Pass if score > 5, otherwise Fail
    return { score, status };
  };

  const scoreData = useMemo(() => {
    return items.map(() => getScoreAndStatus());
  }, [items]);

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
            <BreadcrumbLink href="/program/training/module">
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
          href={`/program/training/module`}
          className="h-10 w-10 flex items-center justify-center rounded-m bg-[#E4E6E] border-black border">
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
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
          <Slider
            ref={sliderRef}
            {...settings}
            className="w-full [&>div]:h-full px-5 lg:pr-14 lg:pl-20 [&>div>div]:h-full [&>div>div>div]:h-full [&>div>div>div>div]:h-full   h-full flex mx-auto justify-between">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className={cn(
                  `font-bold px-3 lg:px-4 !flex h-full max-lg:justify-center  max-lg:gap-2 gap-4 items-center`,
                  currentSection > index + 1 && "text-success-500",
                  currentSection === index + 1 && "text-primary-500"
                )}>
                <div
                  className={cn(
                    "w-9 h-9 flex justify-center items-center rounded-full",
                    currentSection > index + 1 && "bg-success-400 text-white",
                    currentSection === index + 1 && "bg-primary-500 text-white",
                    currentSection < index + 1 &&
                      "bg-neutral-100 text-neutral-400"
                  )}>
                  <div className="m-5">
                    <IconSlider />
                  </div>
                </div>
                <span className="line-clamp-1">{section.title}</span>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {currentSectionData ? (
        <>
          {currentSectionData.type === "PDF" && (
            <PdfViewer
              title={currentSectionData.title}
              url={currentSectionData.link}
            />
          )}

          {currentSectionData.type === "TEST" && (
            <>
              <div className="p-6 flex max-lg:flex-col max-lg:gap-4 max-lg:items-center justify-between rounded-m bg-white items-end">
                {hasSubmitted ? (
                  <div className="flex max-w-[536px] w-full mx-auto justify-center items-start flex-col gap-4">
                    <div className="flex gap-2 text-sm text-primary-500 font-bold">
                      20 Questions
                    </div>
                    <div className="text-2xl font-sans leading-7 font-bold">
                      Level Measurement Test
                    </div>
                    <div className="text-base text-neutral-400">
                      Start Date: 25 Jun 2024 • 09.00 WIB
                    </div>
                    <div className="bg-neutral-100 rounded-m flex gap-[102px] font-mono p-4 lg:min-w-[536px] justify-center">
                      <div className="flex flex-col gap-1.5">
                        <div className="text-base text-neutral-400">
                          Score Test
                        </div>
                        <div className="text-[34px] font-bold text-center">
                          100
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <div className="text-base text-neutral-400">
                          Correct Answer
                        </div>
                        <div className="text-[34px] font-bold text-center">
                          10/10
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full justify-center">
                      <Link
                        className="h-[56px] font-sans text-base border border-secondary-500 text-secondary-500 font-bold rounded-m flex justify-center items-center min-w-[155px]"
                        href={`/program/training/module/${params.subslug}/test`}>
                        View Result
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col text-neutral-700 font-mono gap-4">
                      <div className="flex gap-2 text-sm text-primary-500 font-bold">
                        20 Questions
                      </div>
                      <div className="text-2xl font-sans leading-7 font-bold">
                        Level Measurement Test
                      </div>
                      <div className="text-base text-neutral-400">
                        Start Date: 25 Jun 2024 • 09.00 WIB
                      </div>
                    </div>

                    <Link
                      className="h-[56px] font-sans text-base bg-secondary-500 rounded-m flex justify-center items-center min-w-[155px] text-white"
                      href={`/program/training/${params.slug}/${params.subslug}/test`}>
                      Start Test
                    </Link>
                  </>
                )}
              </div>
            </>
          )}

          <SectionNavigation
            currentSection={currentSection}
            sections={sections}
            goToPrevSection={goToPrevSection}
            goToNextSection={goToNextSection}
          />

          {currentSectionData.type === "QUIZ" && (
            <div className="p-6 font-mono bg-white rounded-m flex items-start">
              <div className="flex gap-6 w-full max-lg:flex-col">
                <div className="w-full bg-white rounded-m flex flex-col gap-4">
                  <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
                    Question
                  </div>
                  <div className="flex p-6 flex-col border border-[#E4E6E8] rounded-m">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6">
                        {currentSectionData.data.map((questionItem, index) => (
                          <FormField
                            key={index}
                            control={form.control}
                            name={`question-${index}`}
                            render={({ field }) => {
                              const selectedAnswer = field.value;

                              return (
                                <FormItem className="space-y-6 bg-white border rounded-m">
                                  <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="font-bold px-6 text-primary-500 mb-4">
                                      Question {index + 1}
                                    </FormLabel>
                                    <FormLabel className="font-mono px-6 text-base font-bold">
                                      {questionItem.question}
                                    </FormLabel>
                                  </div>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="flex flex-col space-y-1 px-6 pb-6"
                                      disabled={submitted}>
                                      {questionItem.choices.map(
                                        (option, optionIndex) => {
                                          const isOptionSelected =
                                            field.value === option.choice;
                                          const isOptionCorrect =
                                            option.answer === true;
                                          const isOptionWrong =
                                            submitted &&
                                            !isOptionCorrect &&
                                            isOptionSelected;

                                          return (
                                            <FormItem
                                              key={optionIndex}
                                              className="flex items-center space-x-3 space-y-0">
                                              <FormControl>
                                                <RadioGroupItem
                                                  className={cn(
                                                    "data-[state=checked]:bg-green-500 data-[state=checked]:text-white",
                                                    submitted && isOptionCorrect
                                                      ? "bg-green-300"
                                                      : submitted &&
                                                        isOptionWrong
                                                      ? "data-[state=checked]:bg-primary-500"
                                                      : ""
                                                  )}
                                                  value={option.choice}
                                                  disabled={submitted}
                                                />
                                              </FormControl>
                                              <FormLabel
                                                className={cn(
                                                  "font-normal",
                                                  submitted && isOptionCorrect
                                                    ? "text-green-500"
                                                    : "",
                                                  submitted && isOptionWrong
                                                    ? "text-[#F04B35]"
                                                    : ""
                                                )}>
                                                {option.choice}
                                              </FormLabel>
                                            </FormItem>
                                          );
                                        }
                                      )}
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        ))}

                        <Button
                          className="h-[56px] px-5 bg-[#E4E6E8] rounded-m text-black"
                          onClick={handleOpenDialog}
                          disabled={submitted}
                          type="button">
                          Submit
                        </Button>
                        <Dialog
                          open={isDialogOpen}
                          onOpenChange={setIsDialogOpen}>
                          <DialogContent className="bg-white">
                            <DialogHeader className="text-[28px] font-bold">
                              Submit
                            </DialogHeader>
                            <DialogDescription className="text-base">
                              Are you sure to submit the answer of the test?
                            </DialogDescription>

                            {isLoading && (
                              <div className="flex justify-center items-center">
                                <Loader2 className="mr-2 size-12 animate-spin" />
                              </div>
                            )}

                            <div className="flex gap-4 w-full">
                              <Button
                                disabled={isLoading}
                                onClick={onSubmit}
                                className="mt-4 h-[56px] bg-secondary-500 w-full text-white">
                                Yes
                              </Button>
                              <Button
                                type="button"
                                disabled={isLoading}
                                onClick={() => setIsDialogOpen(false)}
                                className="mt-4 h-[56px] bg-[#F04B35] w-full text-white">
                                Cancel
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSectionData.type === "JOB_CARD" && (
            <>
              {!jobCardSubmitted ? (
                <div className="p-6 font-mono bg-white rounded-m flex items-start">
                  <div className="flex gap-6 w-full max-lg:flex-col">
                    <div className="w-full bg-white rounded-m flex flex-col gap-6">
                      <div className="text-[20px] leading-6 font-bold h-10 pb-4 font-sans">
                        Marking Scheme Task
                      </div>

                      <div className="flex gap-1 flex-col #474E53 font-mono pb-4 border-[#E4E6E8] border-b">
                        <span className="text-[20px] leading-6 font-bold">
                          Task 1
                        </span>
                        <span className="text-sm">
                          BREAKING CONTAINMENT SPOOL REMOVAL
                        </span>
                        <p className="text-sm leading-5 text-neutral-600 pb-4 w-2/3 font-semibold">
                          This task involves evaluating the steps and procedures
                          followed during the containment spool removal process.
                          The goal is to ensure all safety protocols are adhered
                          to, and the correct tools and techniques are applied.
                          Please carefully complete each task, and provide
                          feedback where necessary.
                        </p>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="text-base text-neutral-800 font-bold">
                          Training Date
                        </div>
                        <DatePicker
                          date={selectedDate}
                          onDateChange={(date) => {
                            if (date) {
                              setSelectedDate(date);
                            }
                          }}
                        />
                      </div>

                      <Form {...checkboxForm}>
                        <form
                          onSubmit={checkboxForm.handleSubmit(
                            onCheckboxSubmit
                          )}>
                          <div className="flex flex-col gap-6">
                            {items.map((item, index) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-10">
                                <div className="w-2">{index + 1}.</div>
                                <FormField
                                  control={checkboxForm.control}
                                  name="items"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-center h-full">
                                      <FormControl>
                                        <Checkbox
                                          checked={
                                            Array.isArray(field.value) &&
                                            field.value.includes(item.id)
                                          }
                                          onCheckedChange={(checked) => {
                                            const updatedValue = Array.isArray(
                                              field.value
                                            )
                                              ? field.value
                                              : [];
                                            return checked
                                              ? field.onChange([
                                                  ...updatedValue,
                                                  item.id,
                                                ])
                                              : field.onChange(
                                                  updatedValue.filter(
                                                    (value) => value !== item.id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <div>{item.label}</div>
                              </div>
                            ))}
                          </div>
                          <FormField
                            control={checkboxForm.control}
                            name="summary"
                            render={({ field }) => (
                              <FormItem className="mt-10">
                                <FormLabel className="text-base leading-6 font-bold font-mono">
                                  Summary
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Enter long text here"
                                    className="rounded-m"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="mt-10 flex justify-center w-full">
                            <Button
                              className="h-[56px] bg-secondary-500 text-white max-lg:w-full lg:min-w-[300px] rounded-m"
                              type="submit">
                              Submit
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 font-mono bg-white rounded-m flex items-start">
                  <div className="flex gap-6 w-full max-lg:flex-col">
                    <div className="w-full bg-white rounded-m flex flex-col gap-6">
                      <div className="text-[20px] leading-6 font-bold h-10 pb-4 font-sans">
                        Marking Scheme Task
                      </div>
                      <div className="flex gap-1 flex-col #474E53 font-mono pb-4 border-[#E4E6E8] border-b">
                        <span className="text-[20px] leading-6 font-bold">
                          Task 1
                        </span>
                        <span className="text-sm">
                          BREAKING CONTAINMENT SPOOL REMOVAL
                        </span>
                        <p className="text-sm leading-5 text-neutral-600 pb-4 w-2/3 font-semibold">
                          This task involves evaluating the steps and procedures
                          followed during the containment spool removal process.
                          The goal is to ensure all safety protocols are adhered
                          to, and the correct tools and techniques are applied.
                          Please carefully complete each task, and provide
                          feedback where necessary.
                        </p>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="text-base text-neutral-800 font-bold">
                          Training Date
                        </div>
                        <DatePicker
                          date={selectedDate}
                          onDateChange={(date) => {
                            if (date) {
                              setSelectedDate(date);
                            }
                          }}
                        />
                      </div>

                      <Tabs defaultValue="task" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 lg:w-[600px]">
                          <TabsTrigger
                            className="border-neutral-800 font-sans text-base font-bold border-r-0 border rounded-l-m rounded-r-0"
                            value="task">
                            Task List
                          </TabsTrigger>
                          <TabsTrigger
                            className="border-neutral-800 border font-sans text-base font-bold rounded-l-0 rounded-r-m"
                            value="feedback">
                            Feedback
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="task">
                          <Table className="w-full mt-5">
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[60px]">No.</TableHead>
                                <TableHead className="w-[60px]"></TableHead>
                                <TableHead>Task List</TableHead>
                                <TableHead className="w-[100px]">
                                  Score
                                </TableHead>
                                <TableHead className="w-[100px]">
                                  Status
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {items.map((item, index) => {
                                const { score, status } = scoreData[index]; // Retrieve the score and status for the current item
                                return (
                                  <TableRow className="border-0" key={item.id}>
                                    <TableCell>{index + 1}.</TableCell>
                                    <TableCell>
                                      <Checkbox
                                        checked={checkboxForm
                                          .getValues("items")
                                          .includes(item.id)}
                                        disabled
                                      />
                                    </TableCell>
                                    <TableCell>{item.label}</TableCell>
                                    <TableCell>{score}</TableCell>
                                    <TableCell
                                      className={
                                        status === "Pass"
                                          ? "text-green-600"
                                          : "text-red-600"
                                      }>
                                      {status}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TabsContent>
                        <TabsContent value="feedback">
                          <div className="flex flex-col gap-4 mt-5">
                            <div className="font-mono text-base font-bold">
                              Instructors justification for the above scores
                            </div>
                            <Textarea
                              disabled
                              className="p-4 min-h-[300px] font-mono">
                              {checkboxForm.getValues("summary")}
                            </Textarea>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

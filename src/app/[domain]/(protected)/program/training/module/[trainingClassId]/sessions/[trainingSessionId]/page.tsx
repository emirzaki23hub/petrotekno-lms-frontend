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
import ReactPlayer from "react-player/youtube";
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
  DialogTitle,
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
import Bg1 from "../../../../../../../../../../public/images/bg-1.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ArrowProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

import dynamic from "next/dynamic";
import IconChevron from "@/components/icons/IconChevron";
import { restTraining } from "@/rest/training";
import { useDomainHelper } from "@/hooks/useDomainHelper";
import { QuizQuestion, TrainingSessionData } from "@/types";
import IconPlay from "@/components/icons/IconPlay";
import IconPdf from "@/components/icons/IconPdf";

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  loading: () => <p>Loading...</p>,

  ssr: false,
});







const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  summary: z.string(),
});


type FormSchemaType = z.infer<typeof FormSchema>;



export default function Page({
  params,
}: {
  params: {
    trainingClassId: string;
    subslug: string;

    trainingSessionId: string;
  };
}) {


  const router = useRouter();
  const [sections, setSections] = useState<TrainingSessionData>({
    id: "",
    class_date: "",
    score: null,
    progress_session: 0,
    module: {
      data: {
        id: "",
        title: "",
        subtitle: "",
        url_download_zip: null,
        sections: {
          data: [],
        },
      },
    },
  });
  const [currentSection, setCurrentSection] = useState<number>(1);

  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();

  const searchParams = useSearchParams();
  const [isloadingSection, setIsLoadingSection] = useState<boolean>(false); // Step 1: Add loading state

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    const loadModules = async () => {
      setIsLoadingSection(true); // Step 2: Set loading to true before API call
      try {
        const data = await restTraining.getTrainingSessionDetail(
          token,
          partBeforeDot,
          params.trainingClassId,
          params.trainingSessionId
        );
        setSections((data?.data?.data as TrainingSessionData) ?? null);
      } catch (error) {
        console.error("Error fetching training session details:", error);
      } finally {
        setIsLoadingSection(false); // Step 3: Set loading to false after API call
      }
    };

    loadModules();
  }, [params.trainingClassId]);
  const listRetryData = sections?.list_retry || [];


  const sectionParam = searchParams.get("section");

  useEffect(() => {
    if (sections) {
      const totalSections = sections.module.data.sections.data.length;
      const section = sectionParam ? parseInt(sectionParam, 10) : 1;
      if (section >= 1 && section <= totalSections) {
        setCurrentSection(section);
      } else {
        setCurrentSection(1); // Default to the first section if out of range
      }
    }
  }, [sectionParam, sections]);

  const currentSectionData =
    sections?.module.data.sections.data[currentSection - 1];

  const sliderRef = useRef<Slider>(null);

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
      )}
    >
      <IconChevron dir="left" />
    </button>
  );

  const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <button
      onClick={onClick}
      className={cn(
        "border-[#E4E6E8] min-w-[56px] right-0 top-0 absolute flex justify-center items-center border-l rounded-none h-full bg-white z-10 rounded-r-m "
      )}
    >
      <IconChevron dir="right" />
    </button>
  );
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:
      sections?.module.data.sections.data.length > 5
        ? 5
        : sections?.module.data.sections.data.length,
    slidesToScroll:
      sections?.module.data.sections.data.length > 5
        ? 5
        : sections?.module.data.sections.data.length,
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
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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

  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  const goToNextSection = () => {
    setCurrentSection((prev) => {
      const nextSection = prev + 1;
      if (
        sections &&
        nextSection <= sections.module.data.sections.data.length
      ) {
        updateUrl(nextSection);
        return nextSection;
      }
      return prev;
    });
  };

  const goToPrevSection = () => {
    setCurrentSection((prev) => {
      if (prev > 1) {
        const prevSection = prev - 1;
        updateUrl(prevSection);
        return prevSection;
      }
      return prev;
      1;
    });
  };

  const updateUrl = (section: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("section", section.toString());
    router.push(`?${params.toString()}`);
  };

  // const initialDate = startOfToday();
  // const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  // const getStatus = (score: number) => {
  //   return score > 5 ? "Pass" : "Fail";
  // };



  // const currentSectionData = sections[currentSection - 1];

  // const getScoreAndStatus = () => {
  //   const score = Math.floor(Math.random() * 11); // Random score between 0-10
  //   const status = score > 5 ? "Pass" : "Fail"; // Pass if score > 5, otherwise Fail
  //   return { score, status };
  // };

  // const scoreData = useMemo(() => {
  //   return items.map(() => getScoreAndStatus());
  // }, [items]);

  const documents = currentSectionData?.documents.data || [];

  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const fetchQuizData = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!currentSectionData) return;
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      setLoading(true);

      if (currentSectionData.type === "QUIZ") {
        const response = await restTraining.getTrainingSessionQuiz(
          token,
          partBeforeDot,
          params.trainingClassId,
          params.trainingSessionId,
          currentSectionData.id
        );
        setQuizData(response?.data?.data ?? []);
      }
    } catch (err) {
      setError("Failed to fetch quiz data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, [currentSectionData, submitted]);

  const dynamicSchema = z.object(
    quizData.reduce((schema, item) => {
      schema[`question-${item.id}`] = z
        .string()
        .min(1, "Please select an option.");
      return schema;
    }, {} as Record<string, z.ZodTypeAny>)
  );

  const form = useForm<z.infer<typeof dynamicSchema>>({
    resolver: zodResolver(dynamicSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (data: any) => {
    // ▼▼▼ 1. Aktifkan loader saat fungsi dimulai ▼▼▼
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("authToken");

      if (!currentSectionData) return; // finally akan tetap berjalan
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      const answers = Object.keys(data)
        .map((questionKey) => {
          const questionId = questionKey.replace("question-", "");
          const answer = quizData
            .find((item) => item.id === questionId)
            ?.answers.data.find(
              (answer) => answer.answer === data[questionKey]
            );

          return answer
            ? {
              question_id: questionId,
              answer_id: answer.id,
            }
            : null;
        })
        .filter((answer) => answer !== null) as {
          question_id: string;
          answer_id: string;
        }[];

      const requestBody = {
        token: token,
        domain: partBeforeDot,
        trainingClassId: params.trainingClassId,
        trainingSessionId: params.trainingSessionId,
        trainingSectionId: currentSectionData.id,
        answers: answers,
      };

      const response = await restTraining.postPostSubmitQuiz(requestBody);

      if (response.ok) {
        setIsDialogOpen(false);
        setSubmitted(true);
        router.replace(`/program/training/module/${params.trainingClassId}/`)
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      // Di sini Anda bisa menambahkan notifikasi error untuk pengguna,
      // misalnya: toast.error("Gagal mensubmit kuis.");
    } finally {
      // ▼▼▼ 2. Matikan loader setelah try/catch selesai ▼▼▼
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentSection - 1); // Move to the correct slide
    }
  }, [currentSection]);

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
            <BreadcrumbLink
              href={`/program/training/module/${params.trainingClassId}`}
            >
              Module /
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary-500 font-bold">
              {sections.module.data.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-4 items-center">
        <Link
          href={`/program/training/module/${params.trainingClassId}`}
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
      {currentSectionData && (
        <div className="bg-white flex min-h-[60px] rounded-m justify-between">
          <div className="w-full">
            <Slider
              ref={sliderRef}
              {...settings}
              className="w-full [&>div]:h-full px-5 lg:pr-14 lg:pl-20 [&>div>div]:h-full [&>div>div>div]:h-full [&>div>div>div>div]:h-full h-full flex mx-auto justify-between"
            >
              {sections?.module.data.sections.data.map((section, index) => (
                <div
                  key={section.title}
                  className={cn(
                    `font-bold px-3 lg:px-4 !flex h-full max-lg:justify-center max-lg:gap-2 gap-4 items-center`,
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
                  <span className="line-clamp-1">
                    {section.type === "PDF"
                      ? `Lesson ${index + 1}`
                      : section.type}
                  </span>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      {isloadingSection ? (
        <div>Loading...</div>
      ) : currentSectionData ? (
        <>
          {currentSectionData.type === "PDF" && (
            <>
              <PdfViewer
                title={currentSectionData.title}
                url={currentSectionData.file_url}
              />
            </>
          )}

          {currentSectionData.materials.data.length > 0 && (
            <div className="p-6 font-mono bg-white rounded-m flex items-start">
              <div className="flex gap-6 w-full max-lg:flex-col">
                <div className="w-full bg-white rounded-m flex flex-col gap-4">
                  <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
                    Materi
                  </div>
                  <div className="flex flex-col gap-4 font-mono">
                    {currentSectionData.materials.data.map((item, index) => (
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
                              <DialogTitle className="text-[28px] font-bold leading-8">
                                {item.title}
                              </DialogTitle>
                            </DialogHeader>
                            <DialogDescription className="rounded-b-m">
                              <iframe
                                src={item.url}
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
          )}

          {documents.length > 0 && (
            <div className="p-6 font-mono bg-white rounded-m flex items-start">
              <div className="flex gap-6 w-full max-lg:flex-col">
                <div className="w-full bg-white rounded-m flex flex-col gap-4">
                  <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
                    Document
                  </div>
                  <div className="flex flex-col gap-4 font-mono">
                    {documents.map((item, index) => (
                      <div
                        key={index}
                        className="min-h-12 flex justify-between gap-2"
                      >
                        <div
                          className={cn(
                            "flex gap-6 max-lg:gap-3 items-center text-neutral-100"
                          )}
                        >
                          <div
                            className={cn(
                              "h-12 w-12 max-lg:h-20 flex justify-center items-center rounded-full bg-neutral-100 text-neutral-400",
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
                        <Link
                          className="rounded-m border-neutral-500 border-2 text-sm font-bold px-6 py-2.5  text-center min-w-[135px]"
                          href={item.url}
                          download
                          target="_blank"
                        >
                          Download
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* {currentSectionData.type === "TEST" && (
            <>
              <div className="p-6 flex max-lg:flex-col max-lg:gap-4 max-lg:items-center justify-between rounded-m bg-white items-end">
                {hasSubmitted ? (
                  <div className="flex max-w-[536px] w-full mx-auto justify-center items-start flex-col gap-4">
                    <div className="flex gap-2 text-sm text-primary-500 font-bold">
                      15 Questions
                    </div>
                    <div className="text-2xl font-sans leading-7 font-bold">
                      {currentSectionData.title}
                    </div>
                    <div className="text-base text-neutral-400">
                      Start Date: 30 Aug 2024 • 09.00 WIB
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
                          5/15
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full justify-center">
                      <Link
                        className="h-[56px] font-sans text-base border border-secondary-500 text-secondary-500 font-bold rounded-m flex justify-center items-center min-w-[155px]"
                        href={`/program/training/module/${params.subslug}/test`}
                      >
                        Resit
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col text-neutral-700 font-mono gap-4">
                      <div className="flex gap-2 text-sm text-primary-500 font-bold">
                        15 Questions
                      </div>
                      <div className="text-2xl font-sans leading-7 font-bold">
                        {currentSectionData.title}
                      </div>
                      <div className="text-base text-neutral-400">
                        Start Date: 30 Aug 2024 • 09.00 WIB
                      </div>
                    </div>

                    <Link
                      className="h-[56px] font-sans text-base bg-secondary-500 rounded-m flex justify-center items-center min-w-[155px] text-white"
                      href={`/program/training/module/${params.subslug}/test`}
                    >
                      Start Test
                    </Link>
                  </>
                )}
              </div>
            </>
          )} */}

          {currentSectionData.type === "VIDEO" && (
            <div className="relative flex  items-center overflow-hidden rounded-xl bg-black max-lg:h-[273px] lg:aspect-[16/9]">
              <ReactPlayer
                url={currentSectionData.video_url ?? ""}
                width="100%"
                height="100%"
                className=" !w-full lg:!aspect-video"
              />
            </div>
          )}

          <SectionNavigation
            currentSection={currentSection}
            sections={sections?.module.data.sections.data}
            goToPrevSection={goToPrevSection}
            goToNextSection={goToNextSection}
            params={params}
          />

          {currentSectionData.type === "QUIZ" && (
            <div className="p-6 font-mono bg-white rounded-m flex items-start">
              <div className="flex gap-6 w-full max-lg:flex-col">

                {/* 🧩 QUIZ/QUESTION SECTION (Column 1) */}
                <div className="w-full bg-white rounded-m flex flex-col gap-4">
                  <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
                    Question
                  </div>

                  {/* --- 🛑 NEW CHECK FOR EMPTY QUIZ DATA --- */}
                  {quizData && quizData.length > 0 ? (
                    <div className="flex p-6 flex-col border border-[#E4E6E8] rounded-m">
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="w-full space-y-6"
                        >
                          {quizData.map((questionItem, index) => {
                            const userAnswer = questionItem.participant_answer;
                            const correctAnswer = questionItem.correct_answer;
                            const isDisabled = Boolean(
                              userAnswer && correctAnswer
                            );

                            return (
                              <FormField
                                key={questionItem.id}
                                control={form.control}
                                name={`question-${questionItem.id}`}
                                render={({ field }) => {
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
                                          disabled={isDisabled}
                                        >
                                          {questionItem.answers.data.map(
                                            (option) => {
                                              const isOptionCorrect =
                                                correctAnswer === option.id;
                                              const isOptionWrong =
                                                userAnswer === option.id &&
                                                !isOptionCorrect;
                                              return (
                                                <FormItem
                                                  key={option.id}
                                                  className="flex items-center space-x-3 space-y-0"
                                                >
                                                  <FormControl>
                                                    <RadioGroupItem
                                                      className={cn(
                                                        "data-[state=checked]:bg-green-500 data-[state=checked]:text-white",
                                                        isOptionCorrect
                                                          ? "bg-green-300"
                                                          : isOptionWrong
                                                            ? "bg-primary-500 data-[state=checked]:bg-primary-500"
                                                            : ""
                                                      )}
                                                      value={option.answer}
                                                      disabled={isDisabled}
                                                    />
                                                  </FormControl>
                                                  <FormLabel
                                                    className={cn(
                                                      "font-normal",
                                                      isOptionCorrect
                                                        ? "text-green-500"
                                                        : isOptionWrong
                                                          ? "text-[#F04B35]"
                                                          : ""
                                                    )}
                                                  >
                                                    {option.answer}
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
                            );
                          })}

                          <Button
                            className="h-[56px] px-5 bg-[#E4E6E8] rounded-m text-black"
                            onClick={handleOpenDialog}
                            disabled={Boolean(
                              quizData[0]?.participant_answer &&
                              quizData[0]?.correct_answer
                            )}
                            type="button"
                          >
                            Submit
                          </Button>

                          {/* Submission Dialog */}
                          <Dialog
                            open={isDialogOpen}
                            onOpenChange={setIsDialogOpen}
                          >
                            <DialogContent className="bg-white">
                              <DialogHeader className="text-[28px] font-bold">
                                Submit
                              </DialogHeader>
                              <DialogDescription className="text-base">
                                Are you sure to submit the answer of the test?
                              </DialogDescription>

                              {loading && (
                                <div className="flex justify-center items-center">
                                  <Loader2 className="mr-2 size-12 animate-spin" />
                                </div>
                              )}

                              <div className="flex gap-4 w-full">
                                <Button
                                  disabled={isSubmitting}
                                  onClick={form.handleSubmit(onSubmit)}
                                  className="mt-4 h-[56px] bg-secondary-500 w-full text-white"
                                >
                                  {isSubmitting && (
                                    <div className="flex justify-center items-center">
                                      <Loader2 className="mr-2 size-12 animate-spin" />
                                    </div>
                                  )}
                                  Yes
                                </Button>
                                <Button
                                  type="button"
                                  disabled={loading}
                                  onClick={() => setIsDialogOpen(false)}
                                  className="mt-4 h-[56px] bg-[#F04B35] w-full text-white"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </form>
                      </Form>
                    </div>
                  ) : (
                    /* Empty State for Quiz */
                    <div className="p-10 text-center text-lg text-gray-500 border border-[#E4E6E8] rounded-m bg-gray-50">
                      {`📝 **This quiz section is unavailable.** This might be because the questions aren't ready, or maybe you already maxed your tries to take the test.   `}                 </div>
                  )}
                </div>

                {/* 🔄 RETRY HISTORY SECTION (Column 2) */}
                <div className="w-1/3 max-lg:w-full bg-white rounded-m flex flex-col gap-4">
                  <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
                    Retry History
                  </div>
                  <div className="flex flex-col gap-4">
                    {listRetryData && listRetryData.length > 0 ? (
                      listRetryData.map((retry, index) => (
                        <div
                          key={retry.id}
                          className="p-4 border border-[#E4E6E8] rounded-m bg-gray-50 flex justify-between items-center"
                        >
                          <div className="flex flex-col gap-1">
                            {/* Attempt Number and UUID */}
                            <div className="flex items-center gap-2">
                              <div className="flex flex-col">

                                <div className="font-bold text-lg">Attempt #{index + 1}</div>
                                {retry.status_send_jgc ? (
                                  <span className="px-2 py-0.5 text-xs font-semibold leading-none rounded-full bg-blue-100 text-blue-800">
                                    SENT TO JGC
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 text-xs font-semibold leading-none rounded-full bg-yellow-100 text-yellow-800">
                                    PENDING
                                  </span>
                                )}
                              </div>
                              {/* 🏅 NEW: JGC Status Badge */}

                            </div>

                            {/* Ensure you still have the UUID line if needed */}
                            {/* <div className="text-sm text-gray-600">UUID: {retry.uuid.substring(0, 8)}...</div> */}
                          </div>

                          {/* Score and Total Retries */}
                          <div className="text-right">
                            <div className={`font-extrabold text-xl ${
                              // Parses the string score to an integer for correct comparison, defaulting to "0" if null
                              parseInt(retry.score ?? "0") > 85 ? 'text-green-600' : 'text-red-500'
                              }`}>
                              Score: {retry.score}
                            </div>
                            <div className="text-xs text-gray-500">Total Retries: {retry.total_retry}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 border border-[#E4E6E8] rounded-m text-center text-gray-500">
                        No retry attempts found.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* {currentSectionData.type === "JOB_CARD" && (
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
                          onSubmit={checkboxForm.handleSubmit(onCheckboxSubmit)}
                        >
                          <div className="flex flex-col gap-6">
                            {items.map((item, index) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-10"
                              >
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
                              type="submit"
                            >
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
                            value="task"
                          >
                            Task List
                          </TabsTrigger>
                          <TabsTrigger
                            className="border-neutral-800 border font-sans text-base font-bold rounded-l-0 rounded-r-m"
                            value="feedback"
                          >
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
                                      }
                                    >
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
                              className="p-4 min-h-[300px] font-mono"
                            >
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
          )} */}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

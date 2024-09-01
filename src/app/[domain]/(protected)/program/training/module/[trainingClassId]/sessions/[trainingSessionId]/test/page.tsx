"use client";
import IconClose from "@/components/icons/IconClose";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Bg1 from "../../../../../../../../../../../public/images/bg-1.png";
import Logo from "../../../../../../../../../../../public/images/logo.png";
import { useDomainHelper } from "@/hooks/useDomainHelper";

interface QuestionResult {
  id: number;
  isCorrect: boolean;
  options?: string[]; // Optional if it's not always present
}

const dummyData = [
  {
    id: 1,
    question: "What is your favorite color?",
    options: ["Red", "Blue", "Green"],
    correctAnswer: "Blue",
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
  {
    id: 4,
    question: "What is your favorite season?",
    options: ["Spring", "Summer", "Autumn", "Winter"],
    correctAnswer: "Autumn",
  },
  {
    id: 5,
    question: "What type of cuisine do you prefer?",
    options: ["Italian", "Chinese", "Mexican"],
    correctAnswer: "Italian",
  },
  {
    id: 6,
    question: "What is your favorite sport?",
    options: ["Football", "Basketball", "Tennis"],
    correctAnswer: "Football",
  },
  {
    id: 7,
    question: "What is your favorite book genre?",
    options: ["Fiction", "Non-fiction", "Fantasy", "Biography"],
    correctAnswer: "Fantasy",
  },
  {
    id: 8,
    question: "What is your favorite drink?",
    options: ["Coffee", "Tea", "Juice"],
    correctAnswer: "Coffee",
  },
  {
    id: 9,
    question: "What is your preferred mode of transport?",
    options: ["Car", "Bike", "Public transport"],
    correctAnswer: "Bike",
  },
  {
    id: 10,
    question: "What is your favorite time of day?",
    options: ["Morning", "Afternoon", "Evening", "Night"],
    correctAnswer: "Evening",
  },
  // Essay Questions
  {
    id: 11,
    question: "Describe your most memorable experience.",
    type: "essay",
  },
  {
    id: 12,
    question:
      "What are your long-term goals and how do you plan to achieve them?",
    type: "essay",
  },
  {
    id: 13,
    question: "Explain the importance of teamwork in a professional setting.",
    type: "essay",
  },
  {
    id: 14,
    question: "Discuss the impact of technology on modern society.",
    type: "essay",
  },
  {
    id: 15,
    question:
      "How do you handle stress and pressure in challenging situations?",
    type: "essay",
  },
];

const dummyDemoData = [
  {
    id: 1,
    question: "Which pump type is not categorized as rotary pumps?",
    options: ["Gear", "Diaphragm", "Lobe", "Screw"],
    correctAnswer: "Screw",
  },
  {
    id: 2,
    question:
      "Which pump type is more affected by operating pressure, in regards of its efficiency?",
    options: ["Screw", "Piston", "Centrifugal", "Gear"],
    correctAnswer: "Centrifugal",
    image: Bg1,
  },
  {
    id: 3,
    question: "Which pump type is capable to create suction lift?",
    options: ["Centrifugal", "Gear", "Propeller", "Turbine"],
    correctAnswer: "Gear",
  },
  {
    id: 4,
    question:
      "Which Pump Type is better for services that require high flow stability?",
    options: ["Centrifugal", "Positive Displacement"],
    correctAnswer: "Positive Displacement",
  },
  {
    id: 5,
    question:
      "Which Pump Type is better for services that have high viscosity?",
    options: ["Centrifugal", "Positive Displacement"],
    correctAnswer: "Positive Displacement",
  },
  {
    id: 6,
    question: "Which Pump Type is better for basic (general) operation?",
    options: ["Centrifugal", "Positive Displacement"],
    correctAnswer: "Centrifugal",
  },
  {
    id: 7,
    question:
      "Which of following parameter is less important in selecting pump type?",
    options: [
      "Flow Regulation",
      "Liquid Viscosity",
      "Country of Origin",
      "Energy Consumption",
    ],
    correctAnswer: "Country of Origin",
  },
  {
    id: 8,
    question:
      "Which of following pump driver is less used for centrifugal pump?",
    options: ["Electric Motor", "Turbine", "Diesel Engine", "Instrument Air"],
    correctAnswer: "Instrument Air",
  },
  {
    id: 9,
    question:
      "Which of following parameter is less important in considering whether to use API 610 pump or not?",
    options: [
      "Discharge Pressure",
      "Baseplate Footprint",
      "Rotative Speed",
      "Pumping Temperature",
    ],
    correctAnswer: "Baseplate Footprint",
  },
  {
    id: 10,
    question: "Which operating region has is bigger range?",
    options: ["Allowable Operating Region", "Preferred Operating Region"],
    correctAnswer: "Allowable Operating Region",
  },
  // Essay Questions
  {
    id: 11,
    question:
      "What is the device that mostly applied as accessory to reciprocating pump?",
    type: "essay",
  },
  {
    id: 12,
    question:
      "What is the lowest material class of reciprocating pump according to API 674?",
    type: "essay",
  },
  {
    id: 13,
    question:
      "What international standard is to be referred to in designing Gearbox?",
    type: "essay",
  },
  {
    id: 14,
    question:
      "Which type of reciprocating pump is best suitable for pumping toxic and hazardous fluid?",
    type: "essay",
  },
  {
    id: 15,
    question:
      "Which rotary pump type is typically longer than other rotary pump types?",
    type: "essay",
  },
];

export default function Test() {
  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();

  const dataToUse = partBeforeDot === "demo" ? dummyDemoData : dummyData;

  const dynamicSchema = z.object(
    dataToUse.reduce((schema, item) => {
      if (item.options) {
        // Multiple-choice question
        schema[`question-${item.id}`] = z
          .string()
          .min(1, "Please select an option.");
      } else {
        // Essay question
        schema[`question-${item.id}`] = z
          .string()
          .min(1, "Please provide a detailed answer.");
      }
      return schema;
    }, {} as Record<string, z.ZodTypeAny>)
  );
  const router = useRouter();

  const form = useForm<z.infer<typeof dynamicSchema>>({
    resolver: zodResolver(dynamicSchema),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<z.infer<
    typeof dynamicSchema
  > | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);
  const onSubmit = async (data: z.infer<typeof dynamicSchema>) => {
    setIsLoading(true);

    const results = dataToUse.map((item) => {
      if (item.options) {
        return {
          id: item.id,
          isCorrect: data[`question-${item.id}`] === item.correctAnswer,
        };
      } else {
        // Implement your essay evaluation logic
        const isCorrect = Math.random() >= 0.5; // Replace with actual logic
        return {
          id: item.id,
          isCorrect,
        };
      }
    });

    setTimeout(() => {
      setSubmittedData(results);
      setIsSubmitted(true); // Set submitted state to true
      setIsLoading(false);
      setCurrentPage(1); // Reset to the first page after submission
      setIsDialogOpen(false);

      // Save to localStorage
      localStorage.setItem("quizResults", JSON.stringify(results));
      localStorage.setItem("isSubmitted", JSON.stringify(true));
    }, 2000); // Simulate an API call delay with setTimeout
  };

  useEffect(() => {
    const count = dataToUse.reduce((acc, item) => {
      return form.getValues()[`question-${item.id}`] ? acc + 1 : acc;
    }, 0);
    setAnsweredCount(count);
  }, [form.watch()]);

  const handleOpenDialog = () => {
    if (answeredCount === dataToUse.length) {
      setIsDialogOpen(true);
    }
  };

  const [currentPage, setCurrentPage] = useState(1); // 1 for multiple-choice, 2 for essay

  return (
    <>
      <div className="overflow-hidden px-4 lg:h-16 fixed  hidden  top-0 z-[10] bg-white border  border-b-[#E4E6E8]  lg:flex justify-between max-lg:flex-col items-center w-full">
        <div className="flex items-center gap-8">
          <Button
            onClick={() => router.back()}
            className="h-10 w-10 rounded-m flex items-center justify-center bg-[#E4E6E8]"
          >
            <IconClose />
          </Button>
          <Image
            src={Logo.src}
            height={27}
            width={149}
            alt="Logo"
            className="lg:block hidden"
          />
          <div className=" h-16 border-[#E4E6E8] border-l flex px-4 justify-center items-center text-base font-mono font-bold ">
            {partBeforeDot === "demo"
              ? "Pump Operation, Maintenance, and Troubleshooting"
              : " Test Marine Transport of Oil and Gas"}
          </div>
        </div>
        <div className="flex gap-6 max-lg:w-full  h-16 justify-center items-center px-4">
          <div className="flex flex-col border-[#E4E6E8] border-x h-16 px-4 justify-center lg:min-w-[182px] ">
            <div className="flex justify-between max-lg:w-full">
              <div>Progress</div>
              <div>
                {answeredCount}/{dataToUse.length}
              </div>
            </div>
            <Progress
              className="bg-success-50 h-1 w-full"
              value={(answeredCount / dataToUse.length) * 100}
            />
          </div>
          <div>
            {currentPage === 1 ? (
              <Button
                onClick={() => setCurrentPage(2)} // Navigate to essay page
                className="h-10 rounded-m px-10 flex justify-center text-sm font-bold text-neutral-400 items-center bg-neutral-700"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleOpenDialog}
                disabled={answeredCount < dataToUse.length}
                className="h-10 rounded-m px-10 flex justify-center text-sm font-bold text-neutral-400 b items-center bg-neutral-700"
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="h-16 w-full px-4 fixed flex justify-between items-center top-0 bg-white border  border-b-[#E4E6E8]">
        <div className="w-1/2 flex gap-7">
          <Button
            onClick={() => router.back()}
            className="h-10 w-10 rounded-m flex items-center justify-center bg-[#E4E6E8]"
          >
            <IconClose />
          </Button>

          <Image
            src={Logo.src}
            height={27}
            width={149}
            className="object-contain"
            alt="Logo"
          />
        </div>
        <div className="border-[#E4E6E8] border-l flex items-center h-16 pl-4">
          {currentPage === 1 ? (
            <Button
              onClick={() => setCurrentPage(2)} // Navigate to essay page
              className="h-10 rounded-m px-10 flex justify-center text-sm font-bold text-white items-center bg-secondary-500"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleOpenDialog}
              disabled={answeredCount < dataToUse.length}
              className="h-10 rounded-m px-10 flex justify-center text-sm font-bold text-white b items-center bg-secondary-500"
            >
              Submit
            </Button>
          )}
        </div>
      </div>
      <div className="h-16 lg:hidden fixed top-16 bg-white flex text-neutral-800 font-bold justify-center items-center font-mono w-full">
        {partBeforeDot === "demo"
          ? "Pump Operation, Maintenance, and Troubleshooting"
          : " Test Marine Transport of Oil and Gas"}{" "}
      </div>
      <div className="h-16 px-5 lg:hidden fixed bottom-0 bg-white flex text-neutral-800 font-bold justify-center items-center font-mono w-full">
        <div className="flex flex-col w-full  h-16 px-4 justify-center lg:min-w-[182px] ">
          <div className="flex justify-between max-lg:w-full">
            <div>Progress</div>
            <div>
              {answeredCount}/{dataToUse.length}
            </div>
          </div>
          <Progress
            className="bg-success-50 h-1 w-full"
            value={(answeredCount / dataToUse.length) * 100}
          />
        </div>
      </div>
      <div className="bg-neutral-100 overflow-hidden pt-16 min-h-[calc(100vh-64px)]  w-full p-10 max-lg:p-5">
        <div className="flex p-6 max-lg:px-0 max-lg:py-32 flex-col  max-w-[880px] mx-auto rounded-m">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              {currentPage === 1 && (
                <>
                  {dataToUse
                    .filter((item) => item.options)
                    .map((item, index) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name={`question-${item.id}`}
                        render={({ field }) => {
                          const isSubmittedAnswer = submittedData?.find(
                            (result: { id: number }) => result.id === item.id
                          );

                          const isCorrect = isSubmittedAnswer?.isCorrect;
                          const selectedAnswer = field.value;

                          return (
                            <FormItem
                              className={`space-y-6 bg-white border rounded-m`}
                            >
                              <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className="font-bold px-6 text-primary-500 mb-4">
                                  Question {index + 1}
                                </FormLabel>
                                {item.image && (
                                  <div className="pb-5">
                                    <img
                                      src={item.image.src}
                                      alt={`Question ${index + 1} image`}
                                      className="w-full object-cover rounded-md"
                                    />
                                  </div>
                                )}
                                <FormLabel className="font-mono px-6 text-base font-bold">
                                  {item.question}
                                </FormLabel>
                              </div>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1 px-6 pb-6"
                                  disabled={isSubmitted}
                                >
                                  {item?.options?.map((option, optionIndex) => {
                                    const isOptionSelected =
                                      field.value === option;
                                    const isOptionCorrect =
                                      item.correctAnswer === option;
                                    const isOptionWrong =
                                      isSubmitted &&
                                      !isOptionCorrect &&
                                      isOptionSelected;

                                    return (
                                      <FormItem
                                        key={optionIndex}
                                        className="flex items-center space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <RadioGroupItem
                                            className={cn(
                                              "data-[state=checked]:bg-green-500 data-[state=checked]:text-white",
                                              isSubmitted &&
                                                isOptionCorrect &&
                                                !isOptionSelected
                                                ? "bg-green-300"
                                                : isSubmitted && isOptionWrong
                                                ? "data-[state=checked]:bg-primary-500"
                                                : ""
                                            )}
                                            value={option}
                                            disabled={isSubmitted}
                                          />
                                        </FormControl>
                                        <FormLabel
                                          className={cn(
                                            "font-normal",
                                            isSubmitted &&
                                              isOptionCorrect &&
                                              !isOptionSelected
                                              ? "text-green-500"
                                              : "",
                                            isSubmitted && isOptionWrong
                                              ? "text-[#F04B35]"
                                              : ""
                                          )}
                                        >
                                          {option}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  })}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                </>
              )}

              {currentPage === 2 && (
                <>
                  {dataToUse
                    .filter((item) => !item.options)
                    .map((item, index) => {
                      const isCorrect = isSubmitted
                        ? submittedData?.find(
                            (result: { id: number }) => result.id === item.id
                          )?.isCorrect
                        : undefined;

                      return (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name={`question-${item.id}`}
                          render={({ field }) => (
                            <FormItem
                              className={`space-y-6 bg-white border rounded-m `}
                            >
                              <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className="font-bold px-6 text-primary-500 mb-4">
                                  Essay Question {index + 1}
                                </FormLabel>
                                <FormLabel className="font-mono px-6 text-base font-bold">
                                  {item.question}
                                </FormLabel>
                              </div>
                              <FormControl>
                                <div className="p-5 pt-0">
                                  <Textarea
                                    {...field}
                                    disabled={isSubmitted}
                                    placeholder="Enter long text here"
                                    className={cn(
                                      "w-full p-2 border rounded-md",

                                      isSubmitted
                                        ? isCorrect
                                          ? "border-success-500 text-success-400"
                                          : "border-primary-500 text-primary-500"
                                        : ""
                                    )}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      );
                    })}
                  <div className="flex justify-start space-x-4">
                    <Button
                      onClick={() => setCurrentPage(1)}
                      className="h-10 rounded-m bg-neutral-700 text-sm font-bold text-white"
                    >
                      Previous
                    </Button>
                  </div>
                </>
              )}
            </form>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="bg-white">
                <DialogHeader className="text-[28px] font-bold">
                  Submit
                </DialogHeader>
                <DialogDescription className="text-base">
                  Are you sure to submit the answer of the test?{" "}
                </DialogDescription>

                {isLoading && (
                  <div className="flex justify-center items-center">
                    <Loader2 className="mr-2 size-12 animate-spin" />
                  </div>
                )}

                <div className="flex gap-4 w-full">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    onClick={form.handleSubmit(onSubmit)}
                    className="mt-4 h-[56px] bg-secondary-500 w-full text-white"
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setIsDialogOpen(false)}
                    className="mt-4 h-[56px] bg-[#F04B35] w-full text-white"
                  >
                    Cancel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </Form>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import IconChevron from "./icons/IconChevron";
import { cn } from "@/lib/utils";
import { restTraining } from "@/rest/training";
import { Button } from "./ui/button";
import { useDomainHelper } from "@/hooks/useDomainHelper";
import { useRouter } from "next/navigation";

interface SectionNavigationProps {
  currentSection: number;
  sections: { title: string }[];
  goToPrevSection: () => void;
  goToNextSection: () => void;
  params: {
    trainingClassId: string;

    trainingSessionId: string;
  };
}

export default function SectionNavigation({
  currentSection,
  sections,
  goToPrevSection,
  goToNextSection,
  params,
}: SectionNavigationProps) {
  const prevSection =
    currentSection > 1 ? sections[currentSection - 2].title : null;
  const nextSection =
    currentSection < sections.length ? sections[currentSection].title : null;

  const isLastSection = sections.length > 1 && currentSection === sections.length;

  const [isLoading, setIsLoading] = useState(false);

  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();

  const router = useRouter();

  const finishSession = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await restTraining.postTrainingSessionFinish({
        token,
        domain: partBeforeDot,
        trainingClassId: params.trainingClassId,
        trainingSessionId: params.trainingSessionId,
      });

      if (response.data?.success) {
        router.push(`/program/training/module/${params.trainingClassId}`);
      } else {
        console.error("Failed to finish the training session");
      }
    } catch (error) {
      console.error("Error finishing the training session:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "p-6 font-mono bg-white rounded-m flex max-xl:grid max-lg:grid-cols-2 max-lg:gap-5 justify-between items-start",
        currentSection === 1 && "justify-end"
      )}
    >
      {prevSection && (
        <div className="flex items-end gap-6">
          <button
            onClick={goToPrevSection}
            className="h-10 w-10 hover:opacity-70 transition-all duration-300 cursor-pointer flex justify-center items-center rounded-m border-[#E4E6E8] bg-[#E4E6E8]"
          >
            <IconChevron dir="left" />
          </button>
          <div className="flex flex-col justify-end gap-0.5">
            <div className="text-sm text-right max-lg:text-left">Previous</div>
            <div
              className="text-[20px] max-lg:text-xs leading-6 font-bold"
              dangerouslySetInnerHTML={{ __html: prevSection }}
            ></div>
          </div>
        </div>
      )}
      {nextSection && !isLastSection && (
        <div className="flex items-end gap-6">
          <div className="flex flex-col justify-end gap-0.5">
            <div className="text-sm text-right">Next</div>
            <div
              className="text-[20px] leading-6 font-bold"
              dangerouslySetInnerHTML={{ __html: nextSection }}
            ></div>
          </div>
          <button
            onClick={goToNextSection}
            className="h-10 w-10 hover:opacity-70 transition-all duration-300 cursor-pointer flex justify-center items-center rounded-m border-[#E4E6E8] bg-[#E4E6E8]"
          >
            <IconChevron dir="right" />
          </button>
        </div>
      )}

      {isLastSection && (
        <Button
          onClick={finishSession}
          disabled={isLoading}
          loading={isLoading}
          className={cn(
            "flex items-center h-[56px] gap-2 p-2 justify-center !w-auto text-primary-500 bg-secondary-500",
            "hover:bg-secondary-600 text-white rounded"
          )}
        >
          Finish Module
        </Button>
      )}
    </div>
  );
}

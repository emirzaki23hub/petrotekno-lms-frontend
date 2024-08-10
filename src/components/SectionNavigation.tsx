import React from "react";
import IconChevron from "./icons/IconChevron";
import { cn } from "@/lib/utils";

interface SectionNavigationProps {
  currentSection: number;
  totalSections: number;
  goToPrevSection: () => void;
  goToNextSection: () => void;
}

export default function SectionNavigation({
  currentSection,
  totalSections,
  goToPrevSection,
  goToNextSection,
}: SectionNavigationProps) {
  const prevSection =
    currentSection > 1 ? `Section ${currentSection - 1}` : "Introduction";
  const nextSection =
    currentSection < totalSections ? `Section ${currentSection + 1}` : "Quiz";

  return (
    <div
      className={cn(
        "p-6 font-mono bg-white rounded-m flex justify-between items-start",
        currentSection === 1 && "justify-end"
      )}
    >
      {currentSection > 1 && (
        <div className="flex items-end gap-6">
          <button
            onClick={goToPrevSection}
            className="h-10 w-10 hover:opacity-70 transition-all duration-300 cursor-pointer flex justify-center items-center rounded-m border-[#E4E6E8] bg-[#E4E6E8]"
          >
            <IconChevron dir="left" />
          </button>
          <div className="flex flex-col justify-end gap-0.5">
            <div className="text-sm text-right">Previous</div>
            <div className="text-[20px] leading-6 font-bold">{prevSection}</div>
          </div>
        </div>
      )}
      <div className="flex items-end gap-6">
        <div className="flex flex-col justify-end gap-0.5">
          <div className="text-sm text-right">Next</div>
          <div className="text-[20px] leading-6 font-bold">{nextSection}</div>
        </div>
        <button
          onClick={goToNextSection}
          className="h-10 w-10 hover:opacity-70 transition-all duration-300 cursor-pointer flex justify-center items-center rounded-m border-[#E4E6E8] bg-[#E4E6E8]"
        >
          <IconChevron dir="right" />
        </button>
      </div>
    </div>
  );
}

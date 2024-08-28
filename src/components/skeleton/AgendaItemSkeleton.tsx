import React from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface AgendaItemSkeletonProps {
  className?: string;
}

const AgendaItemSkeleton: React.FC<AgendaItemSkeletonProps> = ({
  className,
}) => (
  <div
    className={cn(
      "bg-warning-50 border border-warning-400 flex gap-4 rounded-m p-4 animate-pulse",
      className
    )}
  >
    <div className="border-warning-400 border-l-4"></div>
    <div className="flex flex-col gap-1 items-start">
      <Skeleton className="h-4 w-24 rounded-sm bg-neutral-300" />
      <Skeleton className="h-3 w-16 rounded-sm mt-2 bg-neutral-200" />
    </div>
  </div>
);

export default AgendaItemSkeleton;

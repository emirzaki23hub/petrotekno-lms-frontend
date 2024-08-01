import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  sectionLeft?: React.ReactNode;
  sectionRight?: React.ReactNode;
  error?: React.ReactNode;
  classNames?: {
    sectionRight?: string;
  };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, sectionLeft, sectionRight, error, classNames, ...props },
    ref
  ) => {
    return (
      <div>
        <div className="relative flex">
          {sectionLeft && (
            <div
              className={cn(
                "pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-primary",
                props.disabled && "text-muted"
              )}
            >
              {sectionLeft}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-[46px] w-full rounded-m  border border-muted bg-white px-6 py-2 ring-offset-white placeholder:text-[#BFC0CB]  focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:text-muted",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              !!sectionLeft && "pl-14",
              !!sectionRight && "pr-14",
              error && "border-danger-500 focus-visible:border-danger",
              className
            )}
            ref={ref}
            {...props}
          />
          {sectionRight && (
            <div
              className={cn(
                "absolute right-6 top-1/2 z-10 -translate-y-1/2 text-primary",
                classNames?.sectionRight,
                props.disabled && "text-muted"
              )}
            >
              {sectionRight}
            </div>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-danger-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };

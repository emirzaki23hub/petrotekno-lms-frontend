"use client";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { SideNav } from "./side-nav";
import { NavItems } from "../constant/side-nav";
import { BsArrowLeftShort } from "react-icons/bs";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  //   const { isOpen, toggle } = useSidebar();
  //   const [status, setStatus] = useState(false);

  //   const handleToggle = () => {
  //     setStatus(true);
  //     toggle();
  //     setTimeout(() => setStatus(false), 500);
  //   };
  return (
    <nav
      className={cn(
        ` hidden h-[calc(100vh-64px)] sticky top-[64px] md:flex flex-col justify-between border-r p-4 `,
        "min-w-[233px]",
        className
      )}
    >
      <SideNav
        className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
        items={NavItems}
      />
    </nav>
  );
}

import Sidebar from "@/components/sidebar";
import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: LayoutProps) {
  return (
    <>
      <div className="h-[64px] fixed top-0 z-[10] bg-white border max-lg:hidden border-b-[#E4E6E8] p-4 flex justify-between items-center w-full">
        <Image src={"/images/logo.png"} height={27} width={149} alt="Logo" />
        <div className="flex gap-6">
          <div className="h-10 w-10 flex justify-center rounded-m items-center bg-[#E4E6E8]">
            <Image
              src={"/icons/icon-bell.svg"}
              height={24}
              width={24}
              alt="Logo"
            />
          </div>
          <div className="h-10 w-10 flex justify-center rounded-m items-center bg-secondary-200">
            <Image
              src={"/icons/icon-user.svg"}
              height={24}
              width={24}
              alt="Logo"
            />
          </div>
        </div>
      </div>
      <div
        className={cn(
          "px-5 md:!hidden h-[64px] bg-white w-full z-10 flex items-center justify-between fixed top-0"
        )}
      >
        <MobileSidebar />
        <div className="absolute left-1/2 -translate-x-[60%]">
          <Image
            src={"/icons/icon-logo.svg"}
            height={40}
            width={182.24}
            alt="Logo"
          />
        </div>
        <div className="flex gap-1">
          <div className="h-full w-full p-2 flex justify-center rounded-m items-center bg-[#E4E6E8]">
            <Image
              src={"/icons/icon-bell.svg"}
              height={16}
              width={16}
              alt="Logo"
            />
          </div>
          <div className="h-full w-full p-2 flex justify-center rounded-m items-center bg-secondary-200">
            <Image
              src={"/icons/icon-user.svg"}
              height={16}
              width={16}
              alt="Logo"
            />
          </div>
        </div>
      </div>
      <main className="relative flex min-h-screen pt-16">
        <Sidebar />
        <div className="bg-neutral-100 overflow-hidden  min-h-[calc(100vh-64px)] w-full p-10 max-lg:p-5">
          {children}
        </div>
      </main>
    </>
  );
}

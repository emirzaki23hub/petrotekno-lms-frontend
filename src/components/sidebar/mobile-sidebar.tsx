"use client";
import { useState, useEffect } from "react";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavItems } from "../constant/side-nav";
import { SideNav } from "./side-nav";
import Image from "next/image";
import Logo from "../../../public/icons/icon-logo.svg";
// import IconBell from "../../public/icons/icon-bell.svg";
// import IconUser from "../../public/icons/icon-user.svg";

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div className="flex ">
            <div>
              <MenuIcon />
            </div>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-white">
          <div className="px-1 py-6 pt-10">
            <div className="pb-5">
              <Image src={Logo.src} height={40} width={182.24} alt="Logo" />
            </div>
            <SideNav items={NavItems} setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

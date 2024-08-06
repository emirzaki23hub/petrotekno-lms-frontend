"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { NavItem } from "@/types";
import IconLogout from "../icons/IconLogout";

interface SideNavProps {
  items: NavItem[];
  setOpen?: (open: boolean) => void;
  className?: string;
}

export function SideNav({ items, setOpen, className }: SideNavProps) {
  const path = usePathname();
  const [openItem, setOpenItem] = useState("");
  const [lastOpenItem, setLastOpenItem] = useState("");

  const toggleItem = (title: string) => {
    setOpenItem((prev) => (prev === title ? "" : title));
  };

  return (
    <>
      <nav className="space-y-2">
        {items.map((item) => (
          <div key={item.title} className="relative">
            <Link
              href={item.href}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "group relative flex h-12 justify-start transition-all hover:bg-primary-100 hover:text-primary-500 duration-300 ea font-bold text-neutral-400 ",

                path.startsWith(item.href) && "bg-primary-100 text-primary-500"
              )}
            >
              <item.icon className={cn("h-5 w-5", item.color)} />
              <span className={cn("absolute left-12 text-base duration-200")}>
                {item.title}
              </span>
              {/* {item.children && item.children.length > 0 && (
              <ChevronDownIcon
                onClick={(e) => {
                  e.preventDefault();
                  toggleItem(item.title);
                }}
                className={cn(
                  "h-5 w-5 ml-auto",
                  openItem === item.title && "rotate-180"
                )}
              />
            )} */}
            </Link>
            {/* {item.children &&
              item.children.length > 0 &&
              openItem === item.title && (
                <div className="ml-8 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.title}
                      href={child.href}
                      onClick={() => {
                        if (setOpen) setOpen(false);
                      }}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "group relative flex h-10 justify-start",
                        path === child.href &&
                          "bg-muted font-bold hover:bg-muted"
                      )}
                    >
                      <child.icon className={cn("h-4 w-4", child.color)} />
                      <span className="absolute left-10 text-sm">
                        {child.title}
                      </span>
                    </Link>
                  ))}
                </div>
              )} */}
          </div>
        ))}
      </nav>
      <Button
        onClick={() => {
          localStorage.removeItem("authToken"); // Remove the token from localStorage
          window.location.replace("/");
        }}
        className="text-base w-full transition-all duration-300 max-lg:mt-2 ease-in-out hover:bg-primary-100 hover:text-primary-500 flex justify-start gap-3 text-neutral-400 font-bold"
      >
        <IconLogout />
        Log Out
      </Button>
    </>
  );
}

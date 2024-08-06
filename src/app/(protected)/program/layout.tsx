"use client";
import IconSearch from "@/components/icons/IconSearch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Training", href: "/program" },
    { name: "E-Learning", href: "/program/elearning" },
    { name: "Webinar", href: "/program/webinar" },
    { name: "Certification", href: "/program/certification" },
  ];

  const shouldRenderNav = !pathname.startsWith("/program/elearning/");

  return (
    <div className="flex flex-col h-full gap-6 overflow-hidden">
      {shouldRenderNav && (
        <>
          <div className="flex w-full max-lg:flex-col gap-2 justify-between items-center">
            <h1 className="text-[34px] font-bold">Program</h1>
            <Input
              className="lg:w-[400px] w-full"
              sectionLeft={<IconSearch className="text-neutral-400" />}
              placeholder="Looking for something?"
            />
          </div>
          <div className="flex font-mono max-lg:pb-3 border-[#E4E6E8] border-b overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                className={cn(
                  "p-4 text-base text-neutral-700 whitespace-nowrap border-b-4 border-transparent transition-transform duration-300 ease-linear",
                  pathname === item.href &&
                    "border-primary-500 font-bold text-primary-500"
                )}
                href={item.href}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </>
      )}

      {children}
    </div>
  );
}

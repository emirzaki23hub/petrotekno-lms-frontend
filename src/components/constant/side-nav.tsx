import { type NavItem } from "@/types";
import IconHome from "../icons/IconHome";
import IconProgram from "../icons/IconProgram";
import IconPerfomance from "../icons/IconPerfomance";

export const NavItems: NavItem[] = [
  {
    title: "Home",
    icon: IconHome,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    title: "Program",
    icon: IconProgram,
    href: "/program",
    color: "text-orange-500",
    isChidren: true,
    // children: [
    //   {
    //     title: "Example-01",
    //     icon: BookOpenCheck,
    //     color: "text-red-500",
    //     href: "/example/employees",
    //   },
    //   {
    //     title: "Example-02",
    //     icon: BookOpenCheck,
    //     color: "text-red-500",
    //     href: "/example/example-02",
    //   },
    //   {
    //     title: "Example-03",
    //     icon: BookOpenCheck,
    //     color: "text-red-500",
    //     href: "/example/example-03",
    //   },
    // ],
  },
  {
    title: "Perfomance",
    icon: IconPerfomance,
    href: "/perfomance",
    color: "text-sky-500",
  },
];

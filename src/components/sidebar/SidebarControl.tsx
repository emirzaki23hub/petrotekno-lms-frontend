import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const SidebarControl = ({ children }: Props) => {
  const pathname = usePathname();

  // Define the pattern you want to match against
  const matchPattern = /^\/program\/training\/[^\/]+\/[^\/]+\/test$/;

  // Check if the current pathname matches the pattern
  if (matchPattern.test(pathname)) {
    return null;
  }

  return children;
};

export default SidebarControl;

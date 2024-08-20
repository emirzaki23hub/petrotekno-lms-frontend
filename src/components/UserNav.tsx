import Image from "next/image";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import IconUser from "../../public/icons/icon-user.svg";
import { usePathname, useRouter } from "next/navigation";
import { useDomainHelper } from "@/hooks/useDomainHelper";
import { useEffect, useState } from "react";
import { restAuth } from "@/rest/auth";

interface User {
  name: string;
  email: string;
  // Add any other fields you expect in the user object
}

export function UserNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        const response = await restAuth.getUserInfo(token, partBeforeDot);

        if (response?.data?.success) {
          setUser(response.data.data as unknown as User);
        } else {
          console.log("Failed to fetch user info");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, [router, partBeforeDot]);

  const handleLogout = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      if (token) {
        await restAuth.postLogout(token, partBeforeDot);

        localStorage.removeItem("authToken");

        window.location.replace("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 max-lg:h-8 max-lg:min-w-8 lg:min-w-10 flex justify-center rounded-m items-center bg-secondary-200 p-0"
          disabled={loading} // Disable button during loading
        >
          <Image src={IconUser} height={16} width={16} alt="User" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={20}
        className="w-56 bg-white"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name || "Guest"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || "No email available"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./sidebar/mobile-sidebar";
import HeaderControl from "./HeaderControl";
import Logo from "../../public/images/logo.png";
import IconBell from "../../public/icons/icon-bell.svg";
import { UserNav } from "./UserNav";
import { useDomainHelper } from "@/hooks/useDomainHelper";
import { useEffect, useState } from "react";
import { restAuth } from "@/rest/auth";
import { Company } from "@/types";
import { ChangePasswordModal } from "./ChangePasswordModal"; // Import the modal

const Header = () => {
  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();

  const [user, setUser] = useState<Company | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const response = await restAuth.getCompany(partBeforeDot);
        const userData = response?.data?.data;

        if (userData && typeof userData === "object" && "logo_url" in userData) {
          setUser(userData as unknown as Company);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, [partBeforeDot]);

  return (
    <HeaderControl>
      {/* Desktop Header */}
      <div className="h-[64px] fixed top-0 z-[20] bg-white border max-lg:hidden border-b-[#E4E6E8] p-4 flex justify-between items-center w-full">
        <Image src={Logo} height={27} width={149} alt="Logo" />

        {user?.logo_url && (
          <div className="h-[50px] w-auto relative">
            <Image
              src={user.logo_url}
              height={50}
              width={100}
              className="h-full w-auto object-contain"
              alt="Company Logo"
            />
          </div>
        )}

        <div className="flex gap-6">
          <div className="h-10 w-10 flex justify-center rounded-md items-center bg-[#E4E6E8]">
            <Image src={IconBell} height={24} width={24} alt="Notification" />
          </div>
          {/* We pass the state setter or a trigger function to UserNav */}
          <UserNav onOpenChangePassword={() => setIsPasswordModalOpen(true)} />
        </div>
      </div>

      {/* Mobile Header */}
      <div className={cn("px-5 md:hidden h-[64px] bg-white w-full z-20 flex items-center justify-between fixed top-0")}>
        <MobileSidebar />
        <div className="absolute left-1/2 -translate-x-[60%]">
          <Image src={Logo} height={40} width={182.24} alt="Logo" />
        </div>
        <div className="flex gap-1">
          <div className="h-full w-full p-2 flex justify-center rounded-md items-center bg-[#E4E6E8]">
            <Image src={IconBell} height={16} width={16} alt="Notification" />
          </div>
          <UserNav onOpenChangePassword={() => setIsPasswordModalOpen(true)} />
        </div>
      </div>

      {/* The Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
        domain={partBeforeDot}
      />
    </HeaderControl>
  );
};

export default Header;
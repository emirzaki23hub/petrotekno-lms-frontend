import Image from "next/image";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./sidebar/mobile-sidebar";
import HeaderControl from "./HeaderControl";
import Logo from "../../public/images/logo.png";
import IconBell from "../../public/icons/icon-bell.svg";
import IconUser from "../../public/icons/icon-user.svg";

const Header = () => {
  return (
    <HeaderControl>
      <div className="h-[64px] fixed top-0 z-[10] bg-white border max-lg:hidden border-b-[#E4E6E8] p-4 flex justify-between items-center w-full">
        <Image src={Logo} height={27} width={149} alt="Logo" />
        <div className="flex gap-6">
          <div className="h-10 w-10 flex justify-center rounded-m items-center bg-[#E4E6E8]">
            <Image src={IconBell} height={24} width={24} alt="Notification" />
          </div>
          <div className="h-10 w-10 flex justify-center rounded-m items-center bg-secondary-200">
            <Image src={IconUser} height={24} width={24} alt="User" />
          </div>
        </div>
      </div>
      <div
        className={cn(
          "px-5 md:!hidden h-[64px] bg-white w-full z-20 flex items-center justify-between fixed top-0"
        )}
      >
        <MobileSidebar />
        <div className="absolute left-1/2 -translate-x-[60%]">
          <Image src={Logo} height={40} width={182.24} alt="Logo" />
        </div>
        <div className="flex gap-1">
          <div className="h-full w-full p-2 flex justify-center rounded-m items-center bg-[#E4E6E8]">
            <Image src={IconBell} height={16} width={16} alt="Notification" />
          </div>
          <div className="h-full w-full p-2 flex justify-center rounded-m items-center bg-secondary-200">
            <Image src={IconUser} height={16} width={16} alt="User" />
          </div>
        </div>
      </div>
    </HeaderControl>
  );
};

export default Header;

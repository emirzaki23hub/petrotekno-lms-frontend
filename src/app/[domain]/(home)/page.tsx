import Image from "next/image";
import FormInput from "./Form";
import Logo from "../../../../public/images/logo.png";

export default function Home() {
  return (
    <main className="flex max-lg:flex-col h-screen  gap-12 max-lg:gap-5 max-lg:overflow-y-auto  justify-start p-20 max-lg:p-5 lg:items-start">
      <div className="bg-white lg:w-[433px] max-lg:order-2 p-8 gap-8  rounded-xl h-full flex flex-col justify-center ">
        <div className="flex justify-center w-full">
          <Image src={Logo} height={27} width={149} alt="Logo" />
        </div>
        <div className="text-[28px] w-full text-center leading-8 font-bold">
          Here there! let’s get started
        </div>
        <FormInput />
        {/* <div className="w-full text-center text-base">
          Don’t have account?{" "}
          <Link className="text-primary-500 font-bold" href={"/register"}>
            Create Account
          </Link>
        </div> */}
      </div>
      <div className="flex justify-center items-center lg:w-[553px] h-full">
        <h2 className="text-white text-[40px] max-lg:text-2xl  text-center max-lg:order-1 lg:text-justify lg:leading-[44px] font-bold">
          International Leading Provider of Operations, Maintenance and
          Construction Skills Training
        </h2>
      </div>
    </main>
  );
}

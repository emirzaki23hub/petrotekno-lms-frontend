"use client";
import { useEffect } from "react";
import Sidebar from "@/components/sidebar";

import React, { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useDomainHelper } from "@/hooks/useDomainHelper";
import { restAuth } from "@/rest/auth";

interface LayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: LayoutProps) {
  const router = useRouter();

  const pathname = usePathname();

  // Define the pattern you want to match against
  const matchPattern = /^\/program\/training\/[^\/]+\/[^\/]+\/test$/;

  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        const response = await restAuth.getUserInfo(token, partBeforeDot);

        if (response?.data?.success === false) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
        router.push("/");
      }
    };

    fetchUserInfo();
  }, [router]);

  return (
    <>
      <Header />
      {matchPattern.test(pathname) ? (
        <main className="relative h-full min-h-screen">{children}</main>
      ) : (
        <main className="relative flex min-h-screen pt-16">
          <Sidebar />
          <div className="bg-neutral-100 overflow-hidden  min-h-[calc(100vh-64px)] w-full p-10 max-lg:p-5">
            {children}
          </div>
        </main>
      )}
    </>
  );
}

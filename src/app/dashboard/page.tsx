"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const page = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div>Dashboard</div>
      <Button onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>
    </div>
  );
};

export default page;

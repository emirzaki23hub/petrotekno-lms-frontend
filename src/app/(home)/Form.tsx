"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const FormInput = () => {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setShowError(false); // Reset error visibility before making the request

    setTimeout(async () => {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: values?.email,
          password: values?.password,
          callbackUrl: "/dashboard",
        });
        console.log(res);
        if (res?.status === 401) {
          setShowError(true);
          setError("Invalid username or password");
        }

        if (res?.ok) {
          window.location.replace("/dashboard");
        }
      } catch (error) {
        setShowError(true);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">Email</FormLabel>
              <FormControl>
                <Input
                  className="h-[56px] placeholder:text-[#919BA2] text-base"
                  placeholder="Type your email"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">Password</FormLabel>
              <FormControl>
                <Input
                  className="h-[56px] placeholder:text-[#919BA2] text-base"
                  placeholder="Type your password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full h-[56px] bg-[#2F414D] text-base font-bold"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FormInput;

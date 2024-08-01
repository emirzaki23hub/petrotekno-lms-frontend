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
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const FormInput = () => {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setShowError(false);

    setTimeout(async () => {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: values?.email,
          password: values?.password,
          callbackUrl: "/dashboard",
        });
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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {loading ? (
            <div className="h-[208px] flex justify-center items-center">
              <Loader2 className="mr-2 size-12 animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="h-[56px] placeholder:text-[#919BA2] text-base"
                        placeholder="Type your email"
                        {...field}
                        error={error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="h-[56px] placeholder:text-[#919BA2] text-base"
                        placeholder="Type your password"
                        error={error?.message}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {error && showError && (
            <p className="text-center text-sm text-danger-500 font-bold">
              {error}
            </p>
          )}
          <Button
            className="w-full h-[56px]  text-white capitalize bg-secondary-500 text-base font-bold"
            type="submit"
            disabled={loading}
          >
            login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormInput;

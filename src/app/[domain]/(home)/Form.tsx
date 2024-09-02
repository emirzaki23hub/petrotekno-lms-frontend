"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { Loader2 } from "lucide-react";
import { restAuth } from "@/rest/auth";
import { useDomainHelper } from "@/hooks/useDomainHelper";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const FormInput = () => {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setShowError(false);

    try {
      const email = values?.email;
      const password = values?.password;

      const response = await restAuth.postLogin({
        email,
        password,
        domain: partBeforeDot,
      });

      if (response?.data?.success) {
        const token = response.data?.data?.token;

        if (token) {
          // Save token to localStorage
          localStorage.setItem("authToken", token);

          // Redirect to dashboard
          window.location.replace("/dashboard");
        } else {
          setShowError(true);
          setError("Token not found. Please try again.");
          setLoading(false);
        }
      } else {
        setShowError(true);
        setError("Login failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      setShowError(true);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  const hasFetchedUserInfo = useRef(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        const response = await restAuth.getUserInfo(token, partBeforeDot);

        if (response?.data?.success) {
          window.location.replace("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!hasFetchedUserInfo.current) {
      fetchUserInfo();
      hasFetchedUserInfo.current = true; // Set the ref to true after the first run
    }
  }, []);

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

"use client";
import React, { useEffect, useState } from "react";
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
        // Simulate the signIn logic here
        const email = values?.email;
        const password = values?.password;

        if (email === "admin@admin.com" && password === "password") {
          const token = "dummy_token_123456";
          // Save token to localStorage
          localStorage.setItem("authToken", token);
          window.location.replace("/dashboard");
        } else {
          setShowError(true);
          setLoading(false);
          setError("Invalid username or password");
        }
      } catch (error) {
        setShowError(true);
        setLoading(false);
        setError("An unexpected error occurred. Please try again.");
      }
    }, 500);
  }

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      window.location.replace("/dashboard"); // Redirect to the dashboard if authToken exists
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

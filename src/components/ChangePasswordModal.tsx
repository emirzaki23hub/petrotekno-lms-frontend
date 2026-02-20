"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { restAuth } from "@/rest/auth";
import { Eye, EyeOff } from "lucide-react"; // Import ikon

import {
    Dialog, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
    current_password: z.string().min(1, "Required"),
    password: z.string().min(8, "Must be at least 8 characters"),
    password_confirmation: z.string().min(1, "Required"),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
});

export function ChangePasswordModal({ isOpen, onOpenChange, domain }: any) {
    // State untuk kontrol mata (show/hide)
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { current_password: "", password: "", password_confirmation: "" },
    });

    const isSubmitting = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            const token = localStorage.getItem("authToken") || "";
            const response = await restAuth.putChangePassword(domain, token, values) as any;

            const apiData = response?.data || response;

            if (apiData?.success === false) {
                form.setError("root", {
                    type: "manual",
                    message: apiData.message || "Failed to process",
                });
                return;
            }

            onOpenChange(false);
            form.reset();
        } catch (error: any) {
            form.setError("root", {
                type: "manual",
                message: error.message || "An unexpected error occurred",
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-white text-black">
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
                        {form.formState.errors.root && (
                            <div className="p-3 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md">
                                {form.formState.errors.root.message}
                            </div>
                        )}

                        {/* Current Password */}
                        <FormField
                            control={form.control}
                            name="current_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type={showCurrent ? "text" : "password"}
                                                placeholder="Enter current password"
                                                disabled={isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrent(!showCurrent)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* New Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type={showNew ? "text" : "password"}
                                                placeholder="Min. 8 characters"
                                                disabled={isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <button
                                            type="button"
                                            onClick={() => setShowNew(!showNew)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password */}
                        <FormField
                            control={form.control}
                            name="password_confirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type={showConfirm ? "text" : "password"}
                                                placeholder="Re-type new password"
                                                disabled={isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm(!showConfirm)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full bg-secondary-500 hover:bg-secondary-600 text-white transition-colors"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Updating..." : "Update Password"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
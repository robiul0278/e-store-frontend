"use client";

import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { TGenericErrorResponse } from "@/types/types";
import { useResetPasswordMutation } from "@/redux/api/api";
import { useState } from "react";
import { useAuthModal } from "@/context/AuthModalContext";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

type ResetPasswordFormValues = {
  newPassword: string;
};

const ResetPasswordPage = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { setOpen, setFormType } = useAuthModal();
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const [Reset] = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {
      newPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setServerError("");
    try {
      const payload = {
        email,
        newPassword: data.newPassword,
        token,
      };
      const res = await Reset(payload).unwrap();
      if (res.statusCode === 200) {
        toast.success(res.message);
        setFormType("login");
        setOpen(true);
      }
    } catch (error: unknown) {
      const err = error as { data: TGenericErrorResponse };

      if (err?.data?.errorSources && Array.isArray(err.data.errorSources)) {
        err.data.errorSources.forEach(({ path, message }) => {
          if (path === "newPassword") {
            form.setError("newPassword", {
              type: "server",
              message,
            });
          } else {
            if (err?.data?.message) {
              setServerError(err.data.message);
            } else {
              toast.error("Something went wrong, please try again!");
            }
          }
        });
      }
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl border rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        {/* Header */}
        <div className="text-center border-b px-6 py-4">
          <h2 className="text-2xl font-bold text-yellow-600">
            Set a New Password
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Password field */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  {...form.register("newPassword")}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none dark:bg-gray-800 dark:border-gray-700 text-sm"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {form.formState.errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.newPassword.message}
                </p>
              )}
              {serverError && (
                <p className="text-red-500 text-sm mt-1">{serverError}</p>
              )}
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full border text-sm font-semibold py-1.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {form.formState.isSubmitting
                  ? "Updating..."
                  : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

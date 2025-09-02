'use client';

import { useForm } from "react-hook-form";
import { useForgetPasswordMutation } from "@/redux/api/api";
import { toast } from "react-toastify";
import { TGenericErrorResponse } from "@/types/types";

type TResetForm = {
  email: string;
};

export default function ForgetPasswordForm({ switchForm, closeModal }: { switchForm: () => void, closeModal: () => void }) {
  const [Forget] = useForgetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TResetForm>({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: TResetForm) => {
    try {
      const res = await Forget(data).unwrap();
      if (res.statusCode === 200) {
        toast.success(res.message);
        closeModal();
      }
    } catch (error: unknown) {
      const err = error as { data: TGenericErrorResponse };
      if (err?.data?.errorSources && Array.isArray(err.data.errorSources)) {
        err.data.errorSources.forEach(({ path, message }) => {
          setError(path as keyof TResetForm, {
            type: "server",
            message,
          });
        });
      } else {
        toast.error(err?.data?.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your registered email"
          className={`mt-1 block w-full rounded-md  px-3 py-2 shadow-sm focus:outline-none dark:bg-gray-800 dark:text-white text-sm ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-yellow-600">{errors.email.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md border px-4 py-1.5 dark:text-gray-200  disabled:opacity-70 text-sm cursor-pointer"
      >
        {isSubmitting ? "Processing..." : "Reset Password"}
      </button>

      {/* Switch to Login */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Remembered your password?{" "}
        <button
          type="button"
          onClick={switchForm}
          className="text-yellow-600 hover:underline cursor-pointer"
        >
          Login
        </button>
      </p>
    </form>
  );
}

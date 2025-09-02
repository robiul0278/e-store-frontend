'use client';

import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "@/redux/api/api";
import { LoginFormType, TGenericErrorResponse } from "@/types/types";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm({
  switchForm,
  closeModal,
  goToForgetForm,
}: {
  switchForm: () => void;
  closeModal: () => void;
  goToForgetForm: () => void;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [login] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      const res = await login(data).unwrap();
      if (res.statusCode === 200) {
        const { accessToken, user } = res.data;
        // Save to Redux store
        dispatch(setCredentials({ user }));
        // Save to localStorage
        localStorage.setItem("accessToken", accessToken);
        toast.success(res.message);
        closeModal();
        router.push("/");
      }
    } catch (error: unknown) {
      const err = error as { data: TGenericErrorResponse };
      if (err?.data?.errorSources && Array.isArray(err.data.errorSources)) {
        err.data.errorSources.forEach(({ path, message }) => {
          setError(path as keyof LoginFormType, {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className={`mt-1 block w-full rounded-md dark:bg-gray-800 px-3 py-2 shadow-sm focus:outline-none text-sm ${
            errors.email ? "border-yellow-500" : "border-gray-300"
          }`}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-yellow-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={`mt-1 block w-full rounded-md px-3 py-2 shadow-sm pr-10 focus:outline-none dark:bg-gray-800 text-sm ${
              errors.password ? "border-yellow-500" : "border-gray-300"
            }`}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer dark:hover:text-white"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-yellow-600">{errors.password.message}</p>
        )}
      </div>

      {/* Forgot Password */}
      <div className="text-sm text-right">
        <button
          type="button"
          onClick={goToForgetForm}
          className="text-yellow-600 hover:underline focus:outline-none cursor-pointer"
        >
          Forgot your password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md border px-4 py-1.5 dark:text-gray-200 text-sm disabled:opacity-70 cursor-pointer"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      {/* Switch to Register */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={switchForm}
          className="text-yellow-600 hover:underline cursor-pointer"
        >
          Register
        </button>
      </p>
    </form>
  );
}

'use client';

import { useForm } from "react-hook-form";
import { RegisterFormType, TGenericErrorResponse } from "@/types/types";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRegisterUserMutation } from "@/redux/api/api";

export default function CreateProduct() {
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [Register] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      photo: "",
    },
  });

  const onSubmit = async (data: RegisterFormType) => {
    try {
      const formData = new FormData();
      // photo file
      const fileInput = document.querySelector<HTMLInputElement>("#photo");
      if (fileInput?.files?.[0]) {
        formData.append("file", fileInput.files[0]);
      }
      // rest of the data
      formData.append("data", JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }));

      const response = await Register(formData).unwrap();
      toast.success(response.message);
    } catch (error: unknown) {
      const err = error as { data: TGenericErrorResponse };

      if (err?.data?.errorSources && Array.isArray(err.data.errorSources)) {
        err.data.errorSources.forEach(({ path, message }) => {
          setError(path as keyof RegisterFormType, {
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
      {/* Photo Upload */}
      <div className="flex flex-col items-center justify-center">
        <label htmlFor="photo" className="relative cursor-pointer w-24 h-24">
          {/* Circular Image / Preview */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 shadow-lg">
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 text-sm font-medium">
                Upload
              </div>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 rounded-full bg-yellow-600 bg-opacity-25 opacity-0 hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold transition-opacity">
            Change Photo
          </div>
        </label>

        {/* Hidden Input */}
        <input
          id="photo"
          type="file"
          accept="image/*"
          className="hidden"
          {...register("photo", {
              // required: "photo is required!",
            onChange: (e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            },
          })}
        />
        {errors.photo && (
          <p className="mt-1 text-sm text-yellow-600">{errors.photo.message}</p>
        )}
        {/* Label below */}
        <span className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
          Upload Profile
        </span>
      </div>
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          className={`mt-1 block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none text-sm dark:bg-gray-800 dark:text-white ${errors.name ? "border-yellow-500" : "border-gray-300"
            }`}
          {...register("name")}
        />
        {errors.name && <p className="mt-1 text-sm text-yellow-600">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className={`mt-1 block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none text-sm dark:bg-gray-800 dark:text-white ${errors.email ? "border-yellow-500" : "border-gray-300"
            }`}
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-sm text-yellow-600">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={`mt-1 block w-full rounded-md px-3 py-2 shadow-sm pr-10 focus:outline-none text-sm dark:bg-gray-800 dark:text-white ${errors.password ? "border-yellow-500" : "border-gray-300"
              }`}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 dark:hover:text-white"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-yellow-600">{errors.password.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md border text-sm px-4 py-2 dark:text-gray-200 disabled:opacity-70 cursor-pointer"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>

      {/* Switch to Login */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <button
          type="button"
          className="text-yellow-600 hover:underline cursor-pointer"
        >
          Login
        </button>
      </p>
    </form>
  );
}

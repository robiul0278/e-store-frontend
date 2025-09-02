'use client'

import { useAuthModal } from "@/context/AuthModalContext";
import ForgetPasswordForm from "./forget-password";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { X } from "lucide-react";

export default function AuthModal() {
  const { open, setOpen, formType, setFormType } = useAuthModal();

  // Switch between Login ↔ Register
  const switchForm = () => {
    if (formType === "login") setFormType("register");
    else setFormType("login");
  };

  // Go to Forget Password form
  const goToForgetForm = () => {
    setFormType("forget");
  };

  if (!open) return null; // Hide modal if not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal Box */}
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer"
        >
          <X/>
        </button>

        {/* Title */}
        <h2 className="text-lg font-bold text-yellow-600 text-center mb-4">
          {formType === "login"
            ? "Login"
            : formType === "register"
            ? "Create an Account"
            : "Forget Password!"}
        </h2>

        {/* Forms */}
        {formType === "login" ? (
          <LoginForm
            switchForm={switchForm}
            closeModal={() => setOpen(false)}
            goToForgetForm={goToForgetForm}
          />
        ) : formType === "register" ? (
          <RegisterForm switchForm={switchForm} />
        ) : (
          <ForgetPasswordForm
            switchForm={() => setFormType("login")}
            closeModal={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

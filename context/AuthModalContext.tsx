// context/AuthModalContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type AuthModalContextType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  formType: "login" | "register" | "forget";
  setFormType: (type: "login" | "register" | "forget") => void;
};

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState<"login" | "register" | "forget">("login");

  return (
    <AuthModalContext.Provider value={{ open, setOpen, formType, setFormType }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) throw new Error("useAuthModal must be used within AuthModalProvider");
  return context;
};
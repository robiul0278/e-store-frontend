// app/unauthorized/page.tsx
"use client";

import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 text-center p-6">
      <div className="bg-white dark:bg-zinc-950 shadow-xl rounded-2xl p-10 max-w-md border border-red-200 dark:border-red-800">
        <div className="flex justify-center mb-6">
          <ShieldAlert className="h-16 w-16 text-red-500 dark:text-red-400" />
        </div>
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
          Access Denied
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Sorry, you don’t have permission to view this page.  
          Only <span className="font-semibold">Admin</span> can access the dashboard.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back Home
        </Link>
      </div>

      <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
        Need help? <Link href="/contact" className="underline">Contact Support</Link>
      </p>
    </div>
  );
}

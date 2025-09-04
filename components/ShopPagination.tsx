"use client";

import { useTransition } from "react";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handlePagination = (page: number) => {
    if (page < 1 || page > totalPages) return;

    startTransition(() => {
      const current = new URLSearchParams(window.location.search);
      current.set("page", page.toString());
      const query = current.toString();
      router.push(`/shop?${query}`);

      // navigation এর পরে scroll করো
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    });
  };

  // Generate pagination numbers with ellipsis
  const getPages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {/* Previous button */}
      <button
        className={cn(
          "px-3 py-1 rounded-md border text-sm transition-colors",
          currentPage === 1 || isPending
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
        )}
        disabled={currentPage === 1 || isPending}
        onClick={() => handlePagination(currentPage - 1)}
      >
        {isPending ? <Loader className="h-4 w-4 animate-spin" /> : "Prev"}
      </button>

      {/* Page Numbers */}
      {getPages().map((p, idx) =>
        typeof p === "number" ? (
          <button
            key={idx}
            className={cn(
              "w-9 h-9 rounded-md border text-sm transition-colors",
              p === currentPage
                ? "bg-yellow-600 text-white border-yellow-600"
                : "hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer border-gray-200"
            )}
            onClick={() => handlePagination(p)}
            disabled={isPending}
          >
            {p}
          </button>
        ) : (
          <span key={idx} className="px-2 text-gray-400">
            {p}
          </span>
        )
      )}

      {/* Next button */}
      <button
        className={cn(
          "px-3 py-1 rounded-md border text-sm transition-colors",
          currentPage === totalPages || isPending
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
        )}
        disabled={currentPage === totalPages || isPending}
        onClick={() => handlePagination(currentPage + 1)}
      >
        {isPending ? <Loader className="h-4 w-4 animate-spin" /> : "Next"}
      </button>
    </div>
  );
}

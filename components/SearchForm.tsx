"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const SearchForm = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handlePagination = (e: FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      const current = new URLSearchParams(window.location.search);
      current.set("query", keyword.trim());
      const query = current.toString();
      router.push(`/shop?${query}`);
    });
  };

  return (
    <form
      onSubmit={handlePagination}
      className="w-full mx-auto"
    >
      <div className="flex items-center gap-2 p-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
        {/* Input */}
        <div className="relative flex-1">
          <input
            type="text"
            name="query"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="🔍 Search products..."
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-1 text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="px-6 py-1 hover:text-yellow-600 dark:bg-gray-800 rounded-lg border font-medium text-sm sm:text-base transition-shadow hover:shadow-lg cursor-pointer"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;

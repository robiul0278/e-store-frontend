'use client'

import { startTransition, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const ProductCategories = ({ categories }: { categories: string[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = searchParams.get("category") || "";
  const [selectedCategory, setSelectedCategory] = useState<string>(params);

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
    startTransition(() => {
      const current = new URLSearchParams(window.location.search);
      current.set("category", category);
      router.push(`?${current.toString()}`);
    });
  };

  return (
    <div className="relative border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm p-2 bg-white dark:bg-gray-900">
      <h4 className="relative font-semibold z-10 text-sm flex items-center dark:text-gray-100 pb-2">
        Product buy categories
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {categories?.map((cat, i: number) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={i}
              onClick={() => handleCategory(cat)}
              className={`flex items-center justify-between z-20 group cursor-pointer rounded-lg px-2 transition-colors py-1 duration-300 ease-in-out ${
                isSelected
                  ? "bg-yellow-600 text-white dark:bg-yellow-600"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              <span className="text-[13px] font-medium transition-colors duration-300 ease-in-out">
                {cat}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

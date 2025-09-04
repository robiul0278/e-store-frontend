// components/CarCategories.tsx
"use client";

import { Car, Truck, Bike, Bus } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

const categories = [
  { id: 1, name: "SUV", icon: <Car className="w-8 h-8" /> },
  { id: 2, name: "Sedan", icon: <Car className="w-8 h-8" /> },
  { id: 3, name: "Truck", icon: <Truck className="w-8 h-8" /> },
  { id: 4, name: "Bike", icon: <Bike className="w-8 h-8" /> },
  { id: 5, name: "Bus", icon: <Bus className="w-8 h-8" /> },
  { id: 6, name: "Van", icon: <Bus className="w-8 h-8" /> },
];

export default function CarCategories() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
    startTransition(() => {
      const current = new URLSearchParams(window.location.search);
      current.set("category", category);
      router.push(`/shop?${current.toString()}`);
    });
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-10 px-4 lg:px-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {categories.map((category, idx) => {
          const isActive = selectedCategory === category.name;

          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.05,
                duration: 0.3,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategory(category.name)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-yellow-600 text-white shadow-lg border-yellow-600"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-xl"
              }`}
            >
              <div className={isActive ? "text-white" : "text-yellow-600"}>
                {category.icon}
              </div>
              <span className="mt-3 font-medium">{category.name}</span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

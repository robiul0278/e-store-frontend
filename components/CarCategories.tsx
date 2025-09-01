// components/CarCategories.tsx

"use client";
import { Car, Truck, Bike, Bus } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { id: 1, name: "SUV", icon: <Car className="w-8 h-8" /> },
  { id: 2, name: "Sedan", icon: <Car className="w-8 h-8" /> },
  { id: 3, name: "Truck", icon: <Truck className="w-8 h-8" /> },
  { id: 4, name: "Bike", icon: <Bike className="w-8 h-8" /> },
  { id: 5, name: "Bus", icon: <Bus className="w-8 h-8" /> },
  { id: 6, name: "Van", icon: <Bus className="w-8 h-8" /> },
];

export default function CarCategories() {
  return (
    <section className="w-full max-w-7xl mx-auto py-10 px-4 lg:px-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {categories.map((category, idx) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: idx * 0.01,
              duration: 0.01,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.08, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 shadow-md rounded-2xl border hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="text-yellow-600">{category.icon}</div>
            <span className="mt-3 font-medium text-gray-700 dark:text-gray-300">
              {category.name}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

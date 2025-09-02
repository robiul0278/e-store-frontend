"use client";

import { ShoppingBag, Star, Users, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About <span className="text-indigo-600">Our Store</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Welcome to our e-store, where we provide the latest gadgets, mobile phones,
          and accessories with unbeatable prices and trusted service.
        </p>
      </div>

      {/* Stats / Highlights */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
          <ShoppingBag className="w-10 h-10 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Wide Collection
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Thousands of products from top brands, updated regularly.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
          <Star className="w-10 h-10 text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Trusted Quality
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            100% genuine products with warranty & after-sales support.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
          <Users className="w-10 h-10 text-pink-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Happy Customers
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Serving thousands of satisfied customers nationwide.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
          <Globe className="w-10 h-10 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Fast Delivery
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Nationwide delivery with secure packaging and tracking.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="mt-20 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Our Mission
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          We believe in making technology accessible to everyone. Our mission is to provide
          authentic products, best prices, and excellent service — all in one place.  
          Whether youre upgrading your device or buying for loved ones, we’re here to help.
        </p>
      </div>
    </section>
  );
}

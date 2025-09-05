"use client";

export default function ProductViewSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Image Gallery Skeleton */}
        <div className="flex flex-col space-y-4 bg-gray-200 dark:bg-gray-700 p-5 rounded-2xl">
          {/* Main Image */}
          <div className="bg-gray-300 dark:bg-gray-800 rounded-2xl h-96 w-full" />

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-300 dark:bg-gray-800 rounded-xl h-20 w-20"
              />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="flex flex-col space-y-4">
          {/* Title */}
          <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>

          {/* Categories */}
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>

          {/* Stock Badge */}
          <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-4">
            <div className="h-10 w-36 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          </div>
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div className="mt-10">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

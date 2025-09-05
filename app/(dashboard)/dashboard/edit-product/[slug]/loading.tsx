
export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-5">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="h-4 w-64 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
        <div className="space-y-1 text-right">
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
      </div>

      {/* Photos Upload Skeleton */}
      <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

      {/* Name Skeleton */}
      <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>

      {/* Price, Discount, Categories Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>

      {/* Description Skeleton */}
      <div className="h-24 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>

      {/* Submit Button Skeleton */}
      <div className="h-10 w-full bg-gray-400 dark:bg-gray-600 rounded-md"></div>
    </div>
  );
}

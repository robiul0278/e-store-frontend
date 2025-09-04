export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col border bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm animate-pulse"
        >
          {/* Product Image Skeleton */}
          <div className="h-48 w-full bg-gray-200 dark:bg-gray-700" />

          {/* Product Info */}
          <div className="px-2 flex flex-col flex-grow space-y-3 mt-2">
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-2 px-2 mt-3">
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>

          {/* Button Skeleton */}
          <div className="p-2">
            <div className="h-9 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

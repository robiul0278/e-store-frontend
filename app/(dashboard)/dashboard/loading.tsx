
export default function Loading() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-6 rounded-2xl shadow-lg bg-gray-200 dark:bg-gray-700"
          >
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded-full mt-2"></div>
            </div>
            <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full opacity-70"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

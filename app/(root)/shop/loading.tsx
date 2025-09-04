export default function Loading() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-2 relative">
        {/* HEADER: Breadcrumb + Search bar */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center rounded-b p-2 dark:bg-gray-800">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="hidden md:flex lg:flex justify-end">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="hidden h-0.5 mb-4 md:flex lg:flex justify-end bg-gray-200 dark:bg-gray-900" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-2">
          {/* Sidebar Skeleton */}
          <aside className="lg:col-span-3 space-y-4 rounded lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-800 z-20 p-2">
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"
                ></div>
              ))}
            </div>
          </aside>

          {/* Products Skeleton */}
          <div className="lg:col-span-9 bg-gray-50 dark:bg-gray-900 rounded-2xl p-2 md:p-4 lg:p-2">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col border bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow"
                >
                  {/* Image */}
                  <div className="h-40 w-full bg-gray-200 dark:bg-gray-700"></div>
                  {/* Info */}
                  <div className="p-3 space-y-3">
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  {/* Button */}
                  <div className="p-3">
                    <div className="h-9 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex items-center justify-center gap-2 py-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

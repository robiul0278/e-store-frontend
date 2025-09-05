export default function TableSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-gray-300 rounded"></div>
          <div className="h-4 w-40 bg-gray-300 rounded"></div>
        </div>
        <div className="text-right space-y-1">
          <div className="h-4 w-20 bg-gray-300 rounded mx-auto"></div>
          <div className="h-4 w-16 bg-gray-300 rounded mx-auto"></div>
        </div>
      </div>

      {/* Card Skeleton */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
        {/* Filters Skeleton */}
        <div className="p-5 border-b flex items-center justify-between gap-4">
          <div className="h-9 w-64 bg-gray-300 rounded"></div>
          <div className="flex gap-2">
            <div className="h-9 w-52 bg-gray-300 rounded"></div>
            <div className="h-9 w-52 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="p-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60">
              <tr>
                <th className="p-3 text-left font-semibold text-foreground">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </th>
                <th className="p-3 text-left font-semibold text-foreground">
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                </th>
                <th className="p-3 text-left font-semibold text-foreground">
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                </th>
                <th className="p-3 text-left font-semibold text-foreground">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </th>
                <th className="p-3 text-left font-semibold text-foreground">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </th>
                <th className="p-3 text-right font-semibold text-foreground">
                  <div className="h-4 w-9 bg-gray-300 rounded mx-auto"></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted/50">
              {Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-3">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="h-9 w-9 bg-gray-300 rounded inline-block"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Skeleton */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-2">
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
              <div className="h-9 w-24 bg-gray-300 rounded"></div>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="h-9 w-9 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

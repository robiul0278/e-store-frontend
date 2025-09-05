'use client';

interface PaginationProps {
  setPageAction: (page: number) => void;
  page: number;
  totalPage: number; // Just a number like 5, 10, etc.
}

export default function Pagination({ setPageAction, page, totalPage }: PaginationProps) {
  const handlePrev = () => {
    if (page > 1) {
      setPageAction(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPageAction(page + 1);
    }
  };

  return (
    <div className="flex gap-2 items-center justify-center py-4">
      {/* Prev Button */}
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className={`px-3 py-1 rounded-md border ${page === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {[...Array(totalPage)].map((_, index) => {
        const number = index + 1;
        const isActive = page === number;

        return (
          <button
            key={number}
            onClick={() => setPageAction(number)}
            className={`px-3 py-1 rounded-md border ${isActive
                ? "bg-amber-600 text-white border-amber-600"
                : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            {number}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={page === totalPage}
        className={`px-3 py-1 rounded-md border ${page === totalPage
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
      >
        Next
      </button>
    </div>
  );
}
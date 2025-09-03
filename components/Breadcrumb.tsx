import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

type BreadcrumbProps = {
  pageName: string;
};

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <nav className="hidden lg:flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 space-x-1 md:space-x-2">
      {/* Home link */}
      <Link
        href="/"
        className="flex items-center hover:text-yellow-600 transition-colors duration-200"
      >
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>

      {/* Arrow */}
      <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />

      {/* Current page */}
      <span className="font-medium text-gray-800 dark:text-gray-100">
        {pageName}
      </span>
    </nav>
  );
};

export default Breadcrumb;
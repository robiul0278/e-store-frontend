import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { ProductCategories } from "@/components/ProductCategories";
import ResetQuery from "@/components/ResetQuery";
import SearchForm from "@/components/SearchForm";
import Pagination from "@/components/ShopPagination";
import { getAllProducts } from "@/lib/api";
import { TProduct } from "@/types/types";

export default async function ShopPage({ searchParams }: {
  searchParams: Promise<{
    category?: string;
    query?: string;
    page?: string;
    limit: string;
  }>;
}) {
  const resolvedParams = await searchParams;
  const { category, query } = resolvedParams;
  const currentPage = parseInt(resolvedParams.page || '1');

  const params: Record<string, string> = {
    ...(category ? { categories: category } : {}),
    ...(query ? { searchTerm: query } : {}),
    page: currentPage.toString(),
    limit: '12'
  };

  const { result, meta, categories } = await getAllProducts({ params });

  return (
    <section className=" bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-2 relative">
        {/* HEADER: Breadcrumb + search bar */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center rounded-b
        p-2 dark:bg-gray-800 ">
          <Breadcrumb pageName="Shop" />
          {/* Search Form (desktop only) */}
          <div className="hidden md:flex lg:flex justify-end">
            <SearchForm />
          </div>
        </div>
        <div className="hidden h-0.5 mb-4 md:flex lg:flex justify-end bg-gray-200 dark:bg-gray-900" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-2">
          {/* Left sidebar */}
          <aside
            className="
              lg:col-span-3
              space-y-2 rounded
              lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto bg-gray-50 
             dark:bg-gray-800 z-20
              md:sticky md:top-0 md:z-30 p-0 md:p-4 lg:p-2
              "
            style={{ minHeight: 'auto' }}
          >
            <ProductCategories categories={categories} />
            <div className="flex items-center my-4 mx-2 gap-2">
              {/* Left content */}
              <div className="flex-1">
                {query || category ? (
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 text-left md:text-left">
                    Results for{" "}
                    <span className="text-amber-600 font-normal lg:text-[14px]">
                      {[query, category]
                        .filter(Boolean)
                        .map((item) => {
                          if (item === category) return (item as string);
                          return (item as string);
                        })
                        .join(" | ")}
                    </span>
                  </p>
                ) : (
                  <div className="md:hidden" />
                )}
              </div>
              {/* Always right aligned */}
              <div className="flex justify-end">
                {(query || category) && (
                  <ResetQuery />
                )}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-9 bg-gray-50  dark:bg-gray-900 rounded-2xl p-0 md:p-4 lg:p-0">
            {result.length === 0 ? (
              <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                <p className="text-xl font-medium">
                  {query ? `"${query}" এর জন্য কোনো চাকরির বিজ্ঞপ্তি পাওয়া যায়নি।` : "এই মুহূর্তে কোনো চাকরির বিজ্ঞপ্তি পাওয়া যাচ্ছে না।"}
                </p>
                <p className="text-sm mt-2">দয়া করে অন্য কীওয়ার্ড দিয়ে আবার চেষ্টা করুন।</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-5">
                {result.map((product: TProduct) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
            <Pagination totalPages={meta.totalPage} currentPage={currentPage} />
          </div>
        </div>
      </div>
    </section>
  );
}
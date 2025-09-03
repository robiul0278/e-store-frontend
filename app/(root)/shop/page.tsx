import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { ProductCategories } from "@/components/ProductCategories";
import ResetQuery from "@/components/ResetQuery";
import SearchForm from "@/components/SearchForm";
import { getAllProducts } from "@/lib/api";


const products = [
  {
    id: '1',
    name: 'Ford Mustang GT Toy',
    price: 12.99,
    image: 'https://images-cdn.ubuy.com.sa/66ab89de07956d01a45e73c3-2015-ford-mustang-gt-5-0-orange-metallic.jpg',
    description: 'Metallic die-cast Mustang GT model with detailed interior',
  },
  {
    id: '2',
    name: 'Chevrolet Camaro SS Toy',
    price: 11.99,
    image: 'https://www.rmtoys.co.uk/cdn/shop/products/l1rqmfddxpb_75319c15-9cb2-4c72-ac5d-3cce969ec13c.jpg?v=1745233598',
    description: 'Camaro SS metal toy with opening doors and pull-back action',
  },
  {
    id: '3',
    name: 'Dodge Challenger SRT Toy',
    price: 13.49,
    image: 'https://i.ytimg.com/vi/lpzirYgi9HU/maxresdefault.jpg',
    description: 'Realistic die-cast Dodge Challenger with sleek finish',
  },
  {
    id: '4',
    name: 'Tesla Model S Toy Car',
    price: 14.99,
    image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/vehicle-pull-along/m/3/1/tesla-model-s-toy-car-1-32-scale-alloy-car-diecast-model-toys-original-imagpceutwpf6aap.jpeg?q=90&crop=false',
    description: 'Eco-friendly metallic Tesla Model S miniature car',
  },
  {
    id: '5',
    name: 'Ford F-150 Pickup Toy',
    price: 10.99,
    image: 'https://diecastmodelcentre.co.uk/cdn/shop/files/Ford-F-150-Lightning-2022-red-143-Scale-Diecast-Toy-Car-Bburago.png?v=1713565364',
    description: 'Durable die-cast Ford F-150 truck toy for collectors',
  },
  {
    id: '6',
    name: 'Jeep Wrangler Off-Road Toy',
    price: 9.99,
    image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
    description: 'Jeep Wrangler off-road edition with realistic suspension',
  },
  {
    id: '7',
    name: 'Cadillac CTS-V Luxury Toy Car',
    price: 13.99,
    image: 'https://i.ytimg.com/vi/U8z0hOURscs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBmSt283IKqjWNq8lqStq4OHVe-7w',
    description: 'High-end Cadillac CTS-V die-cast with metallic sheen',
  },
  {
    id: '8',
    name: 'Lincoln Continental Classic Toy',
    price: 15.49,
    image: 'https://i.ebayimg.com/thumbs/images/g/RnsAAOSw~iBniivU/s-l1200.jpg',
    description: 'Vintage Lincoln Continental replica with fine chrome detailing',
  },
  {
    id: '9',
    name: 'Lincoln Continental Classic Toy',
    price: 15.49,
    image: 'https://i.ebayimg.com/thumbs/images/g/RnsAAOSw~iBniivU/s-l1200.jpg',
    description: 'Vintage Lincoln Continental replica with fine chrome detailing',
  },
  {
    id: '10',
    name: 'Lincoln Continental Classic Toy',
    price: 15.49,
    image: 'https://i.ebayimg.com/thumbs/images/g/RnsAAOSw~iBniivU/s-l1200.jpg',
    description: 'Vintage Lincoln Continental replica with fine chrome detailing',
  }
];



export default async function ShopPage({ searchParams }: {
  searchParams: Promise<{
    category?: string;
    query?: string;
    page?: string;
  }>;
}) {
  const resolvedParams = await searchParams;
  const { category, query } = resolvedParams;
  const currentPage = parseInt(resolvedParams.page || '1');

  const params: Record<string, string> = {
    ...(category ? { categories: category } : {}),
    ...(query ? { searchTerm: query } : {}),
    page: currentPage.toString(),
  };

  const { result, meta, categories } = await getAllProducts({ params });

  return (
    <section className=" bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-2 relative">
        {/* HEADER: Breadcrumb + search bar */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center rounded-b
        p-2 dark:bg-gray-800 ">
          <Breadcrumb pageName="Shop"/>
          {/* Search Form (desktop only) */}
          <div className="hidden md:flex lg:flex justify-end">
            <SearchForm />
          </div>
        </div>
     <div className="hidden h-0.5 mb-4 md:flex lg:flex justify-end bg-gray-200 dark:bg-gray-900"/>


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
            {products.length === 0 ? (
              <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                <p className="text-xl font-medium">
                  {query ? `"${query}" এর জন্য কোনো চাকরির বিজ্ঞপ্তি পাওয়া যায়নি।` : "এই মুহূর্তে কোনো চাকরির বিজ্ঞপ্তি পাওয়া যাচ্ছে না।"}
                </p>
                <p className="text-sm mt-2">দয়া করে অন্য কীওয়ার্ড দিয়ে আবার চেষ্টা করুন।</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            {/* <Pagination totalPages={meta.totalPage} currentPage={currentPage} /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
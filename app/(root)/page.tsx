'use client';

import HeroSection from '@/components/hero/HeroSection';
import FAQ from '@/components/FAQ';
import ProductCard from '@/components/ProductCard';
import CarCategories from '@/components/CarCategories';
import { useGetAllProductsQuery } from '@/redux/api/api';
import { TProduct } from '@/types/types';
import ProductSkeleton from '@/components/ProductSkeleton';
import Link from 'next/link';


export default function Home() {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);

  return (
    <div className="flex flex-col bg-gray-50 dark:bg-gray-900">
      <main className="flex-grow">
        <HeroSection />

        <CarCategories />
        <div className="max-w-7xl mx-auto pt-4 pb-12 px-4 md:p-0 lg:p-0">
          <div className="flex mb-6">
            <h2 className="text-2xl md:text-2xl font-semibold text-center whitespace-nowrap">
              Featured Products
            </h2>
          </div>
          {isLoading ? <ProductSkeleton /> : (
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5">
              {products?.data.result.map((product: TProduct) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center py-6">
          <Link
            href="/shop"
            className="px-6 py-1 rounded-lg font-semibold  bg-amber-600 hover:bg-amber-800 transition-colors duration-300 shadow-md hover:shadow-lg text-white"
          >
            Show All Products
          </Link>
        </div>
      </main>
      <FAQ />
    </div>
  );
}
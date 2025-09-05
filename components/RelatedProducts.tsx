"use client";

import { useGetAllProductsQuery } from "@/redux/api/api";
import { TProduct } from "@/types/types";
import ProductSkeleton from "./ProductSkeleton";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  category: string;
}

export default function RelatedProducts({ category }: RelatedProductsProps) {
  const { data: products, isLoading } = useGetAllProductsQuery({ categories: category });

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 md:p-0 lg:p-0">
      <div className="flex mb-6">
        <h2 className="text-2xl md:text-2xl font-semibold text-center whitespace-nowrap">
          Related Products
        </h2>
      </div>

      {isLoading ? (
        <ProductSkeleton />
      ) : products?.data.result && products.data.result.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5">
          {products.data.result.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No related products found.
        </p>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { Plus } from 'lucide-react';
import { addToCart } from '@/redux/features/cartSlice';
import { toast } from 'react-toastify';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success(`Added ${quantity} ${product.name}`);
    setQuantity(1);
  };

  return (
<div className="flex flex-col border bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
  {/* Product Image */}
  <div className="relative h-48 w-full overflow-hidden group">
    <Image
      src={product.image}
      alt={product.name}
      fill
      className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  </div>

  {/* Product Info */}
  <div className="px-2 flex flex-col flex-grow">
    <h2 className="text-lg md:text-lg font-semibold hover:text-red-600 transition-colors duration-300">
      {product.name}
    </h2>
    <p className="mt-2 text-lg md:text-xl font-bold">${product.price.toFixed(2)}</p>
  </div>

  {/* Add to Cart Button */}
  <div className="p-2">
    <button
      onClick={handleAddToCart}
      className="w-full flex items-center justify-center gap-2 px-4 py-1 border font-semibold rounded-lg hover:shadow transition-all duration-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900"
    >
      <Plus className="w-4 h-4 md:w-5 md:h-5" />
      Add to Cart
    </button>
  </div>
</div>

  );
}
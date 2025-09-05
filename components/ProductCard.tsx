'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { DollarSign, LucideShoppingCart, Plus } from 'lucide-react';
import { addToCart, selectCartItems } from '@/redux/features/cartSlice';
import { toast } from 'react-toastify';
import Link from 'next/link';
import CartModal from './CartModal';

interface Product {
  _id: string;
  name: string;
  slug: string;
  photos: string[];
  banner: string;
  description: string;
  price: number;
  discount?: number;
  discountPrice?: number;
  inStock: boolean;
  status: "active" | "inactive";
  categories: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const isInCart = cartItems.some(item => item.id === product?._id);

  const handleAddToCart = () => {
    const itemToAdd = {
      id: product._id,
      name: product.name,
      photo: product.photos[0],
      price: product.discountPrice || 0,
      quantity,
    };

    dispatch(addToCart(itemToAdd));
    toast.success(`Added ${quantity} ${product.name}`);
    setQuantity(1);
  };

  return (
    <div className="relative flex flex-col justify-between border bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <Link href={`/product/${product.slug}`} className='cursor-pointer'>
        <div className="relative h-48 w-full overflow-hidden group">
          <Image
            src={product.photos[0]}
            alt={product.name}
            fill
            className="w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105 object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Product Info */}
        <div className="px-2 flex flex-col flex-grow">
          <h2 className=" font-semibold transition-colors duration-300">
            {product.name}
          </h2>

          <div className="mt-4 flex items-center space-x-3">
            {(product.discount ?? 0) > 0 ? (
              <>
                <p className="flex items-center text-2xl font-medium">
                  <DollarSign className="w-5 h-5 mt-1" />
                  <span>{product.discountPrice}</span>
                </p>

                <p className=" flex items-center text-lg text-gray-400 line-through">
                  <DollarSign className="w-4 h-4" />
                  <span>{product.price}</span>
                </p>

                <span className="absolute top-1 right-1 px-2 py-1 text-sm bg-amber-400  dark:bg-amber-600 rounded-md">
                  -{product.discount}%
                </span>
              </>
            ) : (
              <p className="flex items-center text-2xl font-medium">
                <DollarSign className="w-5 h-5 mt-1" />
                <span>{product.price}</span>
              </p>
            )}
          </div>
        </div>
      </Link>
      {/* Add to Cart Button */}
      <div className="p-2">
        {isInCart ?
          (<button
            onClick={() => setIsCartOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-1 border font-semibold rounded-lg hover:shadow transition-all duration-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <LucideShoppingCart className="w-5 h-5" />
            View Cart
          </button>)
          :
          (<button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 px-4 py-1 border font-semibold rounded-lg hover:shadow transition-all duration-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            Add to Cart
          </button>)}

      </div>
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}

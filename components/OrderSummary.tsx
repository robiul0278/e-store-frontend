'use client';

import Image from 'next/image';
import { useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { selectCartItems, selectShipping, selectSubtotal, selectTotal } from '@/redux/features/cartSlice';

export default function OrderSummary() {
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);
  const shipping = useSelector(selectShipping);
  const total = useSelector(selectTotal);

  return (
    <div className=" dark:bg-gray-800 shadow-lg rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Order Summary
        </h1>
      </div>

      {/* Cart Items */}
      <div className="space-y-5 max-h-60 overflow-y-auto pr-2">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              {/* Product Image */}
              <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                <Image
                  src={item.photo}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Qty: {item.quantity}
                </p>
              </div>

              {/* Price */}
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Your cart is empty.
          </p>
        )}
      </div>

      {/* Subtotal & Shipping */}
      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">Shipping</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            ${shipping.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center border-t pt-4">
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Total
        </span>
        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Back to Shop Button */}
      <Link href="/" passHref>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </button>
      </Link>
    </div>
  );
}

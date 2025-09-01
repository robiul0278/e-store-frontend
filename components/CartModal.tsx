'use client';

import { useDispatch } from 'react-redux';
import { Trash2, ArrowRight, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/redux/hooks/useCart';
import { removeFromCart, updateQuantity } from '@/redux/features/cartSlice';

interface CartSlideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartSlideProps) {
  const dispatch = useDispatch();
  const { items, total } = useCart();

  const handleQuantityChange = (id: string, value: string) => {
    const quantity = Math.max(1, Math.min(99, parseInt(value) || 1));
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleIncrement = (id: string, currentQuantity: number) => {
    if (currentQuantity < 99) {
      dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
    }
  };

  const handleDecrement = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-50`}>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Cart Modal */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed right-0 top-0 h-full w-full sm:max-w-lg bg-white dark:bg-gray-900 shadow-lg flex flex-col z-50"
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h1 className="text-lg font-semibold">Shopping Cart</h1>
          <button onClick={onClose} className="p-1">
            ✕
          </button>
        </div>

        <div className="flex-grow overflow-auto py-6 px-4 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              Your cart is empty
            </div>
          ) : (
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 items-start cart-item"
                >
                  <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center rounded-md border border-gray-300 dark:border-gray-600">
                        <button
                          className="h-8 w-8 rounded-none flex items-center justify-center"
                          onClick={() => handleDecrement(item.id, item.quantity)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          className="h-8 w-14 rounded-none border-0 text-center bg-transparent text-gray-900 dark:text-gray-100"
                        />
                        <button
                          className="h-8 w-8 rounded-none flex items-center justify-center"
                          onClick={() => handleIncrement(item.id, item.quantity)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button onClick={() => handleRemove(item.id)}>
                        <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-gray-900 dark:text-gray-100">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex justify-between font-medium text-gray-900 dark:text-gray-100 mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link href="/checkout" onClick={onClose}>
              <button className="w-full flex justify-center items-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}

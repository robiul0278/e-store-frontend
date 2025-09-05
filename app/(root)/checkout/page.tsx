'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import ThankYouMessage from '../../../components/ThankYouMessage';
import { selectCartItems } from '@/redux/features/cartSlice';
import OrderSummary from '../../../components/OrderSummary';
import CheckoutForm from '../../../components/CheckoutForm';

export default function CheckoutPage() {
  const [orderComplete, setOrderComplete] = useState(false);
  const cartItems = useSelector(selectCartItems);

  const handleOrderComplete = () => {
    setOrderComplete(true);
  };

  if (orderComplete) {
    return <ThankYouMessage/>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <Link href="/" className="text-primary hover:underline">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <OrderSummary />
            <CheckoutForm onOrderComplete={handleOrderComplete} />
          </div>
        )}
      </div>
    </div>
  );
}
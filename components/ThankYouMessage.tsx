'use client';

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { CheckCircle, Home } from 'lucide-react';
import { clearCart } from '@/redux/features/cartSlice';
import { motion } from 'framer-motion';
import { useEffect } from 'react';


export default function ThankYouMessage() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear cart when user lands here
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/10 p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md bg-card rounded-2xl shadow-lg p-8"
      >
        {/* Checkmark Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
        >
          <CheckCircle className="h-10 w-10 text-primary" />
        </motion.div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Thank You!</h1>
          <p className="text-muted-foreground mt-2">
            Your order has been placed successfully.
          </p>
        </div>

        {/* Extra Info */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-sm text-muted-foreground mt-6 text-center"
        >
          A confirmation email has been sent to your inbox. You’ll receive updates about your order soon.
        </motion.p>

        {/* Back to Shop Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex justify-center"
        >
          <Link href="/" passHref>
            <button className="mt-6 flex items-center gap-2  px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition cursor-pointer bg-amber-600 text-white">
              <Home className="h-5 w-5" />
              Back to Shop
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

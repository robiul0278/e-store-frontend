'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, CreditCard, CheckCircle2, DollarSign,  } from 'lucide-react';
import { toast } from 'react-toastify';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  notes: z.string().optional(),
  paymentMethod: z.union([
    z.literal('card'),
    z.literal('paypal'),
    z.literal('demo'),
  ]),
});


type CheckoutFormValues = z.infer<typeof formSchema>;

interface CheckoutFormProps {
  onOrderComplete: () => void;
}

export default function CheckoutForm({ onOrderComplete }: CheckoutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: '', email: '', notes: '', paymentMethod: 'demo' },
  });

  const paymentMethod = watch('paymentMethod');

  const handleFormSubmit = (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Order placed successfully!');
      onOrderComplete();
    }, 1500);
  };

  return (
    <div className=" dark:bg-gray-800 shadow-xl rounded-2xl p-6 md:p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Checkout</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            {...register('fullName')}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Email Address</label>
          <input
            type="email"
            placeholder="john.doe@example.com"
            {...register('email')}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Special Instructions</label>
          <textarea
            placeholder="Any special requests?"
            {...register('notes')}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition border-gray-300"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Payment Method</label>
          <div className="space-y-3">
            <label
              className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all hover:shadow-md ${
                paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <input type="radio" value="card" {...register('paymentMethod')} className="cursor-pointer" />
              <CreditCard className="w-5 h-5 text-blue-500" />
              Pay with Card
            </label>

            <label
              className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all hover:shadow-md ${
                paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <input type="radio" value="paypal" {...register('paymentMethod')} className="cursor-pointer" />
              <DollarSign className="w-5 h-5 text-blue-600" />
              Pay with PayPal
            </label>

            <label
              className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all hover:shadow-md ${
                paymentMethod === 'demo' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <input type="radio" value="demo" {...register('paymentMethod')} className="cursor-pointer" />
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Demo Checkout
            </label>
          </div>
          {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Place Order'}
        </button>
      </form>
    </div>
  );
}

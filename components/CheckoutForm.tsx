'use client';

import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { TGenericErrorResponse, TOrder } from '@/types/types';
import { useCreateOrdersMutation } from '@/redux/api/api';
import { useAppSelector } from '@/redux/hooks';
import { selectOrderData, selectSubtotal } from '@/redux/features/cartSlice';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

interface CheckoutFormProps {
  onOrderComplete: () => void;
}


export default function CheckoutForm({ onOrderComplete}: CheckoutFormProps) {
  const [CreateOrder] = useCreateOrdersMutation()
  const { products } = useAppSelector(selectOrderData);
  const subtotal = useSelector(selectSubtotal);
  const { user } = useSelector((state: RootState) => state.auth);

  const { register, setError, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<TOrder>({
    defaultValues: {
      shippingAddress: '',
      phone: '',
      paymentMethod: 'demo'
    },
  });
  const paymentMethod = watch('paymentMethod');

  const handleOrderSubmit = async (data: TOrder) => {
    const orderId = Math.floor(100000 + Math.random() * 900000).toString();
    const orderData = {
      user: user?._id,
      products,
      totalAmount: subtotal,
      shippingAddress: data.shippingAddress,
      phone: data.phone,
      paymentMethod: data.paymentMethod,
      orderId,
    }
    try {
      const response = await CreateOrder(orderData).unwrap();
      toast.success(response.message);
      onOrderComplete();
    } catch (error: unknown) {
      const err = error as { data: TGenericErrorResponse };
      console.log(err);
      if (err?.data?.errorSources && Array.isArray(err.data.errorSources)) {
        err.data.errorSources.forEach(({ path, message }) => {
          setError(path as keyof TOrder, {
            type: "server",
            message,
          });
        });
      } else {
        toast.error(err?.data?.message);
      }
    }
  };

  return (
    <div className="dark:bg-gray-800 shadow-xl rounded-2xl p-6 md:p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Checkout</h2>

      <form onSubmit={handleSubmit(handleOrderSubmit)} className="space-y-5">
        {/* Shipping Address */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Shipping Address
          </label>
          <input
            type="text"
            placeholder="Enter your address"
            {...register('shippingAddress')}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.shippingAddress ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors.shippingAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="e.g. 017XXXXXXXX"
            {...register('phone')}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
            Payment Method
          </label>
          <label
            className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all hover:shadow-md ${paymentMethod === 'demo'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 dark:border-gray-600'
              }`}
          >
            <input
              type="radio"
              value="demo"
              {...register('paymentMethod')}
              className="cursor-pointer"
            />
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Demo Checkout
          </label>
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-2 bg-yellow-600 text-white font-semibold rounded-xl hover:bg-yellow-700 transition disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Place Order'}
        </button>
      </form>
    </div>
  );
}

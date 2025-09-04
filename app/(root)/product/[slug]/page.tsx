"use client";

import { useParams } from "next/navigation";
import { useGetSingleProductQuery } from "@/redux/api/api";
import ImageGallery from "@/components/ImageGallery";
import { DollarSign, LucideShoppingCart, Plus} from "lucide-react";
import { addToCart, selectCartItems } from "@/redux/features/cartSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartModal from "@/components/CartModal";

interface ProductData {
  _id: string;
  name: string;
  photos: string[];
  description: string;
  price: number;
  discount: number;
  discountPrice: number;
  inStock: boolean;
  status: string;
  categories: string[];
}

export default function ProductDetails() {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);
    const [isCartOpen, setIsCartOpen] = useState(false);
  const params = useParams();
  const slug = params?.slug;

  const cartItems = useSelector(selectCartItems);

  const { data: productResponse, isLoading, isError } = useGetSingleProductQuery(slug || "");
  const product: ProductData | undefined = productResponse?.data;
  if (isLoading) return <p className="text-center py-20">Loading...</p>;
  if (isError || !product) return <p className="text-center py-20">Product not found</p>;
  const { _id, name, photos = [], description, price, discount, discountPrice, inStock, categories = [] } = product;

  const isInCart = cartItems.some(item => item.id === _id);

  const handleAddToCart = () => {
    const itemToAdd = {
      id: _id,
      name: name,
      photo: photos[0],
      price: discountPrice || 0,
      quantity,
    };
    dispatch(addToCart(itemToAdd));
    toast.success(`Added ${quantity} ${name}`);
    setQuantity(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Image Gallery */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden p-4">
          <ImageGallery photos={photos} name={name} />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Title & Categories */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{name}</h1>

            {categories.length > 0 && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Categories: <span className="font-medium text-gray-700 dark:text-gray-200">{categories.join(", ")}</span>
              </p>
            )}

            {/* Price */}
            <div className="mt-4 flex items-center space-x-4">
              {discount > 0 ? (
                <>
                  <div className="flex items-center  text-red-600">
                    <DollarSign className="w-5 h-5 mt-1" />
                    <p className="text-3xl font-bold">{discountPrice}</p>
                  </div>
                  <div className="flex items-center  text-gray-400 line-through">
                    <DollarSign className="w-4 h-4" />
                    <p className="text-lg">{price}</p>
                  </div>
                  <span className="px-3 py-1 text-sm bg-red-100 text-red-600 font-semibold rounded-full shadow-sm">
                    -{discount}%
                  </span>
                </>
              ) : (
                <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <DollarSign className="w-5 h-5" />
                  <p className="text-3xl font-bold">৳{price}</p>
                </div>
              )}
            </div>

            {/* Stock Badge */}
            <div className="mt-3">
              <span className={`px-4 py-1 text-sm rounded-full font-medium shadow-sm ${inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                }`}>
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            {description && (
              <div className="mt-6 text-gray-700 dark:text-gray-300">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Description</h2>
                <p className="mt-2 leading-relaxed">{description}</p>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="mt-6">
            {isInCart ? (
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center justify-center gap-3 px-6 py-2 bg-yellow-600 hover:bg-yellow-600 text-white font-semibold rounded-xl shadow transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <LucideShoppingCart className="w-5 h-5" />
                View Cart
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-3 px-6 py-2 bg-yellow-600 hover:bg-yellow-600 text-white font-semibold rounded-xl shadow transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>

  );
}

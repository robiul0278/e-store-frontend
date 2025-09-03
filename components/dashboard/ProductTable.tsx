"use client";

import Link from "next/link";
import { Edit, Trash2, View, BadgeDollarSign } from "lucide-react";
import { TProduct} from "@/types/types";

type ProductTableProps = {
  products?: TProduct[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted/60">
          <tr>
            <th className="text-left p-3 font-semibold text-foreground">Product Name</th>
            <th className="text-left p-3 font-semibold text-foreground">Price</th>
            <th className="text-left p-3 font-semibold text-foreground">Discount</th>
            <th className="text-left p-3 font-semibold text-foreground">Discount Price</th>
            <th className="text-left p-3 font-semibold text-foreground">In Stock</th>
            <th className="text-right p-3 font-semibold text-foreground">Status</th>
            <th className="text-right p-3 font-semibold text-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr key={index} className="border-t hover:bg-muted/50">
              <td className="p-3 align-top">
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground">{product.name}</h3>
                </div>
              </td>
              <td className="p-3 align-top">
                <div className="flex items-center text-muted-foreground">
                  <BadgeDollarSign className="h-4 w-4 mr-1" />
                  {product.price}
                </div>
              </td>
              <td className="p-3 align-top">
                <div className="flex items-center text-muted-foreground">
                  <BadgeDollarSign className="h-4 w-4 mr-1" />
                  {product.discount}
                </div>
              </td>
              <td className="p-3 align-top">
                <div className="flex items-center text-muted-foreground">
                  <BadgeDollarSign className="h-4 w-4 mr-1" />
                  {product.discountPrice}
                </div>
              </td>
              <td className="p-3 align-top">
                <div className="flex items-center text-muted-foreground">
                  {product.inStock ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </div>
              </td>
              <td className="p-3 flex justify-end  align-top">
                <div className="flex items-center text-muted-foreground">{product.status}</div>
              </td>
              <td className="p-3 align-top">
                <div className="flex justify-end gap-2">
                  <Link href={`/circular/${product.slug}`}>
                    <span
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-green-50 dark:hover:bg-green-900 transition"
                      role="button"
                      aria-label="View"
                      title="View"
                    >
                      <View className="h-4 w-4" />
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => onEdit(product.slug)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-green-50 dark:hover:bg-green-900 transition cursor-pointer"
                    aria-label="Edit"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(product._id)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-red-50 dark:hover:bg-red-900 text-red-600 border-red-200 transition cursor-pointer"
                    aria-label="Delete"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {/* Empty state */}
          {(!products || products.length === 0) && (
            <tr>
              <td colSpan={7} className="p-6 text-center text-muted-foreground">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

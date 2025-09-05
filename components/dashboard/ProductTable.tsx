"use client";

import Link from "next/link";
import { Edit, Trash2, View, BadgeDollarSign } from "lucide-react";
import { TProduct } from "@/types/types";

type ProductTableProps = {
    products?: TProduct[];
    onDelete: (id: string) => void;
    onStockUpdate: (id: string, inStock: boolean) => void;
    onStatusUpdate: (id: string, status: string) => void;
};

export default function ProductTable({ products, onDelete, onStockUpdate, onStatusUpdate }: ProductTableProps) {
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
                        <th className="text-left p-3 font-semibold text-foreground">Status</th>
                        <th className="text-center p-3 font-semibold text-foreground">Action</th>
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
                                <select
                                    value={product.inStock ? "true" : "false"}  // boolean কে string এ convert
                                    onChange={(e) => {
                                        const booleanValue = e.target.value === "true"; // string → boolean
                                        onStockUpdate(product._id, booleanValue);
                                    }}
                                    className={`appearance-none w-40 h-9 pl-9 pr-9 rounded-md border text-foreground focus:outline-none focus:ring-2 focus:ring-ring
      ${product.inStock ? "bg-gray-100 dark:bg-gray-900" : "bg-blue-100 dark:bg-amber-600"}`}
                                >
                                    <option value="true">In Stock</option>
                                    <option value="false">Out of Stock</option>
                                </select>
                            </td>
                            <td className="p-3 align-top">
                                <select
                                    value={product.status}
                                    onChange={(e) => onStatusUpdate(product._id, e.target.value)}
                                    className={`appearance-none w-40 h-9 pl-9 pr-9 rounded-md border text-foreground focus:outline-none focus:ring-2 focus:ring-ring
      ${product.status === "active" ? "bg-gray-100 dark:bg-gray-900" : ""}
      ${product.status === "inactive" ? "bg-blue-100 dark:bg-amber-600" : ""}`}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </td>
                            <td className="p-3 align-top">
                                <div className="flex justify-end gap-2">
                                    <Link href={`/product/${product.slug}`}>
                                        <span
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-green-50 dark:hover:bg-green-900 transition"
                                            role="button"
                                            aria-label="View"
                                            title="View"
                                        >
                                            <View className="h-4 w-4" />
                                        </span>
                                    </Link>

                                    <Link href={`/dashboard/edit-product/${product.slug}`}>
                                        <button
                                            type="button"
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-green-50 dark:hover:bg-green-900 transition cursor-pointer"
                                            aria-label="Edit"
                                            title="Edit"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                    </Link>

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

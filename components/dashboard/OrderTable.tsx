"use client";

import { Trash2,} from "lucide-react";
import {TOrderTable } from "@/types/types";

type ManageOrderTableProps = {
  orders?: TOrderTable[];
  onDelete: (id: string) => void;
  onStatusUpdate: (id: string, status: string) => void;
  onPaymentUpdate: (id: string, status: string) => void;
};

export default function OrderTable({ orders, onDelete, onStatusUpdate, onPaymentUpdate }: ManageOrderTableProps) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted/60">
          <tr>
            <th className="text-left p-3 font-semibold text-foreground">Order ID</th>
            <th className="text-left p-3 font-semibold text-foreground">User</th>
            <th className="text-left p-3 font-semibold text-foreground">Products</th>
            <th className="text-left p-3 font-semibold text-foreground">Total Amount</th>
            <th className="text-left p-3 font-semibold text-foreground">Status</th>
            <th className="text-left p-3 font-semibold text-foreground">Payment Status</th>
            <th className="text-left p-3 font-semibold text-foreground">Phone</th>
            <th className="text-left p-3 font-semibold text-foreground">Shipping Address</th>
            <th className="text-right p-3 font-semibold text-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={index} className="border-t hover:bg-muted/50 align-top">
              <td className="p-3">{order.orderId ||"N/A" }</td>
              <td className="p-3">{order.user?.name || "N/A"}</td>

              {/* Products Column */}
              <td className="p-3">
                <ul className="space-y-1">
                  {order.products.map((p, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{p.product?.name || "Product"}</span>
                      <span>
                        {p.quantity} × ${p.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </td>

              <td className="p-3">${order.totalAmount.toFixed(2)}</td>

              <td className="p-3">
                <select
                  value={order.status}
                  onChange={(e) => onStatusUpdate(order._id, e.target.value)}
                  className={`appearance-none w-40 h-9 pl-2 pr-2 rounded-md border text-foreground focus:outline-none focus:ring-2 focus:ring-ring
                    ${order.status === "pending" ? "bg-yellow-100 dark:bg-yellow-600" : ""}
                    ${order.status === "confirmed" ? "bg-blue-100 dark:bg-blue-600" : ""}
                    ${order.status === "shipped" ? "bg-orange-100 dark:bg-orange-600" : ""}
                    ${order.status === "delivered" ? "bg-green-100 dark:bg-green-600" : ""}
                    ${order.status === "cancelled" ? "bg-red-100 dark:bg-red-600" : ""}
                  `}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>

              <td className="p-3">
                <select
                  value={order.paymentStatus}
                  onChange={(e) => onPaymentUpdate(order._id, e.target.value)}
                  className={`appearance-none w-40 h-9 pl-2 pr-2 rounded-md border text-foreground focus:outline-none focus:ring-2 focus:ring-ring
                    ${order.paymentStatus === "pending" ? "bg-yellow-100 dark:bg-yellow-600" : ""}
                    ${order.paymentStatus === "paid" ? "bg-blue-100 dark:bg-blue-600" : ""}
                    ${order.paymentStatus === "failed" ? "bg-orange-100 dark:bg-orange-600" : ""}
                  `}
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                </select>
              </td>

              <td className="p-3">{order.phone}</td>
              <td className="p-3">{order.shippingAddress}</td>

              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onDelete(order._id)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-red-50 dark:hover:bg-red-900 text-red-600 border-red-200 transition cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {!orders || orders.length === 0 ? (
            <tr>
              <td colSpan={9} className="p-6 text-center text-muted-foreground">
                No orders available.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

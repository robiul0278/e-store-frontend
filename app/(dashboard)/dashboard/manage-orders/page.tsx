"use client";

import { useState } from "react";
import { Search, Filter, Loader, } from "lucide-react";
import { useDeleteOrderMutation, useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "@/redux/api/api";
import { TGenericErrorResponse, } from "@/types/types";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import Swal from 'sweetalert2'
import OrderTable from "@/components/dashboard/OrderTable";
import TableSkeleton from "@/components/TableSkeleton";

export default function AllUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const params = {
    ...(selectedStatus && { status: selectedStatus }),
    ...(selectedPaymentStatus && { paymentStatus: selectedPaymentStatus }),
    ...(startDate && endDate && { startDate, endDate }),
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: searchTerm,
  };
  const [DeleteOrder] = useDeleteOrderMutation();
  const [UpdateStatus] = useUpdateOrderStatusMutation();
  const { data, isLoading } = useGetAllOrdersQuery(params);

 if (isLoading) return <TableSkeleton/> 

  const tableData = data?.data.result;

  // Reset to first page when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    if (value === "all") {
      setSelectedStatus("");
    } else {
      setSelectedStatus(value);
    }
    setCurrentPage(1);
  };
  const handlePaymentStatus = (value: string) => {
    if (value === "all") {
      setSelectedPaymentStatus("");
    } else {
      setSelectedPaymentStatus(value);
    }
    setCurrentPage(1);
  };


  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {  // <-- async here
      if (result.isConfirmed) {
        try {
          const res = await DeleteOrder(id).unwrap();
          console.log(res);
          if (res?.data.deletedCount === 1) {
            toast.success(`${res.message}`);
          } else {
            toast.error(`${res.message}`);
          }
        } catch (err: unknown) {
          const error = err as { data: TGenericErrorResponse };
          toast.error(error?.data?.message || "Delete failed.");
        }
      }
    });
  };

  const handleUpdateStatus = (id: string, status: string) => {
    const userData = { id, status }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!"
    }).then(async (result) => {  // <-- async here
      if (result.isConfirmed) {
        try {
          const res = await UpdateStatus(userData).unwrap();
          if (res?.data.modifiedCount === 1) {
            toast.success(`${res.message}`);
          } else {
            toast.error(`${res.message}`);
          }
        } catch (err: unknown) {
          const error = err as { data: TGenericErrorResponse };
          toast.error(error?.data?.message || "Update failed.");
        }
      }
    });
  };
  const handleUpdatePaymentStatus = (id: string, paymentStatus: string) => {
    const userData = { id, paymentStatus }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!"
    }).then(async (result) => {  // <-- async here
      if (result.isConfirmed) {
        try {
          const res = await UpdateStatus(userData).unwrap();
          if (res?.data.modifiedCount === 1) {
            toast.success(`${res.message}`);
          } else {
            toast.error(`${res.message}`);
          }
        } catch (err: unknown) {
          const error = err as { data: TGenericErrorResponse };
          toast.error(error?.data?.message || "Update failed.");
        }
      }
    });
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Order Overview</h1>
          <p className="text-sm mt-1 text-muted-foreground">
            A complete list of all your orders with easy management tools.
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">Date:</p>
          <p className="text-sm font-medium text-foreground">
            {new Date().toLocaleDateString("en-BD")}
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-5 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">All Users</h2>

            <div className="flex items-center gap-2">
              {/* Search */}
              <label className="relative block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by orderId..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 w-64 h-9 rounded-md border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </label>

              {/* Status Select */}
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className={`appearance-none w-52 h-9 pl-9 pr-9 rounded-md border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring
                  `}
                >
                  <option value="all">Order Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                {/* caret */}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ▾
                </span>
              </div>
              {/* Payment Status Select */}
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </div>
                <select
                  value={selectedPaymentStatus}
                  onChange={(e) => handlePaymentStatus(e.target.value)}
                  className={`appearance-none w-52 h-9 pl-9 pr-9 rounded-md border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring
                  `}
                >
                  <option value="all">Payment Status</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                </select>
                {/* caret */}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ▾
                </span>
              </div>
              {/* Date Filter */}
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-9 rounded-md border bg-background text-foreground px-2"
                />
                <span>to</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-9 rounded-md border bg-background text-foreground px-2"
                />
              </div>

            </div>
          </div>
        </div>
        {/* Table */}
        <div className="p-5">
          <OrderTable
            orders={tableData}
            onDelete={handleDelete}
            onStatusUpdate={handleUpdateStatus}
            onPaymentUpdate={handleUpdatePaymentStatus}
          />
          {/* Pagination */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-9 w-24 rounded-md border bg-background text-foreground px-2 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <Pagination
              totalPage={data?.data.meta.totalPage}
              page={currentPage}
              setPageAction={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

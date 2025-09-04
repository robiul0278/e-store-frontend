"use client";

import { useState } from "react";
import { Search, Filter, Loader, } from "lucide-react";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateRoleMutation } from "@/redux/api/api";
import { TGenericErrorResponse, TUsers } from "@/types/types";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import Swal from 'sweetalert2'
import UserTable from "@/components/dashboard/UserTable";

export default function AllUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const params = {
    ...(selectedUsers && { role: selectedUsers }),
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: searchTerm,
  };
  const [DeleteProduct] = useDeleteUserMutation();
  const [UpdateRole] = useUpdateRoleMutation();
  const { data, isLoading } = useGetAllUsersQuery(params);

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2 text-muted-foreground">
        <Loader className="animate-spin h-5 w-5" />
        <p className="text-sm">Users is loading...</p>
      </div>
    );

  const tableData = data?.data.result;

  // Reset to first page when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleRoleChange = (value: string) => {
    if (value === "all") {
      setSelectedRole("");
    } else {
      setSelectedRole(value);
    }
    setCurrentPage(1);
  };


  const handleDelete = (id:string) => {
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
          const res = await DeleteProduct(id).unwrap();
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

  const handleUpdateRole = (id: string,role: string) => {
    const userData = {id,role}

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
          const res = await UpdateRole(userData).unwrap();
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
          <h1 className="text-3xl font-bold text-foreground">User Overview</h1>
          <p className="text-sm mt-1 text-muted-foreground">
            A complete list of all your users with easy management tools.
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
                  placeholder="search users..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 w-64 h-9 rounded-md border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </label>

              {/* Category Select */}
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </div>
                <select
                  value={selectedUsers || "all"}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  className="appearance-none w-52 h-9 pl-9 pr-9 rounded-md border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Users</option>
                  <option value="admin">Admin</option>
                  <option value="superAdmin">superAdmin</option>
                </select>
                {/* caret */}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ▾
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="p-5">
          <UserTable
            users={tableData}
            onDelete={handleDelete}
            onRoleUpdate={handleUpdateRole}
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

"use client";

import { Trash2 } from "lucide-react";
import { TUsers } from "@/types/types";

type TableProps = {
    users?: TUsers[];
    onDelete: (id: string) => void;
    onRoleUpdate: (id: string, role: string) => void;
};

export default function UserTable({ users, onDelete, onRoleUpdate }: TableProps) {
    return (
        <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-muted/60">
                    <tr>
                        <th className="text-left p-3 font-semibold text-foreground">User Name</th>
                        <th className="text-left p-3 font-semibold text-foreground">Email</th>
                        <th className="text-left p-3 font-semibold text-foreground">Role</th>
                        <th className="text-right p-3 font-semibold text-foreground">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr key={index} className="border-t hover:bg-muted/50">
                            <td className="p-3 align-top">
                                <div className="space-y-1">
                                    <h3 className="font-medium text-foreground">{user.name}</h3>
                                </div>
                            </td>
                            <td className="p-3  align-top">
                                <div className="flex items-center text-muted-foreground">{user.email}</div>
                            </td>
                            <td className="p-3 align-top">
                                <select
                                    value={user.role}
                                    onChange={(e) => onRoleUpdate(user._id, e.target.value)}
                                    className={`appearance-none w-40 h-9 pl-9 pr-9 rounded-md border text-foreground focus:outline-none focus:ring-2 focus:ring-ring
      ${user.role === "user" ? "bg-gray-100 dark:bg-gray-900" : ""}
      ${user.role === "admin" ? "bg-blue-100 dark:bg-blue-600" : ""}
      ${user.role === "superAdmin" ? "bg-green-100 dark:bg-green-600" : ""}
    `}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="superAdmin">Super Admin</option>
                                </select>
                            </td>

                            <td className="p-3 align-top">
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => onDelete(user._id)}
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
                    {(!users || users.length === 0) && (
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

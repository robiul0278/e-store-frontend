"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";

export default function NavProfile() {
    const { user } = useSelector((state: RootState) => state.auth);
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        dispatch(logout());
        router.replace('/');
    };

    // outside click handle
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            {/* Profile Avatar */}
            <button onClick={() => setOpen(!open)} className="flex items-center">
                <Image
                    src={user?.photo || "/user.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border cursor-pointer"
                    height={100}
                    width={100}
                />
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 mt-3 w-44 dark:bg-gray-900 border rounded-lg shadow-lg py-1 z-50">
                    {(user?.role === "admin" || user?.role === "superAdmin") && (
                        <Link
                            href="/dashboard"
                            className="block px-4 py-1 text-sm text-gray-200 hover:bg-gray-800"
                        >
                            Dashboard
                        </Link>
                    )}

                    {user && (
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-1 text-sm dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                        >
                            Log out
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

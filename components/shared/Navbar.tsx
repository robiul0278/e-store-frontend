'use client';

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingCart, X } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { useCart } from "@/redux/hooks/useCart";
import CartModal from "../CartModal";

const menuItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

const Navbar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { itemCount } = useCart();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        dispatch(logout());
        router.replace('/');
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="w-full border-b sticky top-0 z-50 bg-white dark:bg-slate-900">
            <nav className="max-w-7xl mx-auto px-2 lg:px-0">
                <div className="flex justify-between items-center h-12">
                    {/* Logo */}
                    <Link href="/">
                        <span className="text-xl sm:text-2xl font-bold">E-STORE</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center justify-center flex-grow gap-6">
                        {menuItems.map((item) => (
                            <Link key={item.name} href={item.href} className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200 relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[2px] after:bg-gray-500 after:transition-all hover:after:w-full">
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Right Side */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            className='relative  cursor-pointer'
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link href="/dashboard">
                                        <span className="cursor-pointer text-sm px-2 py-1 rounded-md border">
                                            Dashboard
                                        </span>
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer text-sm px-2 py-1 rounded-md border"
                                >
                                    LogOut
                                </button>
                            </>
                        ) : (
                            <button
                                className="cursor-pointer text-sm px-2 py-1 rounded-md border"
                            >
                                Login/Register
                            </button>
                        )}
                    </div>

                    {/* Mobile Right Side: Dark / Bookmark / Toggle */}
                    <div className="md:hidden flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            className='relative  cursor-pointer'
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                        <button onClick={toggleMenu} aria-label="Toggle Menu" className="cursor-pointer">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden px-4 pb-4"
                    >
                        <div className="flex flex-col gap-3 pt-4">
                            {menuItems.map((item) => (
                                <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                                    <span className="block text-base font-medium transition">
                                        {item.name}
                                    </span>
                                </Link>
                            ))}
                            {user ? (
                                <>
                                    {user.role === 'admin' || user.role === 'superAdmin' && (
                                        <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                            <span className="cursor-pointer text-sm px-2 py-1 rounded-md border">
                                                Dashboard
                                            </span>
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        className="mt-2 cursor-pointer text-sm px-2 py-1 rounded-md border"
                                    >
                                        LogOut
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="cursor-pointer text-sm px-2 py-1 rounded-md border"
                                >
                                    Login/Register
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </header>
    );
};

export default Navbar;
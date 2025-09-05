"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  BarChart3,
  Building2,
  FileText,
  Menu,
  Users,
  Home,
  X,
  ListOrderedIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarNavItems = [
  {
    title: 'Analytics',
    href: '/dashboard',
    icon: BarChart3,
  },
  {
    title: 'All Products',
    href: '/dashboard/products',
    icon: Building2,
  },
  {
    title: 'Create Product',
    href: '/dashboard/create-product',
    icon: FileText,
  },
  {
    title: 'Manage Orders',
    href: '/dashboard/manage-orders',
    icon: ListOrderedIcon,
  },
  {
    title: 'Manage Users',
    href: '/dashboard/manage-users',
    icon: Users,
  },
  {
    title: 'Home',
    href: '/',
    icon: Home,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn('pb-12 min-h-screen', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <div className="flex items-center px-3 py-2 mb-6">
              <Building2 className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <nav className="space-y-2">
              {sidebarNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors',
                    pathname === item.href
                      ? 'bg-accent text-accent-foreground'
                      : 'transparent'
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}


export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open Menu</span>
      </button>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button
            className="p-1"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Sidebar content */}
        <div className="overflow-y-auto h-[calc(100vh-4rem)] p-4">
          <Sidebar />
        </div>
      </div>
    </>
  );
}

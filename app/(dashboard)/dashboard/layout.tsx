'use client';

import { MobileSidebar, Sidebar } from '@/components/Sidebar';
import { ROLES } from '@/constants/roles';
import PrivateRoute from '@/utils/PrivateRoute';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <PrivateRoute role={ROLES.admin || ROLES.superAdmin}>
      <div className="min-h-screen flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 border-r bg-background">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1 md:ml-64">
          {/* <Header /> */}
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4">
              <MobileSidebar />
              <div className="flex flex-1 items-center space-x-2 justify-end">
                <nav className="flex items-center space-x-2">
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1 space-y-4 p-4 md:p-6 pt-6">
            {children}
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
}
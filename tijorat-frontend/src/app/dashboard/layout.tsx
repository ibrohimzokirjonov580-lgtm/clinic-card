'use client';

import { motion } from 'framer-motion';
import { Home, ShoppingCart, Users, Package, Settings, Bell, Search, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 80 }}
        className="bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-20"
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="font-bold text-lg text-gray-900 overflow-hidden whitespace-nowrap">TIJORAT</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 mx-auto">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          <NavItem href="/dashboard" icon={<Home />} label="Bosh sahifa" active={pathname === '/dashboard'} sidebarOpen={sidebarOpen} />
          <NavItem href="/dashboard/orders" icon={<ShoppingCart />} label="Buyurtmalar" active={pathname === '/dashboard/orders'} sidebarOpen={sidebarOpen} />
          <NavItem href="/dashboard/products" icon={<Package />} label="Mahsulotlar" active={pathname === '/dashboard/products'} sidebarOpen={sidebarOpen} />
          <NavItem href="/dashboard/customers" icon={<Users />} label="Mijozlar" active={pathname === '/dashboard/customers'} sidebarOpen={sidebarOpen} />
          <NavItem href="/dashboard/settings" icon={<Settings />} label="Sozlamalar" active={pathname === '/dashboard/settings'} sidebarOpen={sidebarOpen} />
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" placeholder="Qidirish..." className="bg-transparent border-none outline-none w-full text-sm" />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-indigo-100 rounded-full border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, active, sidebarOpen }: any) {
  return (
    <Link href={href} className={`flex items-center px-3 py-3 rounded-xl transition-colors ${active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
      <span className="flex-shrink-0">{icon}</span>
      {sidebarOpen && <span className="ml-3 font-medium whitespace-nowrap">{label}</span>}
    </Link>
  );
}
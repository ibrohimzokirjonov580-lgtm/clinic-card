'use client';

import { motion } from 'framer-motion';
import { Home, ShoppingCart, Users, Package, Settings, Bell, Search, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
              <span className="font-bold text-lg text-gray-900">TIJORAT</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavItem icon={<Home />} label="Bosh sahifa" active sidebarOpen={sidebarOpen} />
          <NavItem icon={<ShoppingCart />} label="Buyurtmalar" sidebarOpen={sidebarOpen} />
          <NavItem icon={<Package />} label="Mahsulotlar" sidebarOpen={sidebarOpen} />
          <NavItem icon={<Users />} label="Mijozlar" sidebarOpen={sidebarOpen} />
          <NavItem icon={<Settings />} label="Sozlamalar" sidebarOpen={sidebarOpen} />
        </nav>
      </motion.aside>

      {/* Main Content */}
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

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Bugungi holat</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard title="Savdo" value="2,450,000 UZS" increase="+15%" icon={<ShoppingCart className="w-6 h-6 text-white" />} color="bg-indigo-600" />
            <StatCard title="Buyurtmalar" value="124" increase="+8%" icon={<Package className="w-6 h-6 text-white" />} color="bg-orange-500" />
            <StatCard title="Yangi Mijozlar" value="32" increase="+12%" icon={<Users className="w-6 h-6 text-white" />} color="bg-green-500" />
            <StatCard title="Saytga kirish" value="840" increase="+5%" icon={<Home className="w-6 h-6 text-white" />} color="bg-blue-500" />
          </div>

          {/* Table Placeholder */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900 text-lg">So'nggi buyurtmalar</h2>
              <button className="text-indigo-600 text-sm font-medium">Barchasini ko'rish</button>
            </div>
            <div className="p-6">
              <div className="h-64 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                Jadval ma'lumotlari shu yerda chiqadi (API orqali)
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, sidebarOpen }: any) {
  return (
    <a href="#" className={`flex items-center px-3 py-3 rounded-xl transition-colors ${active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
      <span className="flex-shrink-0">{icon}</span>
      {sidebarOpen && <span className="ml-3 font-medium">{label}</span>}
    </a>
  );
}

function StatCard({ title, value, increase, icon, color }: any) {
  return (
    <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
        <span className="text-sm font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">{increase}</span>
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </motion.div>
  );
}
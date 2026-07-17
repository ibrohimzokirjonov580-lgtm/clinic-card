'use client';

import { motion } from 'framer-motion';
import { Home, ShoppingCart, Users, Package } from 'lucide-react';
import Link from 'next/link';

export default function DashboardHome() {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Bugungi holat</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Savdo" value="2,450,000 UZS" increase="+15%" icon={<ShoppingCart className="w-6 h-6 text-white" />} color="bg-indigo-600" />
        <StatCard title="Buyurtmalar" value="124" increase="+8%" icon={<Package className="w-6 h-6 text-white" />} color="bg-orange-500" />
        <StatCard title="Yangi Mijozlar" value="32" increase="+12%" icon={<Users className="w-6 h-6 text-white" />} color="bg-green-500" />
        <StatCard title="Saytga kirish" value="840" increase="+5%" icon={<Home className="w-6 h-6 text-white" />} color="bg-blue-500" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-900 text-lg">So'nggi buyurtmalar</h2>
          <Link href="/dashboard/orders" className="text-indigo-600 text-sm font-medium hover:underline">Barchasini ko'rish</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="px-6 py-3 font-medium">Buyurtma ID</th>
                <th className="px-6 py-3 font-medium">Mijoz</th>
                <th className="px-6 py-3 font-medium">Sana</th>
                <th className="px-6 py-3 font-medium">Summa</th>
                <th className="px-6 py-3 font-medium">Holat</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { id: '#ORD-001', name: 'Alisher Vohidov', date: 'Bugun, 14:30', amount: '120,000 UZS', status: 'Yangi', statusColor: 'bg-blue-100 text-blue-700' },
                { id: '#ORD-002', name: 'Malika Karimova', date: 'Bugun, 12:15', amount: '45,000 UZS', status: 'Jarayonda', statusColor: 'bg-orange-100 text-orange-700' },
                { id: '#ORD-003', name: 'Jasur Bek', date: 'Bugun, 10:05', amount: '350,000 UZS', status: 'Yakunlandi', statusColor: 'bg-green-100 text-green-700' },
                { id: '#ORD-004', name: 'Zarina M.', date: 'Kecha, 18:40', amount: '85,000 UZS', status: 'Bekor qilindi', statusColor: 'bg-red-100 text-red-700' },
              ].map((order, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-600">{order.name}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
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
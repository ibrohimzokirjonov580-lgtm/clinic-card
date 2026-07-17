'use client';

import { Search, Filter, MoreHorizontal, FileDown } from 'lucide-react';

export default function OrdersPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Barcha Buyurtmalar</h1>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
          <FileDown className="w-4 h-4" />
          Eksport qilish
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4 items-center bg-gray-50/50">
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" placeholder="Buyurtma raqami yoki mijoz ismi..." className="bg-transparent border-none outline-none w-full text-sm" />
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filtr
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Buyurtma ID</th>
                <th className="px-6 py-4 font-medium">Mijoz</th>
                <th className="px-6 py-4 font-medium">Sana</th>
                <th className="px-6 py-4 font-medium">Summa</th>
                <th className="px-6 py-4 font-medium">Holat</th>
                <th className="px-6 py-4 font-medium">Amallar</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { id: '#ORD-001', name: 'Alisher Vohidov', date: '14 Iyul, 14:30', amount: '120,000 UZS', status: 'Yangi', statusColor: 'bg-blue-100 text-blue-700' },
                { id: '#ORD-002', name: 'Malika Karimova', date: '14 Iyul, 12:15', amount: '45,000 UZS', status: 'Jarayonda', statusColor: 'bg-orange-100 text-orange-700' },
                { id: '#ORD-003', name: 'Jasur Bek', date: '13 Iyul, 10:05', amount: '350,000 UZS', status: 'Yakunlandi', statusColor: 'bg-green-100 text-green-700' },
                { id: '#ORD-004', name: 'Zarina M.', date: '13 Iyul, 18:40', amount: '85,000 UZS', status: 'Bekor qilindi', statusColor: 'bg-red-100 text-red-700' },
                { id: '#ORD-005', name: 'Doston T.', date: '12 Iyul, 09:20', amount: '210,000 UZS', status: 'Yakunlandi', statusColor: 'bg-green-100 text-green-700' },
              ].map((order, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{order.name}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Jami: 124 ta buyurtma</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">Oldingi</button>
            <button className="px-3 py-1 border border-gray-200 bg-indigo-50 text-indigo-600 rounded font-medium">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Keyingi</button>
          </div>
        </div>
      </div>
    </>
  );
}
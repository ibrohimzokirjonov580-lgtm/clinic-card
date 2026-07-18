'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Plus, Filter, Phone, Star, TrendingUp, AlertCircle, Wallet, X, Clock } from 'lucide-react';
import { useState } from 'react';

type DebtStatus = 'UNPAID' | 'PARTIAL' | 'PAID';

interface Customer {
  id: string;
  fullName: string;
  phone: string;
  totalSpent: number;
  loyaltyPoints: number;
  tags: string[];
  debtAmount: number;
  debtStatus: DebtStatus;
  lastVisit: string;
}

const mockCustomers: Customer[] = [
  { id: 'C-001', fullName: 'Aziz Raxmatov', phone: '+998 90 123 45 67', totalSpent: 12500000, loyaltyPoints: 450, tags: ['VIP', 'Ulgurji'], debtAmount: 0, debtStatus: 'PAID', lastVisit: 'Bugun, 14:30' },
  { id: 'C-002', fullName: 'Malika Karimova', phone: '+998 93 987 65 43', totalSpent: 3200000, loyaltyPoints: 120, tags: ['Doimiy'], debtAmount: 450000, debtStatus: 'UNPAID', lastVisit: 'Kecha, 18:15' },
  { id: 'C-003', fullName: 'Rustam Aliyev', phone: '+998 97 111 22 33', totalSpent: 850000, loyaltyPoints: 30, tags: [], debtAmount: 0, debtStatus: 'PAID', lastVisit: '3 kun oldin' },
  { id: 'C-004', fullName: 'Dildora Tursunova', phone: '+998 99 444 55 66', totalSpent: 15400000, loyaltyPoints: 850, tags: ['VIP'], debtAmount: 1200000, debtStatus: 'PARTIAL', lastVisit: '22 Okt, 2023' },
  { id: 'C-005', fullName: 'Javohir Qosimov', phone: '+998 94 777 88 99', totalSpent: 120000, loyaltyPoints: 0, tags: ['Yangi'], debtAmount: 0, debtStatus: 'PAID', lastVisit: 'Bugun, 09:00' },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = mockCustomers.filter(c =>
    c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const totalDebt = mockCustomers.reduce((acc, curr) => acc + curr.debtAmount, 0);
  const totalPoints = mockCustomers.reduce((acc, curr) => acc + curr.loyaltyPoints, 0);

  return (
    <div className="flex h-full gap-6 relative">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mijozlar bazasi (CRM)</h1>
            <p className="text-gray-500 text-sm mt-1">Sodiqlik tizimi, qarzlar va mijozlar tahlili</p>
          </div>
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200">
            <Plus className="w-5 h-5" />
            Mijoz qo'shish
          </button>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Jami Mijozlar</p>
              <p className="text-2xl font-black text-gray-900">{mockCustomers.length} ta</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-2 h-full bg-red-500"></div>
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Jami Qarzlar (Nasiya)</p>
              <p className="text-2xl font-black text-red-600">{totalDebt.toLocaleString()} UZS</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Faol bonus ballar</p>
              <p className="text-2xl font-black text-gray-900">{totalPoints.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex gap-4 bg-gray-50/50">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Mijoz ismi yoki raqamini kiriting..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
            <button className="px-4 py-2 border border-gray-200 bg-white rounded-xl text-gray-600 font-medium hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Filter className="w-4 h-4" /> Saralash
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-white text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="p-4 font-bold">Mijoz Ismi</th>
                  <th className="p-4 font-bold">Aloqa / Tags</th>
                  <th className="p-4 font-bold text-right">Umumiy xarid</th>
                  <th className="p-4 font-bold text-right">Qarz (Nasiya)</th>
                  <th className="p-4 font-bold text-center">Bonus Ball</th>
                  <th className="p-4 font-bold">Oxirgi tashrif</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    onClick={() => setSelectedCustomer(customer)}
                    className="hover:bg-indigo-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="p-4">
                      <div className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{customer.fullName}</div>
                      <div className="text-xs text-gray-400">{customer.id}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-gray-600 flex items-center gap-1 mb-1">
                        <Phone className="w-3 h-3" /> {customer.phone}
                      </div>
                      <div className="flex gap-1">
                        {customer.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-gray-900 text-right">
                      {customer.totalSpent.toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      {customer.debtAmount > 0 ? (
                        <div className="flex flex-col items-end">
                           <span className="font-black text-red-600">{customer.debtAmount.toLocaleString()}</span>
                           <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${customer.debtStatus === 'UNPAID' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                             {customer.debtStatus === 'UNPAID' ? "To'lanmagan" : "Qisman to'langan"}
                           </span>
                        </div>
                      ) : (
                        <span className="text-gray-400 font-medium">-</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                       <span className="inline-flex items-center gap-1 font-bold text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-lg">
                          <Star className="w-3.5 h-3.5" /> {customer.loyaltyPoints}
                       </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500 font-medium">
                      {customer.lastVisit}
                    </td>
                  </tr>
                ))}
                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">Mijoz topilmadi.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Customer Detail Drawer */}
      <AnimatePresence>
        {selectedCustomer && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col shrink-0 relative z-10"
          >
            <div className="p-6 bg-gray-900 text-white relative">
               <button
                 onClick={() => setSelectedCustomer(null)}
                 className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
               >
                 <X className="w-4 h-4" />
               </button>
               <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-2xl font-black mb-4 shadow-lg">
                 {selectedCustomer.fullName.charAt(0)}
               </div>
               <h2 className="text-2xl font-bold mb-1">{selectedCustomer.fullName}</h2>
               <div className="text-indigo-200 text-sm font-medium flex items-center gap-1">
                 <Phone className="w-4 h-4" /> {selectedCustomer.phone}
               </div>

               <div className="flex gap-2 mt-4">
                  {selectedCustomer.tags.map(tag => (
                     <span key={tag} className="text-xs font-bold px-2.5 py-1 bg-white/20 rounded-md">
                       {tag}
                     </span>
                  ))}
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
               {/* Stats Grid */}
               <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Jami Xarid</p>
                     <p className="font-black text-gray-900">{selectedCustomer.totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                     <p className="text-xs font-bold text-yellow-600 uppercase tracking-wider mb-1">Bonus Ball</p>
                     <div className="flex items-center gap-1 font-black text-gray-900">
                       <Star className="w-4 h-4 text-yellow-500" /> {selectedCustomer.loyaltyPoints}
                     </div>
                  </div>
               </div>

               {/* Debt Section */}
               <div className={`p-5 rounded-2xl border ${selectedCustomer.debtAmount > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                 <div className="flex justify-between items-start mb-2">
                   <p className={`text-sm font-bold ${selectedCustomer.debtAmount > 0 ? 'text-red-700' : 'text-green-700'}`}>
                     Nasiya qarz holati
                   </p>
                   {selectedCustomer.debtAmount > 0 && <AlertCircle className="w-5 h-5 text-red-500" />}
                 </div>
                 <p className={`text-2xl font-black mb-4 ${selectedCustomer.debtAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                   {selectedCustomer.debtAmount.toLocaleString()} UZS
                 </p>

                 {selectedCustomer.debtAmount > 0 && (
                   <button className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
                     Qarzni undirish
                   </button>
                 )}
               </div>

               {/* Quick Actions */}
               <div className="space-y-3">
                 <h3 className="text-sm font-bold text-gray-900 px-1">Tezkor amallar</h3>
                 <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-500 hover:text-indigo-600 transition-colors group">
                    <span className="font-bold text-gray-700 group-hover:text-indigo-600">Buyurtma yaratish</span>
                    <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-indigo-500" />
                 </button>
                 <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-500 hover:text-indigo-600 transition-colors group">
                    <span className="font-bold text-gray-700 group-hover:text-indigo-600">Xaridlar tarixi</span>
                    <Clock className="w-5 h-5 text-gray-400 group-hover:text-indigo-500" />
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

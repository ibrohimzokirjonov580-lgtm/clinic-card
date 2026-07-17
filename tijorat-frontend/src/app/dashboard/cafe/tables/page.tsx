'use client';

import { motion } from 'framer-motion';
import { Users, Clock, Coffee, Plus, Check, Receipt } from 'lucide-react';
import { useState } from 'react';

type TableStatus = 'AVAILABLE' | 'OCCUPIED' | 'WAITING_BILL';

interface Table {
  id: string;
  number: number;
  capacity: number;
  status: TableStatus;
  guests?: number;
  timeOccupied?: string;
  currentBill?: number;
}

const mockTables: Table[] = [
  { id: 'T1', number: 1, capacity: 4, status: 'AVAILABLE' },
  { id: 'T2', number: 2, capacity: 2, status: 'OCCUPIED', guests: 2, timeOccupied: '45 min', currentBill: 125000 },
  { id: 'T3', number: 3, capacity: 6, status: 'AVAILABLE' },
  { id: 'T4', number: 4, capacity: 4, status: 'WAITING_BILL', guests: 4, timeOccupied: '1h 15m', currentBill: 450000 },
  { id: 'T5', number: 5, capacity: 8, status: 'OCCUPIED', guests: 6, timeOccupied: '20 min', currentBill: 340000 },
  { id: 'T6', number: 6, capacity: 2, status: 'AVAILABLE' },
  { id: 'T7', number: 7, capacity: 4, status: 'AVAILABLE' },
  { id: 'T8', number: 8, capacity: 4, status: 'OCCUPIED', guests: 3, timeOccupied: '10 min', currentBill: 85000 },
];

export default function TablesMap() {
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const getStatusColor = (status: TableStatus) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-white border-gray-200 hover:border-indigo-400';
      case 'OCCUPIED': return 'bg-indigo-50 border-indigo-400 shadow-indigo-100 shadow-lg text-indigo-900';
      case 'WAITING_BILL': return 'bg-orange-50 border-orange-400 shadow-orange-100 shadow-lg text-orange-900';
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Tables Grid */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Stollar xaritasi</h1>
          <div className="flex gap-4 text-sm font-medium">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-white border border-gray-300"></div> Bo'sh</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500"></div> Band</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Hisob kutilmoqda</div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tables.map((table, i) => (
            <motion.div
              key={table.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedTable(table)}
              className={`relative cursor-pointer rounded-3xl p-5 border-2 transition-all duration-300 ${getStatusColor(table.status)} ${selectedTable?.id === table.id ? 'ring-4 ring-offset-2 ring-indigo-500/30 scale-105 z-10' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl font-black opacity-40">#{table.number}</span>
                <div className="flex gap-1 text-xs font-bold opacity-60 bg-black/5 px-2 py-1 rounded-lg">
                  <Users className="w-4 h-4" /> {table.capacity}
                </div>
              </div>

              {table.status === 'AVAILABLE' ? (
                <div className="flex flex-col items-center justify-center h-20 text-gray-400">
                  <Coffee className="w-8 h-8 mb-2 opacity-20" />
                  <span className="text-sm font-medium">Stol bo'sh</span>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold mb-1">
                    <Clock className="w-4 h-4" /> {table.timeOccupied}
                  </div>
                  <div className="text-xl font-extrabold mb-1">
                    {table.currentBill?.toLocaleString()} UZS
                  </div>
                  <div className="text-sm opacity-70 font-medium">
                    {table.guests} kishi
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Side Panel for Selected Table */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: selectedTable ? 400 : 0, opacity: selectedTable ? 1 : 0 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col"
      >
        {selectedTable && (
          <>
            <div className={`p-6 text-white ${selectedTable.status === 'WAITING_BILL' ? 'bg-orange-500' : selectedTable.status === 'OCCUPIED' ? 'bg-indigo-600' : 'bg-gray-800'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-black mb-1">Stol #{selectedTable.number}</h2>
                  <p className="opacity-80 font-medium">
                    {selectedTable.status === 'AVAILABLE' ? "Yangi mijoz qabul qilish" :
                     selectedTable.status === 'WAITING_BILL' ? "Hisob-kitobni yakunlash" : "Buyurtma qo'shish"}
                  </p>
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-xl text-sm font-bold backdrop-blur-md">
                  <Users className="w-4 h-4 inline mr-1" /> {selectedTable.capacity} kishilik
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {selectedTable.status === 'AVAILABLE' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                    <Coffee className="w-12 h-12 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Buyurtma ochish</h3>
                    <p className="text-gray-500 text-sm">Ushbu stol uchun yangi buyurtma jarayonini boshlang.</p>
                  </div>
                  <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                    Smenani boshlash
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <div className="flex justify-between text-sm text-gray-500 mb-2 font-medium">
                      <span>Joriy buyurtmalar (Kechiktirilgan hisob)</span>
                      <span>4 ta pozitsiya</span>
                    </div>
                    <div className="space-y-3 mt-4">
                      {['Klassik Burger', 'Margarita Pitsasi', 'Kola 0.5L', 'Tiramisu'].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center font-medium">
                          <span className="text-gray-900">1x {item}</span>
                          <span className="text-gray-600">45,000</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                      <span className="font-bold text-gray-500">Jami hisob:</span>
                      <span className="text-2xl font-black text-gray-900">{selectedTable.currentBill?.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex flex-col items-center justify-center py-4 rounded-2xl border-2 border-dashed border-gray-300 text-gray-600 hover:border-indigo-500 hover:text-indigo-600 font-bold transition-colors">
                      <Plus className="w-6 h-6 mb-2" />
                      Qo'shish
                    </button>
                    <button className="flex flex-col items-center justify-center py-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black transition-colors shadow-lg shadow-gray-300">
                      <Receipt className="w-6 h-6 mb-2" />
                      Chek chiqarish
                    </button>
                  </div>

                  {selectedTable.status === 'WAITING_BILL' && (
                    <button className="w-full bg-green-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-green-600 shadow-lg shadow-green-200">
                      <Check className="w-6 h-6" />
                      To'lovni qabul qilish
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
'use client';

import { ArrowDownRight, ArrowUpRight, Filter, Search, Download, DollarSign } from 'lucide-react';
import { useState } from 'react';

const mockTransactions = [
  { id: 'TRX-101', date: '2023-10-27', description: 'Kunlik naqd savdo tushumi', category: 'Savdo', type: 'INCOME', amount: 4500000 },
  { id: 'TRX-102', date: '2023-10-27', description: 'Arenda to\'lovi (Oktyabr)', category: 'Ijara', type: 'EXPENSE', amount: 15000000 },
  { id: 'TRX-103', date: '2023-10-26', description: 'CLICK orqali tushumlar', category: 'Savdo', type: 'INCOME', amount: 1250000 },
  { id: 'TRX-104', date: '2023-10-26', description: 'Xodimlar oylik maoshi', category: 'Ish haqi', type: 'EXPENSE', amount: 8000000 },
  { id: 'TRX-105', date: '2023-10-25', description: 'Yetkazib beruvchiga to\'lov (Go\'sht)', category: 'Xarid', type: 'EXPENSE', amount: 3200000 },
];

export default function TransactionsPage() {
  const [filterType, setFilterType] = useState('ALL');

  const filteredTransactions = filterType === 'ALL'
    ? mockTransactions
    : mockTransactions.filter(t => t.type === filterType);

  const totalIncome = mockTransactions.filter(t => t.type === 'INCOME').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = mockTransactions.filter(t => t.type === 'EXPENSE').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kirim-chiqim (Tranzaksiyalar)</h1>
          <p className="text-gray-500 text-sm mt-1">Barcha moliyaviy operatsiyalar va pul oqimi</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Hisobotni yuklash
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Joriy Balans</p>
            <p className={`text-2xl font-black ${balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
              {balance.toLocaleString()} UZS
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <ArrowDownRight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Umumiy Kirim</p>
            <p className="text-2xl font-black text-green-600">{totalIncome.toLocaleString()} UZS</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Umumiy Chiqim</p>
            <p className="text-2xl font-black text-red-600">{totalExpense.toLocaleString()} UZS</p>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center bg-gray-50">
          <div className="flex gap-2 bg-gray-200/50 p-1 rounded-xl">
            <button onClick={() => setFilterType('ALL')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${filterType === 'ALL' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>Barchasi</button>
            <button onClick={() => setFilterType('INCOME')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${filterType === 'INCOME' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500 hover:text-gray-700'}`}>Kirim</button>
            <button onClick={() => setFilterType('EXPENSE')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${filterType === 'EXPENSE' ? 'bg-white shadow-sm text-red-700' : 'text-gray-500 hover:text-gray-700'}`}>Chiqim</button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Qidirish..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredTransactions.map((trx) => (
            <div key={trx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trx.type === 'INCOME' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {trx.type === 'INCOME' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{trx.description}</h4>
                  <div className="flex gap-3 text-xs text-gray-500 mt-1">
                    <span>{trx.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 self-center"></span>
                    <span className="font-medium px-2 py-0.5 bg-gray-100 rounded-md">{trx.category}</span>
                  </div>
                </div>
              </div>
              <div className={`text-lg font-black ${trx.type === 'INCOME' ? 'text-green-600' : 'text-gray-900'}`}>
                {trx.type === 'INCOME' ? '+' : '-'}{trx.amount.toLocaleString()} UZS
              </div>
            </div>
          ))}
          {filteredTransactions.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Tranzaksiyalar topilmadi.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

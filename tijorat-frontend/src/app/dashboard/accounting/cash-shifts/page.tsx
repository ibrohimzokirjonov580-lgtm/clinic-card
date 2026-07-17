'use client';

import { Lock, Unlock, Clock, User, CheckCircle, AlertCircle, TrendingUp, History } from 'lucide-react';
import { useState } from 'react';

const mockShifts = [
  { id: 'SH-102', cashier: 'Admin (Rustamov T.)', openedAt: '2023-10-27 08:00', closedAt: null, startBalance: 500000, expectedBalance: 2450000, status: 'OPEN' },
  { id: 'SH-101', cashier: 'Kassir (Aliyeva M.)', openedAt: '2023-10-26 08:30', closedAt: '2023-10-26 22:15', startBalance: 500000, endBalance: 3200000, expectedBalance: 3200000, status: 'CLOSED' },
  { id: 'SH-100', cashier: 'Admin (Rustamov T.)', openedAt: '2023-10-25 09:00', closedAt: '2023-10-25 21:30', startBalance: 500000, endBalance: 1450000, expectedBalance: 1500000, status: 'CLOSED_WITH_DIFF' },
];

export default function CashShiftsPage() {
  const [activeTab, setActiveTab] = useState<'CURRENT' | 'HISTORY'>('CURRENT');

  const currentShift = mockShifts.find(s => s.status === 'OPEN');
  const pastShifts = mockShifts.filter(s => s.status !== 'OPEN');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kassa Smenasi</h1>
          <p className="text-gray-500 text-sm mt-1">Kassadagi naqd pullar harakati va nazorati</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('CURRENT')}
          className={`pb-3 px-1 text-sm font-bold border-b-2 transition-colors ${activeTab === 'CURRENT' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Joriy Smena
        </button>
        <button
          onClick={() => setActiveTab('HISTORY')}
          className={`pb-3 px-1 text-sm font-bold border-b-2 transition-colors ${activeTab === 'HISTORY' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Smenalar Tarixi
        </button>
      </div>

      {activeTab === 'CURRENT' ? (
        currentShift ? (
          <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                      <Unlock className="w-3 h-3" /> Smena ochiq
                    </span>
                    <span className="text-gray-500 text-sm font-medium">#{currentShift.id}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{currentShift.cashier}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Ochilgan vaqt: {currentShift.openedAt}</span>
                  </div>
                </div>
                <button className="bg-red-50 text-red-700 px-5 py-2.5 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center gap-2 border border-red-200">
                  <Lock className="w-5 h-5" />
                  Smenani Yopish
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div>
                  <p className="text-gray-500 text-sm mb-1 font-medium">Boshlang'ich qoldiq (Kassa ochilganda)</p>
                  <p className="text-2xl font-black text-gray-900">{currentShift.startBalance.toLocaleString()} UZS</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1 font-medium">Kutilayotgan naqd pul (Tizim bo'yicha)</p>
                  <p className="text-2xl font-black text-indigo-600 flex items-center gap-2">
                    {currentShift.expectedBalance.toLocaleString()} UZS
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-md flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1"/> +1,950,000
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800 font-medium">
                  Smenani yopishdan oldin kassadagi haqiqiy naqd pulni sanab chiqing. Tizimdagi summa bilan farq chiqsa, izoh yozish talab etiladi.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Kassa yopiq</h2>
            <p className="text-gray-500 mb-6 max-w-md">Savdo operatsiyalarini boshlash uchun kassa smenasini ochishingiz kerak. Kassa qoldig'ini kiriting.</p>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200">
              <Unlock className="w-5 h-5" />
              Smenani Ochish
            </button>
          </div>
        )
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="p-4 font-semibold">Smena ID</th>
                <th className="p-4 font-semibold">Kassir</th>
                <th className="p-4 font-semibold">Ochilgan / Yopilgan</th>
                <th className="p-4 font-semibold text-right">Boshlang'ich</th>
                <th className="p-4 font-semibold text-right">Yopilish</th>
                <th className="p-4 font-semibold text-center">Farq</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pastShifts.map((shift) => {
                const diff = (shift.endBalance || 0) - (shift.expectedBalance || 0);
                return (
                  <tr key={shift.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{shift.id}</td>
                    <td className="p-4 text-gray-700 flex items-center gap-2"><User className="w-4 h-4 text-gray-400"/> {shift.cashier}</td>
                    <td className="p-4 text-sm text-gray-600">
                      <div>{shift.openedAt}</div>
                      <div className="text-xs text-gray-400">{shift.closedAt}</div>
                    </td>
                    <td className="p-4 font-medium text-right text-gray-700">{shift.startBalance.toLocaleString()}</td>
                    <td className="p-4 font-bold text-right text-gray-900">{(shift.endBalance || 0).toLocaleString()}</td>
                    <td className="p-4 text-center">
                      {diff === 0 ? (
                        <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-md text-xs font-bold">
                          <CheckCircle className="w-3 h-3" /> Aniqlik
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded-md text-xs font-bold">
                          {diff.toLocaleString()}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

'use client';

import { FileCheck, Search, Filter, Plus, FileText, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useState } from 'react';

const mockInvoices = [
  { id: 'EHF-2023-001', date: '2023-10-25', partner: 'ООО "Mavlon Biznes"', amount: 1500000, status: 'ACCEPTED', type: 'IN' },
  { id: 'EHF-2023-002', date: '2023-10-26', partner: 'YATT "Aliyev V."', amount: 450000, status: 'SENT', type: 'OUT' },
  { id: 'EHF-2023-003', date: '2023-10-26', partner: 'MChJ "Grand Savdo"', amount: 12500000, status: 'DRAFT', type: 'OUT' },
  { id: 'EHF-2023-004', date: '2023-10-27', partner: 'Ostonov F. (Jismoniy shaxs)', amount: 150000, status: 'REJECTED', type: 'OUT' },
];

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACCEPTED': return <span className="flex items-center gap-1 text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-bold"><CheckCircle2 className="w-3 h-3" /> Qabul qilingan</span>;
      case 'SENT': return <span className="flex items-center gap-1 text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-xs font-bold"><Clock className="w-3 h-3" /> Yuborilgan</span>;
      case 'DRAFT': return <span className="flex items-center gap-1 text-gray-700 bg-gray-200 px-3 py-1 rounded-full text-xs font-bold"><FileText className="w-3 h-3" /> Qoralama</span>;
      case 'REJECTED': return <span className="flex items-center gap-1 text-red-700 bg-red-100 px-3 py-1 rounded-full text-xs font-bold"><XCircle className="w-3 h-3" /> Rad etilgan</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">EHF Fakturalar</h1>
          <p className="text-gray-500 text-sm mt-1">Soliq qo'mitasi bilan integratsiyalashgan elektron hisob-fakturalar</p>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200">
          <Plus className="w-5 h-5" />
          Yangi yaratish
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Faktura raqami yoki hamkor nomini qidiring..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filtrlash
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="p-4 font-semibold">Faktura Raqami</th>
                <th className="p-4 font-semibold">Sana</th>
                <th className="p-4 font-semibold">Hamkor</th>
                <th className="p-4 font-semibold">Tur</th>
                <th className="p-4 font-semibold text-right">Summa</th>
                <th className="p-4 font-semibold">Holat</th>
                <th className="p-4 font-semibold text-center">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-gray-900">{invoice.id}</td>
                  <td className="p-4 text-gray-600 text-sm">{invoice.date}</td>
                  <td className="p-4 font-medium text-gray-900">{invoice.partner}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${invoice.type === 'IN' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {invoice.type === 'IN' ? 'Kirim' : 'Chiqim'}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-gray-900 text-right">{invoice.amount.toLocaleString()} UZS</td>
                  <td className="p-4">{getStatusBadge(invoice.status)}</td>
                  <td className="p-4 text-center">
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">Ko'rish</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

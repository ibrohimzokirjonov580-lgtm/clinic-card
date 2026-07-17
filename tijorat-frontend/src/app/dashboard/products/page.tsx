'use client';

import { Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductsPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mahsulotlar Ombori</h1>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
          <Plus className="w-4 h-4" />
          Yangi mahsulot
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4 items-center bg-gray-50/50">
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" placeholder="Mahsulot nomi, shtrix-kod yoki SKU..." className="bg-transparent border-none outline-none w-full text-sm" />
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Kategoriya
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Mahsulot</th>
                <th className="px-6 py-4 font-medium">Kategoriya</th>
                <th className="px-6 py-4 font-medium">Sotuv narxi</th>
                <th className="px-6 py-4 font-medium">Qoldiq</th>
                <th className="px-6 py-4 font-medium">Holat</th>
                <th className="px-6 py-4 font-medium text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { name: "Premium Erkaklar Ko'ylagi", sku: 'SKU-8392', category: 'Kiyimlar', price: '250,000 UZS', stock: 45, status: 'Faol' },
                { name: "Qora Krossovka Nike", sku: 'SKU-1123', category: 'Poyabzal', price: '450,000 UZS', stock: 12, status: 'Faol' },
                { name: "Aqlli Soat Pro", sku: 'SKU-9942', category: 'Elektronika', price: '320,000 UZS', stock: 0, status: 'Tugagan' },
                { name: "Kuzgi Pidjak", sku: 'SKU-3321', category: 'Kiyimlar', price: '550,000 UZS', stock: 8, status: 'Faol' },
              ].map((product, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{product.sku}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${product.stock === 0 ? 'text-red-500' : product.stock < 10 ? 'text-orange-500' : 'text-gray-900'}`}>
                      {product.stock} dona
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${product.stock === 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors mr-2">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
'use client';

import { motion } from 'framer-motion';
import { Clock, CheckCircle2, ChefHat } from 'lucide-react';
import { useState } from 'react';

type OrderStatus = 'NEW' | 'COOKING' | 'READY';

interface KDSOrder {
  id: string;
  tableNumber: string;
  timeReceived: string;
  status: OrderStatus;
  items: { name: string; qty: number; notes?: string }[];
}

const mockOrders: KDSOrder[] = [
  { id: 'ORD-12', tableNumber: '4', timeReceived: '12:30', status: 'NEW', items: [
    { name: 'Klassik Burger', qty: 2, notes: "Piyozsiz" },
    { name: 'Fri kartoshkasi', qty: 1 }
  ]},
  { id: 'ORD-14', tableNumber: '2', timeReceived: '12:35', status: 'NEW', items: [
    { name: 'Margarita Pitsasi', qty: 1 },
  ]},
  { id: 'ORD-09', tableNumber: '8', timeReceived: '12:15', status: 'COOKING', items: [
    { name: 'Mol go\'shtidan steyk', qty: 2, notes: "Medium Rare" },
    { name: 'Sezar salati', qty: 1 }
  ]},
  { id: 'ORD-05', tableNumber: '5', timeReceived: '12:05', status: 'READY', items: [
    { name: 'Tiramisu', qty: 3 },
    { name: 'Qora Kofe', qty: 2 }
  ]},
];

export default function KitchenDisplaySystem() {
  const [orders, setOrders] = useState<KDSOrder[]>(mockOrders);

  const moveOrder = (id: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const Column = ({ title, status, bgColor, borderColor }: any) => {
    const columnOrders = orders.filter(o => o.status === status);

    return (
      <div className={`flex-1 flex flex-col rounded-3xl border-2 ${borderColor} bg-white overflow-hidden`}>
        <div className={`p-4 ${bgColor} flex justify-between items-center border-b border-gray-100`}>
          <h2 className="font-bold text-gray-900">{title}</h2>
          <span className="bg-white/50 px-3 py-1 rounded-full text-sm font-bold">{columnOrders.length}</span>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/30">
          {columnOrders.map((order, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={order.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                <div>
                  <div className="text-sm font-bold text-gray-400 mb-1">{order.id}</div>
                  <div className="text-xl font-black text-gray-900">Stol #{order.tableNumber}</div>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4" /> {order.timeReceived}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex flex-col">
                    <div className="flex items-start">
                      <span className="font-black text-indigo-600 mr-3 text-lg">{item.qty}x</span>
                      <span className="font-bold text-gray-800 text-lg">{item.name}</span>
                    </div>
                    {item.notes && (
                      <span className="text-sm text-red-500 font-medium ml-8 bg-red-50 px-2 py-0.5 rounded inline-block w-max mt-1">
                        Izoh: {item.notes}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                {status === 'NEW' && (
                  <button onClick={() => moveOrder(order.id, 'COOKING')} className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
                    Pishirishni boshlash
                  </button>
                )}
                {status === 'COOKING' && (
                  <button onClick={() => moveOrder(order.id, 'READY')} className="flex-1 bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-colors flex justify-center items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Tayyor
                  </button>
                )}
                {status === 'READY' && (
                  <button onClick={() => setOrders(orders.filter(o => o.id !== order.id))} className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">
                    Ofitsiant oldi
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
          <ChefHat className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Oshxona Ekrani (KDS)</h1>
          <p className="text-gray-500 font-medium text-sm">Buyurtmalar avtomatik ravishda shu yerga tushadi.</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        <Column title="YANGI BUYURTMALAR" status="NEW" bgColor="bg-gray-100" borderColor="border-gray-200" />
        <Column title="PISHIRILMOQDA" status="COOKING" bgColor="bg-blue-50" borderColor="border-blue-200" />
        <Column title="TAYYOR" status="READY" bgColor="bg-green-50" borderColor="border-green-200" />
      </div>
    </div>
  );
}
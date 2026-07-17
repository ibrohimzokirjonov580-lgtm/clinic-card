'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, Coffee, Plus, Check, Receipt, X, Printer } from 'lucide-react';
import { useState } from 'react';

type TableStatus = 'AVAILABLE' | 'OCCUPIED' | 'WAITING_BILL';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Table {
  id: string;
  number: number;
  capacity: number;
  status: TableStatus;
  guests?: number;
  timeOccupied?: string;
  items?: OrderItem[];
}

const mockMenu = [
  { id: 'm1', name: 'Klassik Burger', price: 45000, category: 'Fast Food' },
  { id: 'm2', name: 'Margarita Pitsasi', price: 85000, category: 'Fast Food' },
  { id: 'm3', name: 'Kola 0.5L', price: 10000, category: 'Ichimliklar' },
  { id: 'm4', name: 'Tiramisu', price: 35000, category: 'Shirinliklar' },
  { id: 'm5', name: 'Osh (1 porsiya)', price: 30000, category: 'Milliy Taomlar' },
  { id: 'm6', name: "Sho'rva", price: 25000, category: 'Milliy Taomlar' },
  { id: 'm7', name: 'Qora Choy', price: 5000, category: 'Ichimliklar' },
];

const initialTables: Table[] = [
  { id: 'T1', number: 1, capacity: 4, status: 'AVAILABLE', items: [] },
  {
    id: 'T2', number: 2, capacity: 2, status: 'OCCUPIED', guests: 2, timeOccupied: '45 min',
    items: [
      { id: 'm1', name: 'Klassik Burger', price: 45000, quantity: 1 },
      { id: 'm2', name: 'Margarita Pitsasi', price: 85000, quantity: 1 },
      { id: 'm3', name: 'Kola 0.5L', price: 10000, quantity: 2 }
    ]
  },
  { id: 'T3', number: 3, capacity: 6, status: 'AVAILABLE', items: [] },
  {
    id: 'T4', number: 4, capacity: 4, status: 'WAITING_BILL', guests: 4, timeOccupied: '1h 15m',
    items: [
      { id: 'm5', name: 'Osh (1 porsiya)', price: 30000, quantity: 4 },
      { id: 'm7', name: 'Qora Choy', price: 5000, quantity: 1 }
    ]
  },
  { id: 'T5', number: 5, capacity: 8, status: 'OCCUPIED', guests: 6, timeOccupied: '20 min', items: [] },
  { id: 'T6', number: 6, capacity: 2, status: 'AVAILABLE', items: [] },
  { id: 'T7', number: 7, capacity: 4, status: 'AVAILABLE', items: [] },
  { id: 'T8', number: 8, capacity: 4, status: 'OCCUPIED', guests: 3, timeOccupied: '10 min', items: [] },
];

export default function TablesMap() {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  // Modals state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');

  const calculateTotal = (items?: OrderItem[]) => {
    if (!items) return 0;
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getStatusColor = (status: TableStatus) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-white border-gray-200 hover:border-indigo-400';
      case 'OCCUPIED': return 'bg-indigo-50 border-indigo-400 shadow-indigo-100 shadow-lg text-indigo-900';
      case 'WAITING_BILL': return 'bg-orange-50 border-orange-400 shadow-orange-100 shadow-lg text-orange-900';
    }
  };

  const handleStartShift = () => {
    if (!selectedTable) return;
    const updatedTable = { ...selectedTable, status: 'OCCUPIED' as TableStatus, guests: 1, timeOccupied: '1 min', items: [] };
    setTables(tables.map(t => t.id === selectedTable.id ? updatedTable : t));
    setSelectedTable(updatedTable);
  };

  const handleAddItemToOrder = (menuItem: typeof mockMenu[0]) => {
    if (!selectedTable) return;

    const existingItems = selectedTable.items || [];
    const existingItemIndex = existingItems.findIndex(i => i.id === menuItem.id);

    let newItems;
    if (existingItemIndex > -1) {
      newItems = [...existingItems];
      newItems[existingItemIndex].quantity += 1;
    } else {
      newItems = [...existingItems, { id: menuItem.id, name: menuItem.name, price: menuItem.price, quantity: 1 }];
    }

    const updatedTable = { ...selectedTable, items: newItems, status: 'OCCUPIED' as TableStatus };
    setTables(tables.map(t => t.id === selectedTable.id ? updatedTable : t));
    setSelectedTable(updatedTable);
  };

  const handleCheckout = () => {
     if (!selectedTable) return;
     const updatedTable = { ...selectedTable, status: 'WAITING_BILL' as TableStatus };
     setTables(tables.map(t => t.id === selectedTable.id ? updatedTable : t));
     setSelectedTable(updatedTable);
  };

  const handleCompletePayment = () => {
     if (!selectedTable) return;
     const updatedTable = { ...selectedTable, status: 'AVAILABLE' as TableStatus, items: [], guests: 0, timeOccupied: undefined };
     setTables(tables.map(t => t.id === selectedTable.id ? updatedTable : t));
     setSelectedTable(updatedTable);
     setIsReceiptOpen(false);
  };

  const filteredMenu = mockMenu.filter(item => item.name.toLowerCase().includes(menuSearch.toLowerCase()));

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 relative">
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
                    {calculateTotal(table.items).toLocaleString()} UZS
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
        className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col z-20"
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
                  <button
                    onClick={handleStartShift}
                    className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                  >
                    Band qilish
                  </button>
                </div>
              ) : (
                <div className="space-y-6 flex flex-col h-full">
                  <div className="bg-gray-50 p-4 rounded-2xl flex-1 overflow-y-auto">
                    <div className="flex justify-between text-sm text-gray-500 mb-2 font-medium">
                      <span>Joriy buyurtmalar</span>
                      <span>{selectedTable.items?.reduce((acc, curr) => acc + curr.quantity, 0) || 0} ta pozitsiya</span>
                    </div>
                    <div className="space-y-3 mt-4">
                      {selectedTable.items?.length === 0 && (
                         <div className="text-center text-gray-400 py-4 text-sm">Hali buyurtmalar yo'q</div>
                      )}
                      {selectedTable.items?.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center font-medium">
                          <span className="text-gray-900">{item.quantity}x {item.name}</span>
                          <span className="text-gray-600">{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                      <span className="font-bold text-gray-500">Jami hisob:</span>
                      <span className="text-2xl font-black text-gray-900">{calculateTotal(selectedTable.items).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-auto shrink-0">
                    <button
                      onClick={() => setIsMenuOpen(true)}
                      className="flex flex-col items-center justify-center py-4 rounded-2xl border-2 border-dashed border-gray-300 text-gray-600 hover:border-indigo-500 hover:text-indigo-600 font-bold transition-colors"
                    >
                      <Plus className="w-6 h-6 mb-2" />
                      Qo'shish
                    </button>
                    <button
                      onClick={() => {
                        handleCheckout();
                        setIsReceiptOpen(true);
                      }}
                      disabled={!selectedTable.items || selectedTable.items.length === 0}
                      className="flex flex-col items-center justify-center py-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black transition-colors shadow-lg shadow-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Receipt className="w-6 h-6 mb-2" />
                      Chek chiqarish
                    </button>
                  </div>

                  {selectedTable.status === 'WAITING_BILL' && (
                    <button
                      onClick={handleCompletePayment}
                      className="w-full bg-green-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-green-600 shadow-lg shadow-green-200 shrink-0"
                    >
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

      {/* Menu Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-xl font-bold">Menyu</h3>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-4 border-b border-gray-100">
                <input
                  type="text"
                  placeholder="Qidirish..."
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {filteredMenu.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleAddItemToOrder(item)}
                    className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-indigo-300 hover:bg-indigo-50 transition-colors flex justify-between items-center group"
                  >
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-indigo-700">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.category}</div>
                    </div>
                    <div className="font-black text-indigo-600">
                      {item.price.toLocaleString()} UZS
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Receipt Modal Overlay */}
      <AnimatePresence>
        {isReceiptOpen && selectedTable && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsReceiptOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Receipt Content */}
              <div className="p-8 pb-4 flex-1 overflow-y-auto bg-[#fafafa] font-mono text-sm relative receipt-print-area">
                <div className="text-center mb-6 border-b-2 border-dashed border-gray-300 pb-4">
                  <h2 className="text-xl font-bold tracking-widest uppercase mb-1">Tijorat Cafe</h2>
                  <p className="text-gray-500 text-xs">Toshkent sh., Yunusobod tumani</p>
                  <p className="text-gray-500 text-xs">Tel: +998 90 123 45 67</p>
                </div>

                <div className="flex justify-between mb-2 text-xs">
                  <span>Sana: {new Date().toLocaleDateString('uz-UZ')}</span>
                  <span>Vaqt: {new Date().toLocaleTimeString('uz-UZ', {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <div className="flex justify-between mb-6 text-xs font-bold border-b-2 border-dashed border-gray-300 pb-2">
                  <span>Stol #{selectedTable.number}</span>
                  <span>Ofitsiant: Admin</span>
                </div>

                <div className="space-y-3 mb-6">
                  {selectedTable.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <div className="flex-1 pr-2">
                        <div className="font-bold">{item.name}</div>
                        <div className="text-gray-500 text-xs">{item.quantity} x {item.price.toLocaleString()}</div>
                      </div>
                      <div className="font-bold">
                        {(item.quantity * item.price).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-dashed border-gray-300 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Oraliq summa:</span>
                    <span>{calculateTotal(selectedTable.items).toLocaleString()} UZS</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Xizmat haqi (10%):</span>
                    <span>{(calculateTotal(selectedTable.items) * 0.1).toLocaleString()} UZS</span>
                  </div>
                  <div className="flex justify-between text-lg font-black mt-2 pt-2 border-t-2 border-black">
                    <span>JAMI TO'LOV:</span>
                    <span>{(calculateTotal(selectedTable.items) * 1.1).toLocaleString()} UZS</span>
                  </div>
                </div>

                <div className="mt-8 text-center text-xs text-gray-500">
                  <p>Xaridingiz uchun rahmat!</p>
                  <p className="mt-1 font-bold">www.tijorat.uz</p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 bg-gray-100 flex gap-3">
                <button
                  onClick={() => setIsReceiptOpen(false)}
                  className="flex-1 py-3 bg-white border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50"
                >
                  Yopish
                </button>
                <button
                  onClick={() => {
                    alert("Chek printerga yuborildi! (Demo)");
                    handleCompletePayment();
                  }}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700"
                >
                  <Printer className="w-5 h-5" />
                  Chop etish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

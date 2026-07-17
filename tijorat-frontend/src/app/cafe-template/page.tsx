'use client';

import { motion } from 'framer-motion';
import { UtensilsCrossed, ChefHat, Plus } from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { id: 1, name: "Mol go'shtidan steyk", desc: "Grillda pishirilgan maxsus steyk, sabzavotlar bilan", price: "120,000 UZS", image: "https://images.unsplash.com/photo-1544025162-8350b91dc344?auto=format&fit=crop&w=400&q=80", tag: "Tavsiya etamiz" },
  { id: 2, name: "Klassik Burger", desc: "100% mol go'shti, chedar pishlog'i, maxsus sous", price: "45,000 UZS", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Margarita Pitsasi", desc: "Pomidor sousi, motsarella, rayhon", price: "75,000 UZS", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Tiramisu", desc: "Kofe va maskarpone pishlog'idan italyan shirinligi", price: "35,000 UZS", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=80" },
];

export default function CafeTemplate() {
  return (
    <div className="min-h-screen bg-[#FFF9F2] font-sans">
      {/* Header */}
      <div className="bg-orange-600 text-white rounded-b-[3rem] pb-24 relative overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

        <nav className="relative z-10 flex justify-between items-center p-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-600">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <button className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">Stol: #12</button>
        </nav>

        <div className="relative z-10 px-6 pt-6 text-center max-w-md mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold mb-3 font-serif"
          >
            La Resto
          </motion.h1>
          <p className="text-orange-100 opacity-90">Eng shirin taomlar faqat bizda.</p>
        </div>
      </div>

      {/* Floating Category Menu */}
      <div className="max-w-md mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-2 flex justify-between">
          {['Asosiy', 'Pitsa', 'Shirinlik', 'Ichimlik'].map((cat, i) => (
            <button key={cat} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-colors ${i === 0 ? 'bg-orange-600 text-white' : 'text-gray-500 hover:bg-orange-50'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu List */}
      <div className="max-w-md mx-auto px-4 pt-10 pb-32">
        <div className="flex items-center gap-2 mb-6">
          <ChefHat className="w-6 h-6 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-900 font-serif">Asosiy Taomlar</h2>
        </div>

        <div className="space-y-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 rounded-3xl shadow-sm border border-orange-100 flex gap-4 items-center group cursor-pointer"
            >
              <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {item.tag && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-br-lg">
                    HOT
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-gray-900 leading-tight mb-1">{item.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2">{item.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-orange-600">{item.price}</span>
                  <button className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent max-w-md mx-auto">
        <button className="w-full bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-600/30 flex justify-between px-6 hover:bg-orange-700 transition-colors">
          <span>Buyurtmani tasdiqlash</span>
          <span>120,000 UZS</span>
        </button>
      </div>
    </div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useState } from 'react';

// Mock data
const products = [
  { id: 1, name: "Premium Erkaklar Ko'ylagi", price: "250,000 UZS", image: "https://images.unsplash.com/photo-1596755094514-f87e32f6b717?auto=format&fit=crop&w=400&q=80", category: "Kiyimlar" },
  { id: 2, name: "Qora Krossovka Nike", price: "450,000 UZS", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", category: "Poyabzal" },
  { id: 3, name: "Aqlli Soat Pro", price: "320,000 UZS", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80", category: "Elektronika" },
  { id: 4, name: "Kuzgi Pidjak", price: "550,000 UZS", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80", category: "Kiyimlar" },
];

const categories = ["Barchasi", "Kiyimlar", "Poyabzal", "Elektronika", "Aksessuarlar"];

export default function StoreTemplate() {
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button className="md:hidden p-2"><Menu className="w-6 h-6" /></button>
              <span className="font-extrabold text-2xl tracking-tight text-gray-900">MENING DO'KONIM</span>
            </div>

            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Mahsulotlarni qidirish..."
                  className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-black outline-none"
                />
              </div>
            </div>

            <button className="relative p-2" onClick={() => setCartCount(c => c + 1)}>
              <ShoppingBag className="w-6 h-6 text-gray-900" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute top-0 right-0 w-5 h-5 bg-black text-white text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-black text-white rounded-3xl p-10 flex flex-col justify-center items-start min-h-[300px] relative overflow-hidden">
          <div className="relative z-10 max-w-md">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Yangi Kuzgi Kolleksiya</h1>
            <p className="text-gray-300 mb-6 text-lg">Barcha mahsulotlarga 20% gacha chegirma e'lon qilamiz.</p>
            <button className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
              Xaridni boshlash
            </button>
          </div>
          {/* Abstract pattern */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/10 to-transparent"></div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium transition-all ${
                activeCategory === cat ? 'bg-black text-white' : 'bg-white text-gray-700 border border-gray-200 hover:border-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ommabop mahsulotlar</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 mb-3">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button
                  onClick={(e) => { e.stopPropagation(); setCartCount(c => c + 1); }}
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-black p-3 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white"
                >
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <h3 className="font-bold text-gray-900 leading-tight mb-1">{product.name}</h3>
                <p className="font-semibold text-black">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
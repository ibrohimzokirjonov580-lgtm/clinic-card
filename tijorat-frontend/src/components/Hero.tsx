'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, ShoppingBag, Store, UtensilsCrossed, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white pt-24 pb-16 lg:pb-32 lg:pt-32">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-40 -left-40 w-[600px] h-[600px] bg-pink-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center gap-2 mb-8"
          >
             <span className="px-3 py-1 text-sm font-bold bg-indigo-100 text-indigo-700 rounded-full">
               O'zbekistondagi eng zamonaviy POS tizimi
             </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight"
          >
            Biznesingizni <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">to'liq raqamlashtiring</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-xl text-gray-600 mb-10 leading-relaxed"
          >
            TIJORAT — bu savdo, ombor, mijozlar (CRM) va moliyaviy hisobotlarni yagona joyda jamlagan professional bulutli platforma. Chakana savdo, kafe, restoran yoki xizmat ko'rsatish shoxobchangizni kod yozmasdan, sanoqli daqiqalarda ishga tushiring.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/onboarding"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              14 kunlik bepul sinov
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center px-8 py-4 font-bold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
            >
              Batafsil ma'lumot
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex justify-center items-center gap-6 text-sm font-medium text-gray-500"
          >
             <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500"/> Ma'lumotlar xavfsizligi</div>
             <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500"/> 99.9% Barqarorlik (Uptime)</div>
          </motion.div>
        </div>

        {/* Highlight Cards */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
          <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100"
          >
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
              <Store className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Chakana savdo & Do'konlar</h3>
            <p className="text-gray-600 leading-relaxed">
              Barkod skanerlar bilan ishlash, tovar qoldiqlarini avtomatlashtirilgan tarzda nazorat qilish va onlayn savdo sahifasini yaratish imkoniyati. Kassirlar uchun qulay interfeys (POS).
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100"
          >
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
              <UtensilsCrossed className="w-7 h-7 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Kafe & Restoranlar (HoReCa)</h3>
            <p className="text-gray-600 leading-relaxed">
              Interaktiv stollar xaritasi, taomlar retsepti asosida mahsulot qoldiqlarini yechish (Texnik xarita) va oshpazlar uchun interaktiv oshxona ekrani (KDS). Ofitsiantlar uchun moslashuvchan buyurtma tizimi.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100"
          >
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
              <BarChart3 className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Buxgalteriya & Moliyaviy Tahlil</h3>
            <p className="text-gray-600 leading-relaxed">
              Soliq qo'mitasi talablari asosida Elektron Hisob Faktura (EHF) integratsiyasi. Kassa smenasi nazorati, batafsil kirim-chiqim tahlili va real vaqtdagi foyda-zarar (P&L) hisobotlari.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

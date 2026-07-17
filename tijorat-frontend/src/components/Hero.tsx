'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, ShoppingBag, Store, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-40 -left-40 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-40 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8"
          >
            Biznesingizni <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Avtomatlashtiring</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 mb-10"
          >
            Do'kon, kafe yoki xizmat ko'rsatish markazingiz uchun tayyor veb-sayt va boshqaruv tizimi — kod yozmasdan, 10 daqiqada.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-4"
          >
            <Link
              href="/onboarding"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Bepul boshlash
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center px-8 py-4 font-bold text-gray-700 transition-all duration-200 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
            >
              Qanday ishlaydi?
            </Link>
          </motion.div>
        </div>

        {/* Feature Cards Floating */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <motion.div
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <Store className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Chakana savdo</h3>
            <p className="text-gray-500">Ombor nazorati, shtrix-kod va onlayn savatcha.</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
              <UtensilsCrossed className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Kafe & Restoran</h3>
            <p className="text-gray-500">Stollar xaritasi, texnik xarita va oshxona ekrani (KDS).</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20"
          >
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Buxgalteriya & Soliq</h3>
            <p className="text-gray-500">Avtomatik EHF, kirim-chiqim va foyda-zarar hisoboti.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
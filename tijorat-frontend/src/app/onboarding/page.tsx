'use client';

import { motion } from 'framer-motion';
import { Store, UtensilsCrossed, Settings, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
            <div className="absolute left-0 top-1/2 h-1 bg-indigo-600 -z-10 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: step === 1 ? '50%' : '100%' }}></div>

            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Biznes ma'lumotlari</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Biznes nomi</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none" placeholder="Masalan: Milliy Taomlar" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manzil</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none" placeholder="Toshkent shahar, Yunusobod tumani" />
              </div>
              <button onClick={() => setStep(2)} className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors">
                Keyingi qadam
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Select Business Type */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Biznes turini tanlang</h2>
            <p className="text-gray-500 mb-8">Tanlovingizga ko'ra tizim sizga kerakli shablonlarni avtomatik yaratadi.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setBusinessType('RETAIL')}
                className={`p-6 rounded-2xl cursor-pointer transition-all border-2 ${businessType === 'RETAIL' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
              >
                <Store className={`w-8 h-8 mb-3 ${businessType === 'RETAIL' ? 'text-indigo-600' : 'text-gray-400'}`} />
                <h3 className="text-xl font-bold text-gray-900">Do'kon (Chakana)</h3>
                <p className="text-sm text-gray-500 mt-1">Ombor nazorati va mahsulot katalogi.</p>
                {businessType === 'RETAIL' && <CheckCircle2 className="absolute top-4 right-4 text-indigo-600" />}
              </div>

              <div
                onClick={() => setBusinessType('CAFE')}
                className={`p-6 rounded-2xl cursor-pointer transition-all border-2 ${businessType === 'CAFE' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
              >
                <UtensilsCrossed className={`w-8 h-8 mb-3 ${businessType === 'CAFE' ? 'text-indigo-600' : 'text-gray-400'}`} />
                <h3 className="text-xl font-bold text-gray-900">Kafe / Restoran</h3>
                <p className="text-sm text-gray-500 mt-1">Menyu, stollar bandligi, texnik xarita.</p>
                {businessType === 'CAFE' && <CheckCircle2 className="absolute top-4 right-4 text-indigo-600" />}
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={() => setStep(1)} className="w-1/3 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors">
                Orqaga
              </button>
              <Link href="/dashboard" className="w-2/3 bg-indigo-600 text-white flex items-center justify-center py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors">
                Ishga tushirish
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
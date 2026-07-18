'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    name: "Boshlang'ich",
    price: "150,000",
    description: "Kichik do'konlar va yakkatartibdagi tadbirkorlar uchun.",
    features: [
      "1 ta savdo nuqtasi",
      "2 tagacha xodim",
      "Ombor nazorati",
      "Kassa smenasi",
      "Asosiy hisobotlar"
    ],
    missing: [
      "Telegram bot integratsiyasi",
      "EHF (Soliq) integratsiyasi",
      "KDS (Oshxona ekrani)"
    ],
    buttonText: "Sinab ko'rish",
    popular: false,
  },
  {
    name: "Biznes",
    price: "350,000",
    description: "Rivojlanayotgan savdo va xizmat ko'rsatish tarmoqlari uchun.",
    features: [
      "3 tagacha savdo nuqtasi",
      "Cheksiz xodimlar (Rolli)",
      "Kengaytirilgan CRM va Bonuslar",
      "Telegram bot orqali bildirishnomalar",
      "EHF (Soliq) integratsiyasi",
      "API orqali ulanish"
    ],
    missing: [
      "KDS (Oshxona ekrani)"
    ],
    buttonText: "Tanlash",
    popular: true,
  },
  {
    name: "Restoran Pro",
    price: "500,000",
    description: "Kafe, restoran va yirik ovqatlanish shahobchalari uchun maxsus.",
    features: [
      "Barcha 'Biznes' imkoniyatlari",
      "Interaktiv Stollar xaritasi",
      "KDS (Oshxona ekrani)",
      "Texnik xarita (Retseptlar)",
      "Mijozlar uchun QR-menyu",
      "Ingredientlarni avto-yechish"
    ],
    missing: [],
    buttonText: "Bog'lanish",
    popular: false,
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sizga mos tarifni tanlang</h2>
          <p className="text-lg text-gray-600">Yashirin to'lovlarsiz, faqat foydalanganingiz uchun to'lang. Barcha tariflarda 14 kunlik bepul sinov muddati mavjud.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative bg-white rounded-3xl border ${tier.popular ? 'border-indigo-500 shadow-2xl shadow-indigo-100 scale-105 z-10' : 'border-gray-200 shadow-sm'} p-8 flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Eng ommabop
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-500 text-sm h-10">{tier.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-black text-gray-900">{tier.price}</span>
                <span className="text-gray-500 font-medium"> UZS/oy</span>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium text-sm">{feature}</span>
                  </div>
                ))}
                {tier.missing.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 opacity-50">
                    <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-gray-500 font-medium text-sm line-through">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/onboarding"
                className={`w-full py-4 rounded-xl font-bold text-center transition-colors ${tier.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
              >
                {tier.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

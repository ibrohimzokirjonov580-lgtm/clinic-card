'use client';

import { motion } from 'framer-motion';
import { Users, PackageCheck, LineChart, MonitorSmartphone, BellRing, Settings2 } from 'lucide-react';

const features = [
  {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    title: "Kuchli CRM va Mijozlar Bazasi",
    description: "Mijozlaringiz xaridlar tarixini kuzatib boring. Bonus va keshbek tizimlarini sozlang, VIP mijozlarni aniqlang va ularga maxsus takliflar yuboring.",
    bg: "bg-blue-50"
  },
  {
    icon: <PackageCheck className="w-6 h-6 text-indigo-600" />,
    title: "Aniq Ombor Nazorati",
    description: "Qoldiqlar kamayganda avtomatik ogohlantirishlar oling. Tovar partiyalari, tannarx hisob-kitobi (FIFO/LIFO) va inventarizatsiyani osonlashtiring.",
    bg: "bg-indigo-50"
  },
  {
    icon: <LineChart className="w-6 h-6 text-green-600" />,
    title: "Tahliliy Hisobotlar",
    description: "Sotuvlar dinamikasi, eng xaridorgir tovarlar, xodimlar samaradorligi va kunlik foyda haqida real vaqt rejimida vizual grafikalar orqali ma'lumot oling.",
    bg: "bg-green-50"
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6 text-purple-600" />,
    title: "Ko'p Qurilmali Moslashuvchanlik",
    description: "Tizim planshet, kompyuter va noutbuklarda mukammal ishlaydi. O'zingizga qulay bo'lgan uskuna orqali kassani boshqaring.",
    bg: "bg-purple-50"
  },
  {
    icon: <BellRing className="w-6 h-6 text-orange-600" />,
    title: "Telegram Orqali Bildirishnomalar",
    description: "Har bir ochilgan kassa smenasi, kunlik yakuniy hisobotlar va xavfli tranzaksiyalar haqida rahbarning Telegram raqamiga zudlik bilan xabar yuboriladi.",
    bg: "bg-orange-50"
  },
  {
    icon: <Settings2 className="w-6 h-6 text-teal-600" />,
    title: "Rolli Boshqaruv (Ruxsatlar)",
    description: "Xodimlar (kassir, ofitsiant, buxgalter) uchun faqat o'zlariga kerakli bo'limlarni ochib berish orqali ma'lumotlar xavfsizligini ta'minlang.",
    bg: "bg-teal-50"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Biznesingiz uchun barcha kerakli vositalar</h2>
          <p className="text-lg text-gray-600">Bitta platformada boshqaruvning barcha bo'g'inlarini birlashtiring. Ortiqcha dasturlar va qog'ozbozlikka chek qo'ying.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

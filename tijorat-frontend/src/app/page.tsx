import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">TIJORAT</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">Xususiyatlar</a>
              <a href="#pricing" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">Narxlar</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="/login" className="text-gray-600 hover:text-gray-900 font-medium">Kirish</a>
              <a href="/onboarding" className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors">
                Boshlash
              </a>
            </div>
          </div>
        </div>
      </nav>

      <Hero />
      <Features />
      <Pricing />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="font-bold text-xl tracking-tight">TIJORAT</span>
              </div>
              <p className="text-gray-400 max-w-sm">Biznesingizni avtomatlashtirish uchun yagona platforma. Qulay, tez va ishonchli.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Bo'limlar</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Xususiyatlar</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Narxlar</a></li>
                <li><Link href="/onboarding" className="hover:text-white transition-colors">Ro'yxatdan o'tish</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Aloqa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Toshkent, O'zbekiston</li>
                <li>+998 90 123 45 67</li>
                <li>info@tijorat.uz</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TIJORAT. Barcha huquqlar himoyalangan.
          </div>
        </div>
      </footer>
    </main>
  );
}

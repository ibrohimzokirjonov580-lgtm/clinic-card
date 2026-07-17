import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
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
              <a href="#features" className="text-gray-500 hover:text-gray-900 transition-colors">Xususiyatlar</a>
              <a href="#pricing" className="text-gray-500 hover:text-gray-900 transition-colors">Narxlar</a>
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

      {/* Spacer for future sections */}
      <div className="h-40"></div>
    </main>
  );
}
'use client';

export default function CustomersPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
        <svg className="w-10 h-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Mijozlar bazasi</h2>
      <p className="text-gray-500 max-w-md">Mijozlar ro'yxati, ularning qarzlari va sodiqlik ballari bo'yicha ma'lumotlar yaqin orada API orqali shu yerga ulanadi.</p>
    </div>
  );
}
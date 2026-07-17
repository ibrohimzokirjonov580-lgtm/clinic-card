'use client';

import { motion } from 'framer-motion';
import { Search, Plus, Filter, Calculator } from 'lucide-react';
import { useState } from 'react';

const mockRecipes = [
  {
    id: 1,
    name: "Margarita Pitsasi",
    category: "Pitsa",
    sellPrice: 75000,
    foodCost: 22500, // Cost of ingredients
    ingredients: [
      { name: "Pitsa xamiri", qty: 300, unit: "g", cost: 2000 },
      { name: "Motsarella pishlog'i", qty: 150, unit: "g", cost: 12000 },
      { name: "Pomidor sousi", qty: 100, unit: "g", cost: 3500 },
      { name: "Rayhon", qty: 10, unit: "g", cost: 5000 }
    ]
  },
  {
    id: 2,
    name: "Mol go'shtidan steyk",
    category: "Asosiy",
    sellPrice: 120000,
    foodCost: 55000,
    ingredients: [
      { name: "Mol go'shti (Ribeye)", qty: 300, unit: "g", cost: 45000 },
      { name: "Ziravorlar", qty: 10, unit: "g", cost: 2000 },
      { name: "Kartoshka (Garnir)", qty: 200, unit: "g", cost: 3000 },
      { name: "Qovurish uchun yog'", qty: 30, unit: "ml", cost: 5000 }
    ]
  },
];

export default function RecipesTechCards() {
  const [selectedRecipe, setSelectedRecipe] = useState(mockRecipes[0]);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Recipe List */}
      <div className="w-1/3 bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Texnik Xaritalar</h2>
            <button className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" placeholder="Taom qidirish..." className="bg-transparent border-none outline-none w-full text-sm" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {mockRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className={`p-4 border-b border-gray-50 cursor-pointer transition-colors ${selectedRecipe.id === recipe.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : 'hover:bg-gray-50 border-l-4 border-l-transparent'}`}
            >
              <h3 className="font-bold text-gray-900 mb-1">{recipe.name}</h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{recipe.category}</span>
                <span className={`font-bold ${((recipe.foodCost / recipe.sellPrice) * 100) > 35 ? 'text-red-500' : 'text-green-500'}`}>
                  {((recipe.foodCost / recipe.sellPrice) * 100).toFixed(0)}% Margin
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe Details (Tech Card) */}
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-2">
                {selectedRecipe.category}
              </div>
              <h1 className="text-3xl font-black text-gray-900">{selectedRecipe.name}</h1>
            </div>
            <button className="border-2 border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
              Tahrirlash
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-sm text-gray-500 font-medium mb-1">Sotuv narxi</div>
              <div className="text-2xl font-black text-gray-900">{selectedRecipe.sellPrice.toLocaleString()} UZS</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-sm text-gray-500 font-medium mb-1">Tannarx (Food Cost)</div>
              <div className="text-2xl font-black text-orange-600">{selectedRecipe.foodCost.toLocaleString()} UZS</div>
            </div>
            <div className="bg-indigo-600 p-4 rounded-2xl shadow-sm shadow-indigo-200 text-white flex items-center justify-between">
              <div>
                <div className="text-indigo-100 text-sm font-medium mb-1">Sof foyda</div>
                <div className="text-2xl font-black">{(selectedRecipe.sellPrice - selectedRecipe.foodCost).toLocaleString()} UZS</div>
              </div>
              <Calculator className="w-8 h-8 opacity-50" />
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Tarkibiy qismlar (Ingredientlar)</h3>
            <button className="text-indigo-600 font-bold text-sm flex items-center hover:underline">
              <Plus className="w-4 h-4 mr-1" /> Ingredient qo'shish
            </button>
          </div>

          <table className="w-full text-left border-collapse bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Xomashyo nomi</th>
                <th className="px-6 py-4 font-medium">Sarfi</th>
                <th className="px-6 py-4 font-medium text-right">Summa (Tannarx)</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {selectedRecipe.ingredients.map((ing, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{ing.name}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">
                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-800">{ing.qty} {ing.unit}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">{ing.cost.toLocaleString()} UZS</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-400 mt-4 font-medium">Ushbu taom sotilganda, yuqoridagi miqdorlar ombordan avtomatik hisobdan chiqariladi.</p>
        </div>
      </div>
    </div>
  );
}
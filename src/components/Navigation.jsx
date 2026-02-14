import React from 'react';
import { Palette, ShoppingBag } from 'lucide-react';

export default function Navigation({ currentView, setCurrentView }) {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <button
        onClick={() => setCurrentView('customize')}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
          currentView === 'customize'
            ? 'bg-purple-600 text-white shadow-lg scale-105'
            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
        }`}
      >
        <Palette className="w-5 h-5" />
        Personalizar
      </button>
      
      <button
        onClick={() => setCurrentView('collections')}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
          currentView === 'collections'
            ? 'bg-purple-600 text-white shadow-lg scale-105'
            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
        }`}
      >
        <ShoppingBag className="w-5 h-5" />
        Colecciones
      </button>
    </div>
  );
}
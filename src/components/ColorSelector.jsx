import React from 'react';

export default function ColorSelector({ shirtColor, setShirtColor }) {
  const colors = [
    { name: 'Blanco', value: 'white', bg: 'bg-white', text: 'text-gray-600' },
    { name: 'Negro', value: 'black', bg: 'bg-black', text: 'text-white' }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        1. Selecciona el Color
      </h2>
      <div className="flex gap-4">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => setShirtColor(color.value)}
            className={`w-20 h-20 rounded-lg border-4 transition-all ${
              shirtColor === color.value
                ? 'border-blue-500 scale-110'
                : 'border-gray-300 hover:border-gray-400'
            } ${color.bg} shadow-md`}
          >
            <span className={`text-xs ${color.text}`}>{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
import React from 'react';

export default function SizeControl({ imageSize, setImageSize }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        3. Ajusta el Tamaño
      </h2>
      <input
        type="range"
        min="50"
        max="300"
        value={imageSize}
        onChange={(e) => setImageSize(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <span>Pequeño</span>
        <span>{imageSize}px</span>
        <span>Grande</span>
      </div>
    </div>
  );
}
import React from 'react';

export default function PositionControl({ imagePosition, setImagePosition }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        4. Ajusta la Posición
      </h2>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Horizontal
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={imagePosition.x}
            onChange={(e) =>
              setImagePosition({
                ...imagePosition,
                x: Number(e.target.value)
              })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Vertical
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={imagePosition.y}
            onChange={(e) =>
              setImagePosition({
                ...imagePosition,
                y: Number(e.target.value)
              })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        💡 También puedes arrastrar la imagen directamente
      </p>
    </div>
  );
}

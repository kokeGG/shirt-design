import React from 'react';
import { RotateCw } from 'lucide-react';

export default function TShirtPreview({
  shirtColor,
  uploadedImage,
  imageSize,
  imagePosition,
  isDragging,
  onMouseDown,
  currentSide,
  onRotate
}) {
  // Determinar qué imagen de playera usar
  const getShirtImage = () => {
    const color = shirtColor === 'white' ? 'blanca' : 'negra';
    const side = currentSide === 'front' ? 'frente' : 'atras';
    return `/images/playera-${color}-${side}.jpeg`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Vista Previa - {currentSide === 'front' ? 'Frente' : 'Atrás'}
        </h2>
        <button
          onClick={onRotate}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <RotateCw className="w-4 h-4" />
          Rotar
        </button>
      </div>

      <div className="relative flex justify-center items-center min-h-[500px]" id="tshirt-container">
        {/* Imagen de la playera real */}
        <img
          src={getShirtImage()}
          alt={`Playera ${shirtColor} ${currentSide}`}
          className="w-full max-w-md h-auto drop-shadow-2xl transition-all duration-500 select-none"
          style={{
            maxHeight: '500px',
            objectFit: 'contain'
          }}
          draggable="false"
        />

        {/* Imagen del diseño subido */}
        {uploadedImage && (
          <img
            src={uploadedImage}
            alt="Diseño"
            style={{
              width: `${imageSize}px`,
              height: `${imageSize}px`,
              left: `${imagePosition.x}%`,
              top: `${imagePosition.y}%`,
              transform: 'translate(-50%, -50%)',
              cursor: isDragging ? 'grabbing' : 'grab',
              zIndex: 10,
              userSelect: 'none'
            }}
            className="absolute object-contain pointer-events-auto transition-none"
            onMouseDown={onMouseDown}
            draggable="false"
          />
        )}
      </div>
      
      {!uploadedImage && (
        <p className="text-center text-gray-400 mt-4">
          Sube una imagen para el {currentSide === 'front' ? 'frente' : 'reverso'}
        </p>
      )}

      {/* Indicador visual */}
      <div className="mt-4 text-center">
        <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
          currentSide === 'front' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-purple-100 text-purple-700'
        }`}>
          {currentSide === 'front' ? '👕 Frente' : '🔄 Atrás'}
        </span>
      </div>
    </div>
  );
}
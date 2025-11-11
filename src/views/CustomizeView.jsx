import React from 'react';
import ColorSelector from '../components/ColorSelector';
import ImageUploader from '../components/ImageUploader';
import SizeControl from '../components/SizeControl';
import PositionControl from '../components/PositionControl';
import TShirtPreview from '../components/TShirtPreview';
import ResetButton from '../components/ResetButton';
import SizeSelector from '../components/SizeSelector';
import QuantitySelector from '../components/QuantitySelector';
import AddToCartButton from '../components/AddToCartButton';

export default function CustomizeView({
  shirtColor,
  setShirtColor,
  currentSide,
  setCurrentSide,
  frontImage,
  backImage,
  currentImage,
  currentSize,
  currentPosition,
  isDragging,
  size,
  setSize,
  quantity,
  setQuantity,
  BASE_PRICE,
  setCurrentImage,
  setCurrentSize,
  setCurrentPosition,
  handleRotate,
  handleReset,
  handleMouseDown,
  handleAddToCart
}) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          🎨 Diseña tu Playera
        </h2>
        <p className="text-gray-600">
          Personaliza tu playera con tu propio diseño
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Panel de Controles */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
          <ColorSelector 
            shirtColor={shirtColor} 
            setShirtColor={setShirtColor} 
          />
          
          <ImageUploader 
            onImageUpload={setCurrentImage}
            side={currentSide}
          />

          {currentImage && (
            <>
              <SizeControl 
                imageSize={currentSize} 
                setImageSize={setCurrentSize} 
              />

              <PositionControl 
                imagePosition={currentPosition} 
                setImagePosition={setCurrentPosition} 
              />

              <SizeSelector 
                size={size} 
                setSize={setSize} 
              />

              <QuantitySelector 
                quantity={quantity} 
                setQuantity={setQuantity} 
              />

              <ResetButton 
                onReset={handleReset}
                currentSide={currentSide}
              />
            </>
          )}

          {/* Botón Agregar al Carrito */}
          <div className="pt-4 border-t">
            <div className="mb-4">
              <p className="text-2xl font-bold text-gray-800 text-center">
                ${BASE_PRICE * quantity} MXN
              </p>
              <p className="text-sm text-gray-500 text-center">
                {quantity > 1 ? `${quantity} playeras × $${BASE_PRICE}` : 'Precio por playera'}
              </p>
            </div>
            <AddToCartButton
              onAddToCart={handleAddToCart}
              frontImage={frontImage}
              backImage={backImage}
            />
          </div>

          {/* Resumen de diseños */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Estado de diseños:
            </h3>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${frontImage ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                <span className="text-gray-600">
                  Frente: {frontImage ? '✓ Diseño agregado' : 'Sin diseño'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${backImage ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                <span className="text-gray-600">
                  Atrás: {backImage ? '✓ Diseño agregado' : 'Sin diseño'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vista Previa */}
        <TShirtPreview
          shirtColor={shirtColor}
          uploadedImage={currentImage}
          imageSize={currentSize}
          imagePosition={currentPosition}
          isDragging={isDragging}
          onMouseDown={handleMouseDown}
          currentSide={currentSide}
          onRotate={handleRotate}
        />
      </div>
    </div>
  );
}
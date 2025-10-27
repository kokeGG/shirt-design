import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function AddToCartButton({ onAddToCart, disabled, frontImage, backImage }) {
  const hasDesign = frontImage || backImage;

  return (
    <button
      onClick={onAddToCart}
      disabled={disabled || !hasDesign}
      className={`w-full flex items-center justify-center gap-2 font-semibold py-4 rounded-lg transition-all ${
        disabled || !hasDesign
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
      }`}
    >
      <ShoppingCart className="w-5 h-5" />
      {hasDesign ? 'Agregar al Carrito' : 'Agrega un diseño primero'}
    </button>
  );
}
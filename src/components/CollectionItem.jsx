import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

export default function CollectionItem({ item, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCart = () => {
    onAddToCart({
      ...item,
      quantity,
      size: selectedSize,
      totalPrice: item.price * quantity
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-64 bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {item.stock < 10 && item.stock > 0 && (
          <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            ¡Últimas {item.stock}!
          </span>
        )}
        {item.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              Agotado
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-purple-600">
            ${item.price} MXN
          </span>
          <span className="text-sm text-gray-500">
            Stock: {item.stock}
          </span>
        </div>

        {/* Selector de Talla */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Talla:
          </label>
          <div className="flex gap-2 flex-wrap">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                disabled={item.stock === 0}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedSize === size
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${item.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Selector de Cantidad */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cantidad:
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1 || item.stock === 0}
              className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-xl font-bold w-12 text-center">{quantity}</span>
            <button
              onClick={handleIncrement}
              disabled={quantity >= item.stock || item.stock === 0}
              className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="mb-4 p-3 bg-purple-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Total:</span>
            <span className="text-xl font-bold text-purple-600">
              ${(item.price * quantity).toFixed(2)} MXN
            </span>
          </div>
        </div>

        {/* Botón Agregar */}
        <button
          onClick={handleAddToCart}
          disabled={item.stock === 0}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
            item.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          {item.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
        </button>
      </div>
    </div>
  );
}
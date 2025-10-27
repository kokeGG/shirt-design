import React from 'react';
import { ShoppingCart, X, Trash2 } from 'lucide-react';

export default function Cart({ cart, onRemoveItem, onCheckout, isOpen, onToggle }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Botón flotante del carrito */}
      <button
        onClick={onToggle}
        className="fixed top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50 transition-all"
      >
        <ShoppingCart className="w-6 h-6" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </button>

      {/* Panel del carrito */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  🛒 Tu Carrito
                </h2>
                <button
                  onClick={onToggle}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Tu carrito está vacío</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 relative"
                      >
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
                              {item.frontImage ? (
                                <img
                                  src={item.frontImage}
                                  alt="Diseño"
                                  className="w-16 h-16 object-contain"
                                />
                              ) : (
                                <span className="text-gray-400 text-xs">Sin diseño</span>
                              )}
                            </div>
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">
                              Playera {item.color === 'white' ? 'Blanca' : 'Negra'}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {item.frontImage && item.backImage
                                ? 'Diseño frente y atrás'
                                : item.frontImage
                                ? 'Solo frente'
                                : 'Solo atrás'}
                            </p>
                            <p className="text-lg font-bold text-green-600 mt-2">
                              ${item.price.toFixed(2)} MXN
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">${total.toFixed(2)} MXN</span>
                    </div>
                  </div>

                  <button
                    onClick={onCheckout}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition-colors"
                  >
                    Proceder al Pago
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
import React from 'react';
import { CheckCircle, Package } from 'lucide-react';

export default function PaymentSuccess({ orderNumber, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          ¡Pago Exitoso!
        </h2>
        <p className="text-gray-600 mb-6">
          Tu pedido ha sido confirmado y está en proceso.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600 mb-1">Número de Orden</p>
          <p className="text-2xl font-bold text-blue-600">#{orderNumber}</p>
        </div>

        <div className="text-left space-y-2 mb-6">
          <div className="flex items-start gap-2">
            <Package className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-800">Próximos pasos:</p>
              <p className="text-sm text-gray-600">
                Recibirás un email de confirmación con los detalles de tu pedido.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Continuar Comprando
        </button>
      </div>
    </div>
  );
}
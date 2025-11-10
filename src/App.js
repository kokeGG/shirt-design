//App.js
import React, { useState } from 'react';
import ColorSelector from './components/ColorSelector';
import ImageUploader from './components/ImageUploader';
import SizeControl from './components/SizeControl';
import PositionControl from './components/PositionControl';
import TShirtPreview from './components/TShirtPreview';
import ResetButton from './components/ResetButton';
import AddToCartButton from './components/AddToCartButton';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import { sendOrderEmail } from './services/emailService';
import { openWhatsAppWithOrder } from './services/whatsappService';
import { captureCartPreviews } from './utils/simpleCapture';

export default function App() {
  // TU NÚMERO DE WHATSAPP (formato internacional sin +)
  const WHATSAPP_NUMBER = '527131587587'; // ⚠️ CAMBIA ESTO POR TU NÚMERO

  const [shirtColor, setShirtColor] = useState('white');
  const [currentSide, setCurrentSide] = useState('front');
  
  // Estados para el frente
  const [frontImage, setFrontImage] = useState(null);
  const [frontSize, setFrontSize] = useState(150);
  const [frontPosition, setFrontPosition] = useState({ x: 50, y: 40 });
  
  // Estados para atrás
  const [backImage, setBackImage] = useState(null);
  const [backSize, setBackSize] = useState(150);
  const [backPosition, setBackPosition] = useState({ x: 50, y: 40 });
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Estados del carrito
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Precio base de las playeras
  const BASE_PRICE = 120; // MXN

  // Obtener estados del lado actual
  const currentImage = currentSide === 'front' ? frontImage : backImage;
  const currentSize = currentSide === 'front' ? frontSize : backSize;
  const currentPosition = currentSide === 'front' ? frontPosition : backPosition;

  // Funciones para actualizar el lado actual
  const setCurrentImage = (img) => {
    if (currentSide === 'front') {
      setFrontImage(img);
    } else {
      setBackImage(img);
    }
  };

  const setCurrentSize = (size) => {
    if (currentSide === 'front') {
      setFrontSize(size);
    } else {
      setBackSize(size);
    }
  };

  const setCurrentPosition = (pos) => {
    if (currentSide === 'front') {
      setFrontPosition(pos);
    } else {
      setBackPosition(pos);
    }
  };

  const handleRotate = () => {
    setCurrentSide(currentSide === 'front' ? 'back' : 'front');
  };

  const handleReset = () => {
    if (currentSide === 'front') {
      setFrontImage(null);
      setFrontSize(150);
      setFrontPosition({ x: 50, y: 40 });
    } else {
      setBackImage(null);
      setBackSize(150);
      setBackPosition({ x: 50, y: 40 });
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: currentPosition.x,
      y: currentPosition.y,
      mouseX: e.clientX,
      mouseY: e.clientY
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.mouseX;
      const deltaY = e.clientY - dragStart.mouseY;
      
      const percentX = (deltaX / 400) * 100;
      const percentY = (deltaY / 500) * 100;
      
      const newX = Math.max(0, Math.min(100, dragStart.x + percentX));
      const newY = Math.max(0, Math.min(100, dragStart.y + percentY));
      
      setCurrentPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Función para agregar al carrito
  const handleAddToCart = () => {
    const newItem = {
      id: Date.now(),
      color: shirtColor,
      frontImage: frontImage,
      backImage: backImage,
      frontSize: frontSize,
      frontPosition: frontPosition,
      backSize: backSize,
      backPosition: backPosition,
      price: BASE_PRICE
    };

    setCart([...cart, newItem]);
    setIsCartOpen(true);

    // Opcional: limpiar el diseño actual
    setFrontImage(null);
    setBackImage(null);
    setFrontSize(150);
    setBackSize(150);
    setFrontPosition({ x: 50, y: 40 });
    setBackPosition({ x: 50, y: 40 });
  };

  // Función para remover del carrito
  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // Función para proceder al checkout
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Función para enviar pedido por WhatsApp con datos del formulario
// const handleConfirmOrder = (formData) => {
//   // Construir mensaje con datos del cliente
//   let message = '*🎨 NUEVO PEDIDO - PLAYERAS PERSONALIZADAS*\n\n';
  
//   message += '*📋 DATOS DEL CLIENTE:*\n';
//   message += `• Nombre: ${formData.nombre}\n`;
//   message += `• Teléfono: ${formData.telefono}\n`;
//   message += `• Email: ${formData.email}\n\n`;
  
//   message += '*📦 DIRECCIÓN DE ENVÍO:*\n';
//   message += `• Dirección: ${formData.direccion}\n`;
//   message += `• Ciudad: ${formData.ciudad}\n`;
//   message += `• Estado: ${formData.estado}\n`;
//   message += `• C.P.: ${formData.codigoPostal}\n\n`;
  
//   message += '*👕 PRODUCTOS:*\n';
//   cart.forEach((item, index) => {
//     message += `\n*Playera ${index + 1}:*\n`;
//     message += `• Color: ${item.color === 'white' ? 'Blanca' : 'Negra'}\n`;
//     message += `• Diseño: ${
//       item.frontImage && item.backImage
//         ? 'Frente y Atrás'
//         : item.frontImage
//         ? 'Solo Frente'
//         : 'Solo Atrás'
//     }\n`;
//     message += `• Precio: $${item.price.toFixed(2)} MXN\n`;
//   });

//     const total = cart.reduce((sum, item) => sum + item.price, 0);
//     message += `*TOTAL: ${total.toFixed(2)} MXN*\n\n`;
//     message += '_Las imágenes de los diseños se enviarán a continuación._';

//     // Codificar mensaje para URL
//     const encodedMessage = encodeURIComponent(message);
    
//     // Abrir WhatsApp
//     const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
//     window.open(whatsappURL, '_blank');

//     // Limpiar carrito y cerrar modales
//   setCart([]);
//   setIsCheckoutOpen(false);
  
//   // Opcional: Mostrar mensaje de confirmación
//   alert('¡Pedido enviado! Te contactaremos pronto por WhatsApp.');
//   };

// Reemplaza tu función handleConfirmOrder con esta:
const handleConfirmOrder = async (formData) => {
  try {
    // Mostrar loading
    const loadingAlert = document.createElement('div');
    loadingAlert.innerHTML = `
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                  background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                  z-index: 10000; text-align: center;">
        <div style="font-size: 24px; margin-bottom: 15px;">📧</div>
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">Enviando pedido...</div>
        <div style="font-size: 14px; color: #666;">Por favor espera un momento</div>
      </div>
      <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 9999;"></div>
    `;
    document.body.appendChild(loadingAlert);

    // 1. Generar imágenes de vista previa
    console.log('Generando previews...');
    const previews = await captureCartPreviews(cart);
    console.log('Previews generadas:', previews.length);

    // 2. Enviar email con las imágenes
    console.log('Enviando email...');
    const emailResult = await sendOrderEmail(formData, cart, previews);
    
    // Remover loading
    document.body.removeChild(loadingAlert);

    if (emailResult.success) {
      // 3. Abrir WhatsApp con el mensaje
      console.log('Abriendo WhatsApp...');
      openWhatsAppWithOrder(WHATSAPP_NUMBER, formData, cart, emailResult.imageUrls);

      // 4. Limpiar y cerrar
      setCart([]);
      setIsCheckoutOpen(false);

      // Mostrar mensaje de éxito
      alert(
        '✅ ¡Pedido procesado exitosamente!\n\n' +
        '📧 Hemos recibido tu pedido por email con todas las imágenes.\n' +
        '💬 WhatsApp se ha abierto con tu pedido listo para enviar.\n\n' +
        '👉 Solo da click en "Enviar" en WhatsApp para confirmar.\n\n' +
        '¡Te contactaremos pronto!'
      );
    } else {
      throw new Error('Error al enviar el email');
    }

  } catch (error) {
    console.error('Error en handleConfirmOrder:', error);
    
    // Remover loading si existe
    const loadingElement = document.querySelector('[style*="z-index: 10000"]');
    if (loadingElement && loadingElement.parentElement) {
      loadingElement.parentElement.remove();
    }

    alert(
      '❌ Hubo un error al procesar tu pedido.\n\n' +
      'Por favor, intenta nuevamente o contacta directamente por WhatsApp.\n\n' +
      'Error: ' + error.message
    );
  }
};

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Carrito flotante */}
      <Cart
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}  // ⬅️ CAMBIAR onWhatsAppOrder por onCheckout
        isOpen={isCartOpen}
        onToggle={() => setIsCartOpen(!isCartOpen)}
      />

      {/* Modal de Checkout */}
      {isCheckoutOpen && (
        <CheckoutForm
          cart={cart}
          onClose={() => setIsCheckoutOpen(false)}
          onSubmit={handleConfirmOrder}
        />
      )}

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          🎨 Kinelo design
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Sube tu diseño y visualízalo en tiempo real - ¡Frente y Atrás!
        </p>

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
                  ${BASE_PRICE} MXN
                </p>
                <p className="text-sm text-gray-500 text-center">
                  Precio por playera personalizada
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
    </div>
  );
}

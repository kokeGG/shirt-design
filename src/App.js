// //App.js
// import React, { useState } from 'react';
// import ColorSelector from './components/ColorSelector';
// import ImageUploader from './components/ImageUploader';
// import SizeControl from './components/SizeControl';
// import PositionControl from './components/PositionControl';
// import TShirtPreview from './components/TShirtPreview';
// import ResetButton from './components/ResetButton';
// import AddToCartButton from './components/AddToCartButton';
// import Cart from './components/Cart';
// import CheckoutForm from './components/CheckoutForm';
// import { sendOrderEmail } from './services/emailService';
// import { openWhatsAppWithOrder } from './services/whatsappService';
// import { captureCartPreviews } from './utils/simpleCapture';
// import { captureAllPreviews } from './utils/advancedCapture';
// import SizeSelector from './components/SizeSelector';
// import QuantitySelector from './components/QuantitySelector';

// export default function App() {
//   // TU NÚMERO DE WHATSAPP (formato internacional sin +)
//   const WHATSAPP_NUMBER = '527131587587'; // ⚠️ CAMBIA ESTO POR TU NÚMERO

//   const [shirtColor, setShirtColor] = useState('white');
//   const [currentSide, setCurrentSide] = useState('front');
  
//   // Estados para el frente
//   const [frontImage, setFrontImage] = useState(null);
//   const [frontSize, setFrontSize] = useState(150);
//   const [frontPosition, setFrontPosition] = useState({ x: 50, y: 40 });
  
//   // Estados para atrás
//   const [backImage, setBackImage] = useState(null);
//   const [backSize, setBackSize] = useState(150);
//   const [backPosition, setBackPosition] = useState({ x: 50, y: 40 });
  
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

//   // Estado de talla y cantidad
//   const [size, setSize] = useState('M');
//   const [quantity, setQuantity] = useState(1);


//   // Estados del carrito
//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

//   // Precio base de las playeras
//   const BASE_PRICE = 120; // MXN

//   // Obtener estados del lado actual
//   const currentImage = currentSide === 'front' ? frontImage : backImage;
//   const currentSize = currentSide === 'front' ? frontSize : backSize;
//   const currentPosition = currentSide === 'front' ? frontPosition : backPosition;

//   // Funciones para actualizar el lado actual
//   const setCurrentImage = (img) => {
//     if (currentSide === 'front') {
//       setFrontImage(img);
//     } else {
//       setBackImage(img);
//     }
//   };

//   const setCurrentSize = (size) => {
//     if (currentSide === 'front') {
//       setFrontSize(size);
//     } else {
//       setBackSize(size);
//     }
//   };

//   const setCurrentPosition = (pos) => {
//     if (currentSide === 'front') {
//       setFrontPosition(pos);
//     } else {
//       setBackPosition(pos);
//     }
//   };

//   const handleRotate = () => {
//     setCurrentSide(currentSide === 'front' ? 'back' : 'front');
//   };

//   const handleReset = () => {
//     if (currentSide === 'front') {
//       setFrontImage(null);
//       setFrontSize(150);
//       setFrontPosition({ x: 50, y: 40 });
//     } else {
//       setBackImage(null);
//       setBackSize(150);
//       setBackPosition({ x: 50, y: 40 });
//     }
//   };

//   const handleMouseDown = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//     setDragStart({
//       x: currentPosition.x,
//       y: currentPosition.y,
//       mouseX: e.clientX,
//       mouseY: e.clientY
//     });
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       const deltaX = e.clientX - dragStart.mouseX;
//       const deltaY = e.clientY - dragStart.mouseY;
      
//       const percentX = (deltaX / 400) * 100;
//       const percentY = (deltaY / 500) * 100;
      
//       const newX = Math.max(0, Math.min(100, dragStart.x + percentX));
//       const newY = Math.max(0, Math.min(100, dragStart.y + percentY));
      
//       setCurrentPosition({ x: newX, y: newY });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   // Función para agregar al carrito
//   const handleAddToCart = () => {
//     const newItem = {
//       id: Date.now(),
//       color: shirtColor,
//       frontImage: frontImage,
//       backImage: backImage,
//       frontSize: frontSize,
//       frontPosition: frontPosition,
//       backSize: backSize,
//       backPosition: backPosition,
//       price: BASE_PRICE * quantity,
//       size: size,
//       quantity: quantity
//     };

//     setCart([...cart, newItem]);
//     setIsCartOpen(true);

//     // Opcional: limpiar el diseño actual
//     setFrontImage(null);
//     setBackImage(null);
//     setFrontSize(150);
//     setBackSize(150);
//     setFrontPosition({ x: 50, y: 40 });
//     setBackPosition({ x: 50, y: 40 });
//   };

//   // Función para remover del carrito
//   const handleRemoveFromCart = (index) => {
//     setCart(cart.filter((_, i) => i !== index));
//   };

//   // Función para proceder al checkout
//   const handleCheckout = () => {
//     setIsCartOpen(false);
//     setIsCheckoutOpen(true);
//   };

// const handleConfirmOrder = async (formData) => {
//   try {
//     const loadingAlert = document.createElement('div');
//     loadingAlert.innerHTML = `
//       <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
//                   background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);
//                   z-index: 10000; text-align: center;">
//         <div style="font-size: 24px; margin-bottom: 15px;">📧</div>
//         <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">Generando imágenes...</div>
//         <div style="font-size: 14px; color: #666;">Esto puede tomar unos segundos</div>
//       </div>
//       <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 9999;"></div>
//     `;
//     document.body.appendChild(loadingAlert);

//     // 1. Generar TODAS las imágenes (simple, completa, diseños limpios)
//     // console.log('Generando todas las previews...');
//     const allPreviews = await captureAllPreviews(cart);
//     // console.log('Previews generadas:', allPreviews);

//     // Actualizar mensaje de loading
//     loadingAlert.querySelector('div:nth-child(2)').textContent = 'Enviando email...';

//     // 2. Enviar email con todas las imágenes
//     const emailResult = await sendOrderEmail(formData, cart, allPreviews);
    
//     document.body.removeChild(loadingAlert);

//     if (emailResult.success) {
//       const whatsappImageUrls = Object.values(emailResult.organizedUrls)
//     .map(item => item.full)  // Solo las imágenes completas
//       // 3. Abrir WhatsApp
//       openWhatsAppWithOrder(WHATSAPP_NUMBER, formData, cart, whatsappImageUrls);

//       setCart([]);
//       setIsCheckoutOpen(false);

//       alert(
//         '✅ ¡Pedido procesado exitosamente!\n\n' +
//         '📧 Email enviado con:\n' +
//         '   • Resumen de cada playera\n' +
//         '   • Vista previa completa\n' +
//         '   • Diseños limpios (frente y/o atrás)\n\n' +
//         '💬 WhatsApp abierto con el resumen.\n\n' +
//         '👉 Solo da click en "Enviar" en WhatsApp.\n\n' +
//         '¡Te contactaremos pronto!'
//       );
//     } else {
//       throw new Error('Error al enviar el email');
//     }

//   } catch (error) {
//     console.error('Error:', error);
    
//     const loadingElement = document.querySelector('[style*="z-index: 10000"]');
//     if (loadingElement && loadingElement.parentElement) {
//       loadingElement.parentElement.remove();
//     }

//     alert(
//       '❌ Error al procesar el pedido.\n\n' +
//       'Por favor, intenta nuevamente.\n\n' +
//       'Error: ' + error.message
//     );
//   }
// };

//   return (
//     <div 
//       className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8"
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//     >
//       {/* Carrito flotante */}
//       <Cart
//         cart={cart}
//         onRemoveItem={handleRemoveFromCart}
//         onCheckout={handleCheckout}  // ⬅️ CAMBIAR onWhatsAppOrder por onCheckout
//         isOpen={isCartOpen}
//         onToggle={() => setIsCartOpen(!isCartOpen)}
//       />

//       {/* Modal de Checkout */}
//       {isCheckoutOpen && (
//         <CheckoutForm
//           cart={cart}
//           onClose={() => setIsCheckoutOpen(false)}
//           onSubmit={handleConfirmOrder}
//         />
//       )}

//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
//           🎨 Kinelo design
//         </h1>
//         <p className="text-gray-600 mb-8 text-center">
//           Sube tu diseño y visualízalo en tiempo real - ¡Frente y Atrás!
//         </p>

//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Panel de Controles */}
//           <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
//             <ColorSelector 
//               shirtColor={shirtColor} 
//               setShirtColor={setShirtColor} 
//             />
            
//             <ImageUploader 
//               onImageUpload={setCurrentImage}
//               side={currentSide}
//             />

//             {currentImage && (
//               <>
//                 <SizeControl 
//                   imageSize={currentSize} 
//                   setImageSize={setCurrentSize} 
//                 />

//                 <PositionControl 
//                   imagePosition={currentPosition} 
//                   setImagePosition={setCurrentPosition} 
//                 />

//                 {/* TODO: AGREGAR TALLAS (XS, S, M, G, ETC..) Y AGREGAR CANTIDAD (La cantidad debe afectar el precio) */}

//                 <SizeSelector 
//                   size={size} 
//                   setSize={setSize} 
//                 />

//                 <QuantitySelector 
//                   quantity={quantity} 
//                   setQuantity={setQuantity} 
//                 />


//                 <ResetButton 
//                   onReset={handleReset}
//                   currentSide={currentSide}
//                 />
//               </>
//             )}

//             {/* Botón Agregar al Carrito */}
//             <div className="pt-4 border-t">
//               <div className="mb-4">
//                 <p className="text-2xl font-bold text-gray-800 text-center">
//                   ${BASE_PRICE} MXN
//                 </p>
//                 <p className="text-sm text-gray-500 text-center">
//                   Precio por playera personalizada
//                 </p>
//               </div>
//               <AddToCartButton
//                 onAddToCart={handleAddToCart}
//                 frontImage={frontImage}
//                 backImage={backImage}
//               />
//             </div>

//             {/* Resumen de diseños */}
//             <div className="pt-4 border-t border-gray-200">
//               <h3 className="text-sm font-semibold text-gray-700 mb-2">
//                 Estado de diseños:
//               </h3>
//               <div className="space-y-1 text-sm">
//                 <div className="flex items-center gap-2">
//                   <span className={`w-3 h-3 rounded-full ${frontImage ? 'bg-green-500' : 'bg-gray-300'}`}></span>
//                   <span className="text-gray-600">
//                     Frente: {frontImage ? '✓ Diseño agregado' : 'Sin diseño'}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className={`w-3 h-3 rounded-full ${backImage ? 'bg-green-500' : 'bg-gray-300'}`}></span>
//                   <span className="text-gray-600">
//                     Atrás: {backImage ? '✓ Diseño agregado' : 'Sin diseño'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Vista Previa */}
//           <TShirtPreview
//             shirtColor={shirtColor}
//             uploadedImage={currentImage}
//             imageSize={currentSize}
//             imagePosition={currentPosition}
//             isDragging={isDragging}
//             onMouseDown={handleMouseDown}
//             currentSide={currentSide}
//             onRotate={handleRotate}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import CustomizeView from './views/CustomizeView';
import CollectionsView from './views/CollectionsView';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import { sendOrderEmail } from './services/emailService';
import { openWhatsAppWithOrder } from './services/whatsappService';
import { captureAllPreviews } from './utils/advancedCapture';

export default function App() {
  const WHATSAPP_NUMBER = '527131587587';
  
  // Vista actual (customize o collections)
  const [currentView, setCurrentView] = useState('customize');

  // Estados de personalización
  const [shirtColor, setShirtColor] = useState('white');
  const [currentSide, setCurrentSide] = useState('front');
  const [frontImage, setFrontImage] = useState(null);
  const [frontSize, setFrontSize] = useState(150);
  const [frontPosition, setFrontPosition] = useState({ x: 50, y: 40 });
  const [backImage, setBackImage] = useState(null);
  const [backSize, setBackSize] = useState(150);
  const [backPosition, setBackPosition] = useState({ x: 50, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  // Estados del carrito
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const BASE_PRICE = 120;

  const currentImage = currentSide === 'front' ? frontImage : backImage;
  const currentSize = currentSide === 'front' ? frontSize : backSize;
  const currentPosition = currentSide === 'front' ? frontPosition : backPosition;

  const setCurrentImage = (img) => {
    if (currentSide === 'front') setFrontImage(img);
    else setBackImage(img);
  };

  const setCurrentSize = (size) => {
    if (currentSide === 'front') setFrontSize(size);
    else setBackSize(size);
  };

  const setCurrentPosition = (pos) => {
    if (currentSide === 'front') setFrontPosition(pos);
    else setBackPosition(pos);
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

  const handleMouseUp = () => setIsDragging(false);

  // Agregar al carrito (personalizado)
  const handleAddToCart = () => {
    const newItem = {
      id: Date.now(),
      type: 'custom',
      color: shirtColor,
      frontImage,
      backImage,
      frontSize,
      frontPosition,
      backSize,
      backPosition,
      price: BASE_PRICE,
      quantity,
      size,
      totalPrice: BASE_PRICE * quantity
    };

    setCart([...cart, newItem]);
    setIsCartOpen(true);

    // Limpiar diseño
    setFrontImage(null);
    setBackImage(null);
    setFrontSize(150);
    setBackSize(150);
    setFrontPosition({ x: 50, y: 40 });
    setBackPosition({ x: 50, y: 40 });
    setQuantity(1);
  };

  // Agregar al carrito (catálogo)
  const handleAddCatalogToCart = (catalogItem) => {
    setCart([...cart, catalogItem]);
    setIsCartOpen(true);
    alert(`✅ ${catalogItem.name} agregado al carrito`);
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

const handleConfirmOrder = async (formData) => {
  try {
    const loadingAlert = document.createElement('div');
    loadingAlert.innerHTML = `
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                  background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                  z-index: 10000; text-align: center;">
        <div style="font-size: 24px; margin-bottom: 15px;">📧</div>
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">Generando imágenes...</div>
        <div style="font-size: 14px; color: #666;">Esto puede tomar unos segundos</div>
      </div>
      <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 9999;"></div>
    `;
    document.body.appendChild(loadingAlert);

    // 1. Generar TODAS las imágenes (simple, completa, diseños limpios)
    // console.log('Generando todas las previews...');
    const allPreviews = await captureAllPreviews(cart);
    // console.log('Previews generadas:', allPreviews);

    // Actualizar mensaje de loading
    loadingAlert.querySelector('div:nth-child(2)').textContent = 'Enviando email...';

    // 2. Enviar email con todas las imágenes
    const emailResult = await sendOrderEmail(formData, cart, allPreviews);
    
    document.body.removeChild(loadingAlert);

    if (emailResult.success) {
      const whatsappImageUrls = Object.values(emailResult.organizedUrls)
    .map(item => item.full)  // Solo las imágenes completas
      // 3. Abrir WhatsApp
      openWhatsAppWithOrder(WHATSAPP_NUMBER, formData, cart, whatsappImageUrls);

      setCart([]);
      setIsCheckoutOpen(false);

      alert(
        '✅ ¡Pedido procesado exitosamente!\n\n' +
        '📧 Email enviado con:\n' +
        '   • Resumen de cada playera\n' +
        '   • Vista previa completa\n' +
        '   • Diseños limpios (frente y/o atrás)\n\n' +
        '💬 WhatsApp abierto con el resumen.\n\n' +
        '👉 Solo da click en "Enviar" en WhatsApp.\n\n' +
        '¡Te contactaremos pronto!'
      );
    } else {
      throw new Error('Error al enviar el email');
    }

  } catch (error) {
    console.error('Error:', error);
    
    const loadingElement = document.querySelector('[style*="z-index: 10000"]');
    if (loadingElement && loadingElement.parentElement) {
      loadingElement.parentElement.remove();
    }

    alert(
      '❌ Error al procesar el pedido.\n\n' +
      'Por favor, intenta nuevamente.\n\n' +
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
      <Cart
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
        isOpen={isCartOpen}
        onToggle={() => setIsCartOpen(!isCartOpen)}
      />

      {isCheckoutOpen && (
        <CheckoutForm
          cart={cart}
          onClose={() => setIsCheckoutOpen(false)}
          onSubmit={handleConfirmOrder}
        />
      )}

      <div className="max-w-7xl mx-auto">
        <img
          src={`${process.env.PUBLIC_URL}/images/kineloLogo.png`}
          alt="Logo Kinelo"
          className="mx-auto mb-4 w-32"
        />
        <p className="text-gray-600 mb-8 text-center">
          Diseña tu playera o elige de nuestro catálogo
        </p>

        <Navigation currentView={currentView} setCurrentView={setCurrentView} />

        {currentView === 'customize' ? (
          <CustomizeView
            shirtColor={shirtColor}
            setShirtColor={setShirtColor}
            currentSide={currentSide}
            setCurrentSide={setCurrentSide}
            frontImage={frontImage}
            backImage={backImage}
            currentImage={currentImage}
            currentSize={currentSize}
            currentPosition={currentPosition}
            isDragging={isDragging}
            size={size}
            setSize={setSize}
            quantity={quantity}
            setQuantity={setQuantity}
            BASE_PRICE={BASE_PRICE}
            setCurrentImage={setCurrentImage}
            setCurrentSize={setCurrentSize}
            setCurrentPosition={setCurrentPosition}
            handleRotate={handleRotate}
            handleReset={handleReset}
            handleMouseDown={handleMouseDown}
            handleAddToCart={handleAddToCart}
          />
        ) : (
          <CollectionsView onAddToCart={handleAddCatalogToCart} />
        )}
      </div>
    </div>
  );
}
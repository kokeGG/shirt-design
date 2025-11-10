// const ULTRAMSG_INSTANCE_ID = 'instance149485'; // De ultramsg.com
// const ULTRAMSG_TOKEN = '9dy3dku2mxw3rb7d'; // De ultramsg.com

// export const sendWhatsAppWithImages = async (phoneNumber, message, images) => {
//   try {
//     // 1. Primero enviar el mensaje de texto
//     const textResponse = await fetch(
//       `https://api.ultramsg.com/${ULTRAMSG_INSTANCE_ID}/messages/chat`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           token: ULTRAMSG_TOKEN,
//           to: phoneNumber,
//           body: message,
//         }),
//       }
//     );

//     if (!textResponse.ok) {
//       throw new Error('Error enviando mensaje');
//     }

//     // 2. Enviar cada imagen
//     for (const image of images) {
//       // Convertir base64 a URL
//       const formData = new FormData();
//       const blob = await fetch(image.dataUrl).then(r => r.blob());
      
//       // Subir imagen a servidor temporal (puedes usar imgur, cloudinary, etc.)
//       const imageUrl = await uploadImageTemp(blob);

//       // Enviar imagen por WhatsApp
//       await fetch(
//         `https://api.ultramsg.com/${ULTRAMSG_INSTANCE_ID}/messages/image`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             token: ULTRAMSG_TOKEN,
//             to: phoneNumber,
//             image: imageUrl,
//             caption: image.filename,
//           }),
//         }
//       );

//       // Delay entre imágenes
//       await new Promise(resolve => setTimeout(resolve, 2000));
//     }

//     return { success: true };
//   } catch (error) {
//     console.error('Error enviando por WhatsApp:', error);
//     return { success: false, error };
//   }
// };

// // Subir imagen temporalmente (puedes usar ImgBB - 100% gratis)
// const uploadImageTemp = async (blob) => {
//   const IMGBB_API_KEY = 'TU_API_KEY_IMGBB'; // Gratis en imgbb.com
  
//   const formData = new FormData();
//   formData.append('image', blob);

//   const response = await fetch(
//     `https://api.imgbb.com/1/upload?key=${ea5a51dddc52b84d8f71a67f3be472f2}`,
//     {
//       method: 'POST',
//       body: formData,
//     }
//   );

//   const data = await response.json();
//   return data.data.url;
// };

//!OTRA SOLUCION

export const openWhatsAppWithOrder = (whatsappNumber, formData, cart, imageUrls) => {
  // Construir mensaje para WhatsApp
  let message = '*🎨 NUEVO PEDIDO - PLAYERAS PERSONALIZADAS*\n\n';
  
  message += '*📋 DATOS DEL CLIENTE:*\n';
  message += `• Nombre: ${formData.nombre}\n`;
  message += `• Teléfono: ${formData.telefono}\n`;
  message += `• Email: ${formData.email}\n\n`;
  
  message += '*👕 PRODUCTOS:*\n';
  cart.forEach((item, index) => {
    message += `\n*Playera ${index + 1}:*\n`;
    message += `• Color: ${item.color === 'white' ? 'Blanca' : 'Negra'}\n`;
    message += `• Diseño: ${
      item.frontImage && item.backImage
        ? 'Frente y Atrás'
        : item.frontImage
        ? 'Solo Frente'
        : 'Solo Atrás'
    }\n`;
    message += `• Precio: $${item.price.toFixed(2)} MXN\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  message += `\n*💰 TOTAL: $${total.toFixed(2)} MXN*\n\n`;
  message += `\n*🖼 DISEÑOS:* \n`;
  imageUrls.forEach((url, index) => {
    message += `• Imagen ${index + 1}: ${url}\n`;
  });
  message += '✅ _Los detalles completos con imágenes fueron enviados por email._';

  // Codificar mensaje para URL
  const encodedMessage = encodeURIComponent(message);
  
  // Abrir WhatsApp (se abrirá con el mensaje listo para enviar)
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  window.open(whatsappURL, '_blank');
};
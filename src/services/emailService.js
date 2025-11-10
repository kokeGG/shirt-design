import emailjs from '@emailjs/browser';
import { uploadToCloudinary } from "./uploadToCloudinary";

// ⚠️ CONFIGURA ESTOS VALORES CON LOS TUYOS DE EMAILJS.COM
const EMAILJS_SERVICE_ID = 'service_ni9f76c';
const EMAILJS_TEMPLATE_ID = 'template_r5razl7';
const EMAILJS_PUBLIC_KEY = 'H1PU8wKQ9wK243ByC';

// Inicializar EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);




export const sendOrderEmail = async (formData, cart, previewImages) => {
  try {
    // Subir cada imagen y obtener URL
    const imageUrls = await Promise.all(
      previewImages.map(img => uploadToCloudinary(img.dataUrl))
    );

    // Construcción del texto del pedido como antes
    const orderDetails = cart.map((item, index) => {
      const hasDesign = item.frontImage && item.backImage 
        ? 'Frente y Atrás' 
        : item.frontImage 
        ? 'Solo Frente' 
        : 'Solo Atrás';

      return `Playera ${index + 1}: ${item.color === 'white' ? 'Blanca' : 'Negra'} - ${hasDesign} - $${item.price} MXN`;
    }).join('\n');

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const templateParams = {
      customer_name: formData.nombre,
      customer_phone: formData.telefono,
      customer_email: formData.email,
      customer_address: `${formData.direccion}, ${formData.ciudad}, ${formData.estado}, C.P. ${formData.codigoPostal}`,
      order_details: orderDetails,
      total: total.toFixed(2),
      image_urls_html: imageUrls
    .map(url => `<img src="${url}" style="max-width: 350px; border: 1px solid #ccc; border-radius: 8px; margin-bottom: 20px;" />`)
    .join('')
    };


    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email enviado exitosamente:', response);
    return { success: true, response, imageUrls };

  } catch (error) {
    console.error('Error enviando email:', error);
    return { success: false, error };
  }
};


// export const sendOrderEmail = async (formData, cart, previewImages) => {
//   try {
//     // Construir detalles del pedido
//     const orderDetails = cart.map((item, index) => {
//       const hasDesign = item.frontImage && item.backImage 
//         ? 'Frente y Atrás' 
//         : item.frontImage 
//         ? 'Solo Frente' 
//         : 'Solo Atrás';
      
//       return `Playera ${index + 1}: ${item.color === 'white' ? 'Blanca' : 'Negra'} - ${hasDesign} - $${item.price} MXN`;
//     }).join('\n');

//     const total = cart.reduce((sum, item) => sum + item.price, 0);

//     // Preparar parámetros del email
//     const templateParams = {
//       customer_name: formData.nombre,
//       customer_phone: formData.telefono,
//       customer_email: formData.email,
//       customer_address: `${formData.direccion}, ${formData.ciudad}, ${formData.estado}, C.P. ${formData.codigoPostal}`,
//       order_details: orderDetails,
//       total: total.toFixed(2),
//       // Las imágenes se envían como attachments
//       attachments: previewImages.map((img, index) => ({
//         name: img.filename,
//         data: img.dataUrl.split(',')[1], // Base64 sin el prefijo
//       })),
//     };

//     // Enviar email
//     const response = await emailjs.send(
//       EMAILJS_SERVICE_ID,
//       EMAILJS_TEMPLATE_ID,
//       templateParams
//     );

//     console.log('Email enviado exitosamente:', response);
//     return { success: true, response };

//   } catch (error) {
//     console.error('Error enviando email:', error);
//     return { success: false, error };
//   }
// };


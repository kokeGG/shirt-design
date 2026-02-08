import emailjs from '@emailjs/browser';
import { uploadToCloudinary } from "./uploadToCloudinary";

// ⚠️ CONFIGURA ESTOS VALORES CON LOS TUYOS DE EMAILJS.COM
const EMAILJS_SERVICE_ID = 'service_ni9f76c';
const EMAILJS_TEMPLATE_ID = 'template_r5razl7';
const EMAILJS_PUBLIC_KEY = 'H1PU8wKQ9wK243ByC';

// Inicializar EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendOrderEmail = async (formData, cart, allPreviews) => {
  try {
    // Subir todas las imágenes a Cloudinary
    const uploadPromises = [];
    
    for (let i = 0; i < allPreviews.length; i++) {
      const preview = allPreviews[i];
      
      // Imagen simple
      if (preview.simple) {
        uploadPromises.push({
          type: 'simple',
          index: i,
          promise: uploadToCloudinary(preview.simple)
        });
      }
      
      // Vista previa completa
      if (preview.full) {
        uploadPromises.push({
          type: 'full',
          index: i,
          promise: uploadToCloudinary(preview.full)
        });
      }
      
      // Diseño frente
      if (preview.designFront) {
        uploadPromises.push({
          type: 'designFront',
          index: i,
          promise: uploadToCloudinary(preview.designFront)
        });
      }
      
      // Diseño atrás
      if (preview.designBack) {
        uploadPromises.push({
          type: 'designBack',
          index: i,
          promise: uploadToCloudinary(preview.designBack)
        });
      }
    }

    // Esperar todas las subidas
    const uploadResults = await Promise.all(
      uploadPromises.map(async (item) => ({
        type: item.type,
        index: item.index,
        url: await item.promise
      }))
    );

    // Organizar URLs por tipo e índice
    const organizedUrls = {};
    uploadResults.forEach(result => {
      if (!organizedUrls[result.index]) {
        organizedUrls[result.index] = {};
      }
      organizedUrls[result.index][result.type] = result.url;
    });

    // Construir HTML para el email
    let imagesHtml = '';
    
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      const urls = organizedUrls[i];
      
      imagesHtml += `
        <div style="margin-bottom: 40px; border: 2px solid #e5e7eb; border-radius: 10px; padding: 20px; background: #f9fafb;">
          <h3 style="color: #1f2937; margin-bottom: 15px;">
            📦 Playera #${i + 1} - ${item.color === 'white' ? 'Blanca' : 'Negra'} - $${item.price * item.quantity} MXN
          </h3>

          <p style="font-size: 15px; color: #374151; margin-bottom: 10px;">
            <strong>Talla:</strong> ${item.size} 
            &nbsp;|&nbsp;
            <strong>Cantidad:</strong> ${item.quantity}
          </p>

          
          <h4 style="color: #374151; margin: 15px 0 10px 0;">1️⃣ Resumen:</h4>
          <img src="${urls.simple}" style="max-width: 100%; border: 1px solid #ccc; border-radius: 8px; margin-bottom: 15px;" />
          
          <h4 style="color: #374151; margin: 15px 0 10px 0;">2️⃣ Vista Previa Completa (Playera + Diseño):</h4>
          <img src="${urls.full}" style="max-width: 100%; border: 1px solid #ccc; border-radius: 8px; margin-bottom: 15px;" />
          
          ${urls.designFront ? `
            <h4 style="color: #374151; margin: 15px 0 10px 0;">3️⃣ Diseño Frente (Limpio):</h4>
            <img src="${urls.designFront}" style="max-width: 400px; border: 1px solid #ccc; border-radius: 8px; margin-bottom: 15px; background: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #ffffff 10px, #ffffff 20px);" />
          ` : ''}
          
          ${urls.designBack ? `
            <h4 style="color: #374151; margin: 15px 0 10px 0;">4️⃣ Diseño Atrás (Limpio):</h4>
            <img src="${urls.designBack}" style="max-width: 400px; border: 1px solid #ccc; border-radius: 8px; margin-bottom: 15px; background: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #ffffff 10px, #ffffff 20px);" />
          ` : ''}
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
        </div>
      `;
    }

    const orderDetails = cart.map((item, index) => {
    const hasDesign = item.frontImage && item.backImage 
      ? 'Frente y Atrás' 
      : item.frontImage 
      ? 'Solo Frente' 
      : 'Solo Atrás';
    
      return `Playera ${index + 1}: ${item.color === 'white' ? 'Blanca' : 'Negra'}
      • Diseño: ${hasDesign}
      • Talla: ${item.size}
      • Cantidad: ${item.quantity}
      • Subtotal: $${item.price * item.quantity} MXN`;
    }).join('\n\n');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const templateParams = {
      customer_name: formData.nombre,
      customer_phone: formData.telefono,
      customer_email: formData.email,
      order_details: orderDetails,
      total: total.toFixed(2),
      image_urls_html: imagesHtml
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    // console.log('Email enviado exitosamente:', response);
    return { success: true, response, organizedUrls };

  } catch (error) {
    console.error('Error enviando email:', error);
    return { success: false, error };
  }
};


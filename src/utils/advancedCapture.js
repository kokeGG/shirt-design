export const captureFullPreview = async (item, index) => {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');

  // Fondo blanco
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const shirtColor = item.color === 'white' ? 'blanca' : 'negra';
  
  try {
    // Dibujar FRENTE
    if (item.frontImage) {
      const shirtFrontImg = await loadImage(`${process.env.PUBLIC_URL}/images/playera-${shirtColor}-frente.jpeg`);
      ctx.drawImage(shirtFrontImg, 50, 50, 300, 400);

      // Dibujar diseño del frente
      const designFrontImg = await loadImage(item.frontImage);
      const frontX = 50 + (item.frontPosition.x / 100) * 300;
      const frontY = 50 + (item.frontPosition.y / 100) * 400;
      ctx.drawImage(
        designFrontImg,
        frontX - item.frontSize / 2,
        frontY - item.frontSize / 2,
        item.frontSize,
        item.frontSize
      );

      // Etiqueta FRENTE
      ctx.fillStyle = '#333';
      ctx.font = 'bold 16px Arial';
      ctx.fillText('FRENTE', 50, 470);
    }

    // Dibujar ATRÁS
    if (item.backImage) {
      const shirtBackImg = await loadImage(`${process.env.PUBLIC_URL}/images/playera-${shirtColor}-atras.jpeg`);
      ctx.drawImage(shirtBackImg, 450, 50, 300, 400);

      // Dibujar diseño del atrás
      const designBackImg = await loadImage(item.backImage);
      const backX = 450 + (item.backPosition.x / 100) * 300;
      const backY = 50 + (item.backPosition.y / 100) * 400;
      ctx.drawImage(
        designBackImg,
        backX - item.backSize / 2,
        backY - item.backSize / 2,
        item.backSize,
        item.backSize
      );

      // Etiqueta ATRÁS
      ctx.fillStyle = '#333';
      ctx.font = 'bold 16px Arial';
      ctx.fillText('ATRÁS', 450, 470);
    }

    // Info del pedido
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Playera #${index + 1} - ${item.color === 'white' ? 'Blanca' : 'Negra'}`, 400, 520);
    ctx.font = '18px Arial';
    ctx.fillText(`Precio: $${item.price * item.quantity} MXN`, 400, 550);

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error capturando preview completo:', error);
    return null;
  }
};

// Función para capturar solo la imagen del diseño (limpia)
export const captureDesignOnly = async (item, index, side) => {
  const canvas = document.createElement('canvas');
  const designImage = side === 'front' ? item.frontImage : item.backImage;
  
  if (!designImage) return null;

  try {
    const img = await loadImage(designImage);
    
    // Canvas del tamaño exacto de la imagen
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');

    // Dibujar imagen (respetando transparencia)
    ctx.drawImage(img, 0, 0);

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error capturando diseño limpio:', error);
    return null;
  }
};

// Función para capturar resumen simple (como antes)
export const captureSimplePreview = async (item, index) => {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f9fafb';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 28px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`Playera #${index + 1}`, canvas.width / 2, 40);

  ctx.font = '20px Arial';
  ctx.fillText(`Color: ${item.color === 'white' ? 'Blanca' : 'Negra'}`, canvas.width / 2, 75);
  ctx.fillText(`Precio: $${item.price * item.quantity} MXN`, canvas.width / 2, 105);

  try {
    let yPosition = 150;

    if (item.frontImage) {
      const frontImg = await loadImage(item.frontImage);
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('FRENTE:', 50, yPosition);
      
      const scale = Math.min(250 / frontImg.width, 250 / frontImg.height);
      const width = frontImg.width * scale;
      const height = frontImg.height * scale;
      
      ctx.drawImage(frontImg, (canvas.width - width) / 2, yPosition + 20, width, height);
      yPosition += height + 60;
    }

    if (item.backImage) {
      const backImg = await loadImage(item.backImage);
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('ATRÁS:', 50, yPosition);
      
      const scale = Math.min(250 / backImg.width, 250 / backImg.height);
      const width = backImg.width * scale;
      const height = backImg.height * scale;
      
      ctx.drawImage(backImg, (canvas.width - width) / 2, yPosition + 20, width, height);
    }

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error capturando preview simple:', error);
    return null;
  }
};

// Función principal que genera todas las imágenes
export const captureAllPreviews = async (cart) => {
  const allPreviews = [];

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const previews = {
      simple: null,
      full: null,
      designFront: null,
      designBack: null
    };

    // 1. Preview simple (resumen)
    previews.simple = await captureSimplePreview(item, i);

    // 2. Preview completo (playera + diseño)
    previews.full = await captureFullPreview(item, i);

    // 3. Diseño limpio frente
    if (item.frontImage) {
      previews.designFront = await captureDesignOnly(item, i, 'front');
    }

    // 4. Diseño limpio atrás
    if (item.backImage) {
      previews.designBack = await captureDesignOnly(item, i, 'back');
    }

    allPreviews.push(previews);
  }

  return allPreviews;
};

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};
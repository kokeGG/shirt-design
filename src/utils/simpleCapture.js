//simpleCapture.js
export const captureCartPreviews = async (cart) => {
  const previews = [];

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    
    // Crear un canvas para cada playera
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Fondo blanco
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Título
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Playera #${i + 1}`, canvas.width / 2, 40);

    // Información
    ctx.font = '20px Arial';
    ctx.fillText(`Color: ${item.color === 'white' ? 'Blanca' : 'Negra'}`, canvas.width / 2, 75);
    ctx.fillText(`Precio: $${item.price * item.quantity} MXN`, canvas.width / 2, 105);

    try {
      // Cargar y dibujar imágenes
      let yPosition = 150;

      // Frente
      if (item.frontImage) {
        const frontImg = await loadImageSimple(item.frontImage);
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('FRENTE:', 50, yPosition);
        
        const scale = Math.min(250 / frontImg.width, 250 / frontImg.height);
        const width = frontImg.width * scale;
        const height = frontImg.height * scale;
        
        ctx.drawImage(frontImg, 
          (canvas.width - width) / 2, 
          yPosition + 20, 
          width, 
          height
        );
        yPosition += height + 60;
      }

      // Atrás
      if (item.backImage) {
        const backImg = await loadImageSimple(item.backImage);
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('ATRÁS:', 50, yPosition);
        
        const scale = Math.min(250 / backImg.width, 250 / backImg.height);
        const width = backImg.width * scale;
        const height = backImg.height * scale;
        
        ctx.drawImage(backImg, 
          (canvas.width - width) / 2, 
          yPosition + 20, 
          width, 
          height
        );
      }

      // Convertir canvas a data URL
      const dataUrl = canvas.toDataURL('image/png');
      previews.push({
        dataUrl,
        filename: `playera-${i + 1}-${item.color}.png`
      });

    } catch (error) {
      console.error('Error capturando preview:', error);
    }
  }

  return previews;
};

const loadImageSimple = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const downloadPreviews = (previews) => {
  previews.forEach(({ dataUrl, filename }, index) => {
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, index * 500); // Delay para evitar bloqueo del navegador
  });
};
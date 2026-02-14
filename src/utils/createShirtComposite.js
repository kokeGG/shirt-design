export const createShirtComposite = async ({
  shirtColor,
  side,
  designImage,
  designSize,
  designPosition
}) => {
  const canvas = document.createElement('canvas');

  // Tamaño igual al render del UI (max-w-md + maxHeight 500)
  canvas.width = 400;
  canvas.height = 500;

  const ctx = canvas.getContext('2d');

  const color = shirtColor === 'white' ? 'blanca' : 'negra';
  const sideName = side === 'front' ? 'frente' : 'atras';

  const shirtSrc = `${process.env.PUBLIC_URL}/images/playera-${color}-${sideName}.jpeg`;

  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  // 1. Playera
  const shirtImg = await loadImage(shirtSrc);
  ctx.drawImage(shirtImg, 0, 0, canvas.width, canvas.height);

  // 2. Diseño
  if (designImage) {
    const designImg = await loadImage(designImage);

    const x = (designPosition.x / 100) * canvas.width;
    const y = (designPosition.y / 100) * canvas.height;

    // proporción real
    const aspectRatio = designImg.width / designImg.height;

    // designSize = ancho visible (como en el UI)
    const drawWidth = designSize;
    const drawHeight = designSize / aspectRatio;

    // centrado real
    ctx.drawImage(
      designImg,
      x - drawWidth / 2,
      y - drawHeight / 2,
      drawWidth,
      drawHeight
    );
  }

  return canvas.toDataURL('image/png');
};

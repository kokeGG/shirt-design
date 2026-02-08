// domCapture.js
import html2canvas from 'html2canvas';

export const captureDOMElement = async (element) => {
  if (!element) {
    throw new Error('Elemento DOM no encontrado');
  }

  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff',
    scale: 2,
    useCORS: true,
    allowTaint: true
  });

  return canvas;
};

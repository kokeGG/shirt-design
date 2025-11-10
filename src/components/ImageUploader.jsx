//ImageUploader.jsx
import React, { useState } from 'react';
import { Upload, Scissors, Loader } from 'lucide-react';

export default function ImageUploader({ onImageUpload, side }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        setCurrentImage(imageData);
        onImageUpload(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = async () => {
    if (!currentImage) return;

    setIsProcessing(true);

    try {
      // Convertir base64 a blob
      const response = await fetch(currentImage);
      const blob = await response.blob();

      // Crear FormData
      const formData = new FormData();
      formData.append('image_file', blob);
      formData.append('size', 'auto');

      // TU API KEY DE REMOVE.BG
      const API_KEY = 'KvpsHoSnPMvPGxxaVbBFp2hJ'; // ⚠️ 

      // Llamar a la API
      const apiResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': API_KEY,
        },
        body: formData,
      });

      if (apiResponse.ok) {
        const resultBlob = await apiResponse.blob();
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageWithoutBg = e.target.result;
          setCurrentImage(imageWithoutBg);
          onImageUpload(imageWithoutBg);
        };
        reader.readAsDataURL(resultBlob);
      } else {
        const errorData = await apiResponse.json();
        alert(`Error: ${errorData.errors?.[0]?.title || 'No se pudo eliminar el fondo'}`);
      }
    } catch (error) {
      console.error('Error removing background:', error);
      alert('Error al eliminar el fondo. Verifica tu conexión.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        2. Sube tu Diseño {side === 'front' ? '(Frente)' : '(Atrás)'}
      </h2>
      
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
        <Upload className="w-8 h-8 text-gray-400 mb-2" />
        <span className="text-sm text-gray-500">
          Click para subir imagen
        </span>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </label>

      {/* Botón para eliminar fondo */}
      {currentImage && (
        <button
          onClick={removeBackground}
          disabled={isProcessing}
          className={`w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
            isProcessing
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-500 hover:bg-purple-600 text-white shadow-md hover:shadow-lg'
          }`}
        >
          {isProcessing ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Eliminando fondo...
            </>
          ) : (
            <>
              <Scissors className="w-5 h-5" />
              Eliminar Fondo
            </>
          )}
        </button>
      )}
    </div>
  );
}



//!OPCION CANVAS
// import React, { useState, useRef } from 'react';
// import { Upload, Scissors, Loader } from 'lucide-react';

// export default function ImageUploaderCanvas({ onImageUpload, side }) {
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [currentImage, setCurrentImage] = useState(null);
//   const canvasRef = useRef(null);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const imageData = event.target.result;
//         setCurrentImage(imageData);
//         onImageUpload(imageData);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeBackgroundCanvas = () => {
//     if (!currentImage) return;

//     setIsProcessing(true);

//     const img = new Image();
//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
      
//       canvas.width = img.width;
//       canvas.height = img.height;
      
//       ctx.drawImage(img, 0, 0);
      
//       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//       const data = imageData.data;

//       // Detectar color de fondo (esquina superior izquierda)
//       const bgR = data[0];
//       const bgG = data[1];
//       const bgB = data[2];
      
//       // Tolerancia para colores similares
//       const tolerance = 50;

//       // Hacer transparentes los píxeles similares al fondo
//       for (let i = 0; i < data.length; i += 4) {
//         const r = data[i];
//         const g = data[i + 1];
//         const b = data[i + 2];
        
//         // Si el color es similar al fondo, hacerlo transparente
//         if (
//           Math.abs(r - bgR) < tolerance &&
//           Math.abs(g - bgG) < tolerance &&
//           Math.abs(b - bgB) < tolerance
//         ) {
//           data[i + 3] = 0; // Alpha = 0 (transparente)
//         }
//       }

//       ctx.putImageData(imageData, 0, 0);
      
//       const processedImage = canvas.toDataURL('image/png');
//       setCurrentImage(processedImage);
//       onImageUpload(processedImage);
//       setIsProcessing(false);
//     };

//     img.src = currentImage;
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">
//         2. Sube tu Diseño {side === 'front' ? '(Frente)' : '(Atrás)'}
//       </h2>
      
//       <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
//         <Upload className="w-8 h-8 text-gray-400 mb-2" />
//         <span className="text-sm text-gray-500">
//           Click para subir imagen
//         </span>
//         <input
//           type="file"
//           className="hidden"
//           accept="image/*"
//           onChange={handleImageUpload}
//         />
//       </label>

//       {/* Botón para eliminar fondo */}
//       {currentImage && (
//         <button
//           onClick={removeBackgroundCanvas}
//           disabled={isProcessing}
//           className={`w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
//             isProcessing
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-purple-500 hover:bg-purple-600 text-white shadow-md hover:shadow-lg'
//           }`}
//         >
//           {isProcessing ? (
//             <>
//               <Loader className="w-5 h-5 animate-spin" />
//               Eliminando fondo...
//             </>
//           ) : (
//             <>
//               <Scissors className="w-5 h-5" />
//               Eliminar Fondo (Beta)
//             </>
//           )}
//         </button>
//       )}

//       <p className="text-xs text-gray-500 mt-2 text-center">
//         💡 Funciona mejor con fondos sólidos y uniformes
//       </p>
//     </div>
//   );
// }
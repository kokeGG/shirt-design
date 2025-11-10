// import { generatePreviewImages } from "./capturePreview";

// // Convierte Blob => base64 DataURL
// const blobToDataURL = (blob) =>
//   new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result);
//     reader.readAsDataURL(blob);
//   });

// export const captureCartPreviews = async (cart) => {
//   const previews = await generatePreviewImages(cart);

//   // Convertir blob --> { filename, dataUrl }
//   const processed = await Promise.all(
//     previews.map(async (img) => ({
//       filename: img.filename,
//       dataUrl: await blobToDataURL(img.blob)
//     }))
//   );

//   return processed;
// };

export const uploadToCloudinary = async (base64Data) => {
  const CLOUD_NAME = "dvpih7hxa";
  const UPLOAD_PRESET = "ml_default";

  const formData = new FormData();
  formData.append("file", base64Data);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  return data.secure_url; // Esta es la URL pública
};

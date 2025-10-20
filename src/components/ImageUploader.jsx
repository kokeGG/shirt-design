import { Upload } from 'lucide-react';

export default function ImageUploader({ onImageUpload, side }) {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event.target.result);
      };
      reader.readAsDataURL(file);
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
    </div>
  );
}
import React, { useState } from "react";
import ColorSelector from "./components/ColorSelector";
import ImageUploader from "./components/ImageUploader";
import SizeControl from "./components/SizeControl";
import PositionControl from "./components/PositionControl";
import TShirtPreview from "./components/TShirtPreview";
import ResetButton from "./components/ResetButton";

export default function App() {
  const [shirtColor, setShirtColor] = useState("white");
  const [currentSide, setCurrentSide] = useState("front"); // 'front' o 'back'

  // Estados para el frente
  const [frontImage, setFrontImage] = useState(null);
  const [frontSize, setFrontSize] = useState(150);
  const [frontPosition, setFrontPosition] = useState({ x: 50, y: 40 });

  // Estados para atrás
  const [backImage, setBackImage] = useState(null);
  const [backSize, setBackSize] = useState(150);
  const [backPosition, setBackPosition] = useState({ x: 50, y: 40 });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Obtener estados del lado actual
  const currentImage = currentSide === "front" ? frontImage : backImage;
  const currentSize = currentSide === "front" ? frontSize : backSize;
  const currentPosition =
    currentSide === "front" ? frontPosition : backPosition;

  // Funciones para actualizar el lado actual
  const setCurrentImage = (img) => {
    if (currentSide === "front") {
      setFrontImage(img);
    } else {
      setBackImage(img);
    }
  };

  const setCurrentSize = (size) => {
    if (currentSide === "front") {
      setFrontSize(size);
    } else {
      setBackSize(size);
    }
  };

  const setCurrentPosition = (pos) => {
    if (currentSide === "front") {
      setFrontPosition(pos);
    } else {
      setBackPosition(pos);
    }
  };

  const handleRotate = () => {
    setCurrentSide(currentSide === "front" ? "back" : "front");
  };

  const handleReset = () => {
    if (currentSide === "front") {
      setFrontImage(null);
      setFrontSize(150);
      setFrontPosition({ x: 50, y: 40 });
    } else {
      setBackImage(null);
      setBackSize(150);
      setBackPosition({ x: 50, y: 40 });
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - currentPosition.x,
      y: e.clientY - currentPosition.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(100, (e.clientX - dragStart.x) / 3));
      const newY = Math.max(0, Math.min(100, (e.clientY - dragStart.y) / 4));
      setCurrentPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          🎨 Canelito Design 😺
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Sube tu diseño y visualízalo en tiempo real - ¡Frente y Atrás!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Panel de Controles */}
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
            <ColorSelector
              shirtColor={shirtColor}
              setShirtColor={setShirtColor}
            />

            <ImageUploader onImageUpload={setCurrentImage} side={currentSide} />

            {currentImage && (
              <>
                <SizeControl
                  imageSize={currentSize}
                  setImageSize={setCurrentSize}
                />

                <PositionControl
                  imagePosition={currentPosition}
                  setImagePosition={setCurrentPosition}
                />

                <ResetButton onReset={handleReset} currentSide={currentSide} />
              </>
            )}

            {/* Resumen de diseños */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Estado de diseños:
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      frontImage ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></span>
                  <span className="text-gray-600">
                    Frente: {frontImage ? "✓ Diseño agregado" : "Sin diseño"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      backImage ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></span>
                  <span className="text-gray-600">
                    Atrás: {backImage ? "✓ Diseño agregado" : "Sin diseño"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Vista Previa */}
          <TShirtPreview
            shirtColor={shirtColor}
            uploadedImage={currentImage}
            imageSize={currentSize}
            imagePosition={currentPosition}
            isDragging={isDragging}
            onMouseDown={handleMouseDown}
            currentSide={currentSide}
            onRotate={handleRotate}
          />
        </div>
      </div>
    </div>
  );
}

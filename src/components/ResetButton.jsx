import { RotateCcw } from 'lucide-react';

export default function ResetButton({ onReset, currentSide }) {
  return (
    <button
      onClick={onReset}
      className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors"
    >
      <RotateCcw className="w-5 h-5" />
      Reiniciar {currentSide === 'front' ? 'Frente' : 'Atrás'}
    </button>
  );
}
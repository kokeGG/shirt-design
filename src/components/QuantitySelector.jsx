export default function QuantitySelector({ quantity, setQuantity }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700">Cantidad:</label>
      <div className="flex items-center gap-3 mt-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-3 py-1 border rounded-lg bg-white text-gray-600"
        >-</button>

        <span className="text-lg font-semibold">{quantity}</span>

        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-3 py-1 border rounded-lg bg-white text-gray-600"
        >+</button>
      </div>
    </div>
  );
}

export default function SizeSelector({ size, setSize }) {
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div>
      <label className="text-sm font-semibold text-gray-700">Talla:</label>
      <div className="flex gap-2 flex-wrap mt-2">
        {sizes.map(s => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`px-3 py-1 rounded-lg border 
            ${s === size ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300'}`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

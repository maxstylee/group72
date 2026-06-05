function DeviceCard({ device }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 text-left shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
      <div>
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-slate-800 text-base">
            💻 {device.name}
          </h4>
          <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-md">
            {device.category}
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          <span className="font-semibold text-slate-600">ბრენდი:</span>{" "}
          {device.brand}
        </p>
      </div>

      <div className="mt-4 pt-2 border-t border-slate-50 flex justify-between items-center">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            ფასი
          </span>
          <span className="text-emerald-600 font-black text-sm">
            {device.price} ლარი
          </span>
        </div>
        <span
          className={`text-xs font-bold px-2 py-1 rounded-md ${
            device.stock > 0
              ? "bg-slate-100 text-slate-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {device.stock > 0 ? `📦 მარაგშია: ${device.stock}` : "❌ ამოიწურა"}
        </span>
      </div>
    </div>
  );
}

export default DeviceCard;

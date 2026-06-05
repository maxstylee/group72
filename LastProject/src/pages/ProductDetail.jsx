import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const productsData = useSelector((state) => state.devices.list);
  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="text-center p-6">
        <h3 className="text-xl font-bold text-red-500">პროდუქტი ვერ მოიძებნა!</h3>
        <Link to="/products" className="text-blue-500 hover:underline mt-4 inline-block">🔙 პროდუქტებზე დაბრუნება</Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border-2 border-black max-w-md mx-auto text-center my-6 shadow-md">
      <h2 className="text-2xl font-black text-slate-800 mb-2">{product.name}</h2>
      <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-sm">{product.price} ლარი</span>
      <p className="text-slate-600 mt-4 text-sm leading-relaxed">{product.desc}</p>
      
      <div className="mt-6 pt-4 border-t border-slate-100 flex justify-center gap-2">
        <Link to="/products" className="text-xs bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium">🔙 უკან</Link>
        <button 
          onClick={() => dispatch(addItem(product))}
          className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          კალათაში დამატება ➕
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
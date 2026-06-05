import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteDevice } from "../store/deviceSlice"; 

function Products() {
  const productsList = useSelector((state) => state.devices.list);
  const dispatch = useDispatch();

  return (
    <div className="p-6 text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">ჩვენი პროდუქტები</h2>
      
      {productsList.length === 0 ? (
        <p className="text-slate-500 font-medium py-4">მაღაზიაში პროდუქტები არ არის 🛒</p>
      ) : (
        <div className="space-y-3">
          {productsList.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
              <div className="text-left">
                <span className="font-medium text-slate-700 block">{product.name}</span>
                <span className="text-xs text-slate-400">{product.category} - {product.price} ლარი</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Link to={`/product/${product.id}`} className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-medium transition">
                  ნახვა 👁️
                </Link>
                
                <button 
                  onClick={() => dispatch(deleteDevice(product.id))}
                  className="text-xs bg-red-100 text-red-600 hover:bg-red-600 hover:text-white p-1.5 rounded-md transition"
                  title="მაღაზიიდან წაშლა"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
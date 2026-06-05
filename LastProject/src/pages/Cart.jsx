import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../store/cartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-bold text-slate-700 mb-4">
          🛒 თქვენი კალათა ცარიელია
        </h2>
        <Link
          to="/products"
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          პროდუქტები
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">ჩემი კალათა</h2>

        <button
          onClick={() => dispatch(clearCart())}
          className="text-xs bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-md font-medium transition"
        >
          კალათის გასუფთავება 🧹
        </button>
      </div>

      <div className="space-y-3">
        {cartItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm"
          >
            <div className="text-left">
              <span className="font-medium text-slate-700 block">
                {item.name}
              </span>
              <span className="text-xs text-blue-600 font-bold">
                {item.price} ლარი
              </span>
            </div>

            <button
              onClick={() => dispatch(removeItem(item.id))}
              className="text-xs bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 px-2 py-1 rounded transition"
            >
              ➖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;

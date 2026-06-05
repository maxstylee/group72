import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-400 font-bold border-b-2 border-blue-400 pb-1"
      : "hover:text-blue-400 transition";

  return (
    <nav className="flex items-center gap-6">
      <ul className="flex gap-6 text-sm font-medium">
        <li>
          <NavLink to="/" className={linkStyle}>
            მთავარი
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={linkStyle}>
            პროდუქტები
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className={linkStyle}>
            რეგისტრაცია
          </NavLink>
        </li>{" "}
        <li>
          <NavLink to="/contact" className={linkStyle}>
            კონტაქტი
          </NavLink>
        </li>
      </ul>
      <Link
        to="/cart"
        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded-full transition"
      >
        🛒 კალათა ({cartItems.length})
      </Link>
    </nav>
  );
}

export default Navbar;

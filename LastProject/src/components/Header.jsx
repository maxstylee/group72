import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "./Navbar";
function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wider">ჩემი პროექტი</h1>
        <Navbar />
        <div className="flex items-center gap-4">
          <span className="text-sm bg-slate-700 px-3 py-1 rounded-full border border-slate-600">
            {user.isLoggedIn ? `👤 ${user.name} (${user.role})` : "🔴 Offline"}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;

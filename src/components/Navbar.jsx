import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaBars } from "react-icons/fa";

export default function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <button onClick={toggleSidebar} className="text-gray-700 md:hidden">
            <FaBars size={20} />
          </button>
          <img src={logo} alt="Logo" className="h-9 w-auto" />
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Sign In / Sign Up
        </button>
      </div>
    </header>
  );
}

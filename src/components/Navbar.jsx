import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Sidebar toggle button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none mr-2"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="STEMTRIBE Africa" className="h-10 w-auto" />
            <span className="font-bold text-xl text-gray-800">STEMTRIBE Africa</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Sign In / Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

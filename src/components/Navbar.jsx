import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="STEMTRIBE Africa" className="h-10 w-auto" />
            <span className="ml-2 font-bold text-xl text-gray-800">STEMTRIBE Africa</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <li>
              <Link to="/about" className="hover:text-blue-600 transition duration-300">About</Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-blue-600 transition duration-300">Blog</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600 transition duration-300">Contact</Link>
            </li>
          </ul>

          {/* Sign In / Sign Up Button */}
          <button
            onClick={() => navigate("/login")}
            className="hidden md:inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Sign In / Sign Up
          </button>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-3 p-4 text-gray-700 font-medium">
            <li>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-blue-600 transition duration-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-blue-600 transition duration-300">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-blue-600 transition duration-300">
                Contact
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Sign In / Sign Up
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

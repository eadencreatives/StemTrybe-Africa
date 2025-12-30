import { Link } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`bg-white shadow-md w-64 space-y-6 py-7 px-4 absolute inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
    >
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="text-gray-700 font-medium hover:text-blue-600">
          Dashboard
        </Link>
        <Link to="/courses" className="text-gray-700 font-medium hover:text-blue-600">
          Courses
        </Link>
        <Link to="/about" className="text-gray-700 font-medium hover:text-blue-600">
          About
        </Link>
        <Link to="/blog" className="text-gray-700 font-medium hover:text-blue-600">
          Blog
        </Link>
        <Link to="/contact" className="text-gray-700 font-medium hover:text-blue-600">
          Contact
        </Link>
      </nav>
    </aside>
  );
}

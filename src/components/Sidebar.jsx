import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBookOpen, FaUsers } from "react-icons/fa";

export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`bg-white shadow-lg w-64 space-y-6 py-7 px-4 absolute inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <nav className="flex flex-col space-y-4">
        <Link to="/dashboard" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-semibold">
          <FaTachometerAlt /> Dashboard
        </Link>
        <Link to="/courses" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-semibold">
          <FaBookOpen /> Courses
        </Link>
        <Link to="/community" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-semibold">
          <FaUsers /> Community
        </Link>
      </nav>
    </aside>
  );
}

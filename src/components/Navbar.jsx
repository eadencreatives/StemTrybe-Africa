import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="STEMTRIBE Africa" />
      </Link>

      <ul className="nav-links">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <button className="btn-primary" onClick={() => navigate("/login")}> 
        Sign In / Sign Up
      </button>
    </nav>
  );
}

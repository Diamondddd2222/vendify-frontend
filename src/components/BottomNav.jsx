import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineMessage } from "react-icons/ai";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import "./BottomNav.css";

export default function BottomNav() {
  return (
    <div className="bottom-nav">
      <Link to="/" className="nav-item">
        <AiFillHome className="icon-footer" />
        <span>Home</span>
      </Link>

      <Link to="/cart" className="nav-item">
        <FaShoppingCart className="icon-footer" />
        <span>Cart</span>
      </Link>

      <Link to="/messages" className="nav-item">
        <AiOutlineMessage className="icon-footer" />
        <span>Messages</span>
      </Link>

      <Link to="/dashboard" className="nav-item">
        <FaUser className="icon-footer" />
        <span>Account</span>
      </Link>
    </div>
  );
}

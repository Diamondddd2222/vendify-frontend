import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineMessage } from "react-icons/ai";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./BottomNav.css";

export default function BottomNav() {
  const navigate = useNavigate();
  const handleNavClick = (path) => {
    navigate(path);
  };
  return (
    <div className="bottom-nav">
      <Link to="/" className="nav-item" onClick={ () => handleNavClick("/") }>
        <AiFillHome className="icon-footer" />
        <span>Home</span>
      </Link>

      <Link to="/cart" className="nav-item" >
        <FaShoppingCart className="icon-footer" />
        <span>Vendors</span>
      </Link>

       <Link to="/messages" className="nav-item" > 
        <AiOutlineMessage className="icon-footer" />
        <span>Messages</span>
      </Link>

      <Link to="/dashboard" className="nav-item" onClick={ () => handleNavClick("/dashboard") }>
        <FaUser className="icon-footer" />
        <span>Account</span>
      </Link>
    </div>
  );
}

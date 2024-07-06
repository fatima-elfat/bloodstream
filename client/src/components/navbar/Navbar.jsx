import { useState } from "react";
import Logo from "../../assets/asset00.png"
import Menu from "../../assets/asset01.png"
import Pdp from "../../assets/asset06.png"
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src={ Logo} alt="" />
          <span>BloodStream</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/list">Donations</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || Pdp} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="regiter">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src={ Menu}
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Blood Banks</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

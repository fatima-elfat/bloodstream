import { useState } from "react";
import Logo from "../../assets/asset00.png"
import Menu from "../../assets/asset01.png"
import Pdp from "../../assets/asset06.png"
import "./navbar.scss";
import { Link } from "react-router-dom";


function Navbar() {
  const [open, setOpen] = useState(false);

  const user = true;
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
        {user ? (
          <div className="user">
            <img
              src={ Pdp}
              alt=""
            />
            <span>John Doe</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/">Sign in</a>
            <a href="/" className="register">
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

import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { Link } from "react-router-dom";
import BG from "../../assets/asset09.png"


function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Donate Blood and Flow with Purpose</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            explicabo suscipit cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!
          </p>
          
          <Link to="/donations" className="list">
          <span>Start Now</span>
          </Link>
          <div className="boxes">
            <div className="box">
              <h1>1000+</h1>
              <h2>Donors</h2>
            </div>
            <div className="box">
              <h1>50+</h1>
              <h2>Blood Banks</h2>
            </div>
            <div className="box">
              <h1>20+</h1>
              <h2>Cities</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src={ BG } alt="" />
      </div>
    </div>
  );
}

export default HomePage;

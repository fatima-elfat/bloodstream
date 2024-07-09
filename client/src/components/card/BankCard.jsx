import { Link } from "react-router-dom";
import "./card.scss";
import  People from "../../assets/asset02.png";
import  Pin from "../../assets/asset03.png";
import  Donate from "../../assets/asset04.png";
import  Share from "../../assets/asset05.png";


function Card({ item }) {
  return (
    <div className="card">
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/banks/${item.id}`}>{item.name}</Link>
        </h2>
        <p className="address">
          <img src={ Pin } alt="" />
          <span>{item.description}</span>
        </p>
        <div className="bottom">
        <div className="icons">
            <div className="icon">
            <Link to={`/${item.id}`}><img src={ Donate } alt="Take an appointment for donation" /></Link>
            </div>
            <div className="icon">
              <img src={ Share } alt="Share with friend and family" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

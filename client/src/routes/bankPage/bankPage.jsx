import "./bankPage.scss";
import Map from "../../components/map/Map";
import  People from "../../assets/asset02.png";
import  Donate from "../../assets/asset04.png";
import  Share from "../../assets/asset05.png";
import apiRequest from "../../lib/apiRequest";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BankPage() {
  const { id } = useParams();
  useEffect(() => {
    getBank();
  }, []);
  const [bank, setBank] = useState([]);
  const [isLoaded, setIsLoaded] = useState(null);
  const getBank = () => {
    apiRequest
      .get(`/banks/bank/${id}`)
      .then((res) => {
        setBank(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      setIsLoaded(true);
  };
  return (
    <div className="singlePage">
      <div className="details">
          
        <div className="wrapper">
          <div className="info">
            <div className="top">
              <div className="post">
              <div className="buttons">
                <button>
                  <img src={ Share } alt="" />
                  Share
                  </button>
              </div>
                <h1>{bank.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{bank.name}</span>

                </div>
                
              <p className="type">Code :{bank.id}</p>
            </div>
              
            </div>
            <div className="bottom">{bank.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          
          <p className="title">Location</p>
              <div className="mapContainer">
                <Map items={[]}/>
              </div>
            <p className="title">Book an appointment</p>
            <div className="feature">
            <div className="info" for="fname">Appointment Date: </div>
              <input id="fname" name="firstname" type="date"/>
            </div>
          <div className="buttons">
            <button>
              <img src={ Donate } alt="" />
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BankPage;

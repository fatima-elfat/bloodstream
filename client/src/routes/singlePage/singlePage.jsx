import "./singlePage.scss";
import Map from "../../components/map/Map";
import  People from "../../assets/asset02.png";
import  Donate from "../../assets/asset04.png";
import  Share from "../../assets/asset05.png";
import apiRequest from "../../lib/apiRequest";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SinglePage() {
  const { id } = useParams();
  useEffect(() => {
    getDonation();
  }, []);
  const [donation, setDonation] = useState([]);
  const [bank, setBank] = useState([]);
  const [isLoaded, setIsLoaded] = useState(null);
  const getDonation = () => {
    apiRequest
      .get(`/donations/donation/${id}`)
      .then((res) => {
        setDonation(res.data);
        setBank(res.data.tech.bank);
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
                <h1>{donation.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{bank.name}</span>

                </div>
                <div className="donation">
                <div className="detail">
                  <span>Level {donation.level}</span>
                </div>
                <div className="detail"> Blood Type: {donation.bloodGroup}</div>
              <div className="detail">
                <img src={ People } alt="" />
                <span>{donation.neededDonors} donor needed</span>
              </div>
              </div>
              <p className="type">Code :{donation.id}</p>
            </div>
              
            </div>
            <div className="bottom">{donation.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          
          <p className="title">Location</p>
              <div className="mapContainer">
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

export default SinglePage;

import "./singlePage.scss";
import Map from "../../components/map/Map";
import  People from "../../assets/asset02.png";
import  Donate from "../../assets/asset04.png";
import  Share from "../../assets/asset05.png";
import { singlePostData, userData } from "../../lib/dummydata";

function SinglePage() {
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
                <h1>{singlePostData.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{singlePostData.address}</span>
                </div>
                <div className="donation">
                <div className="detail">
                  <span>Level {singlePostData.level}</span>
                </div>
                <div className="detail"> Blood Type: {singlePostData.type}</div>
              <div className="detail">
                <img src={ People } alt="" />
                <span>{singlePostData.nbr} donor needed</span>
              </div>
              </div>
              <p className="type">Code :{singlePostData.id}</p>
              
            </div>
              
            </div>
            <div className="bottom">{singlePostData.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          
          <p className="title">Location</p>
              <div className="mapContainer">
              <Map items={[singlePostData]} />
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

import "./profilePage.scss";
import Pdp from "../../assets/asset06.png"

function ProfilePage() {
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={ Pdp }
                alt=""
              />
            </span>
            <span>
              Username: <b>John Doe</b>
            </span>
            <span>
              E-mail: <b>john@gmail.com</b>
            </span>
          </div>
          <div className="title">
            <button>Become donor</button>
          </div>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

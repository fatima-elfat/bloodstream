import "./profilePage.scss";
import Pdp from "../../assets/asset06.png"
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import apiRequest from "../../lib/apiRequest";

function ProfilePage() {

  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
            <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar ||  Pdp } alt="" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <span>
            Mobile number: <b>{currentUser.mobileNumber ||  "not available"}</b>
            </span>
            <span>
            Date of birth: <b>{currentUser.dateOfBirth ||  "not available"}</b>
            </span>
            <span>
            City: <b>{currentUser.city ||  "not available"}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
            
          </div>
          <div className="title">
          {currentUser.isDonnor ? (
            <button>Donation Details</button>
          ) : (
            
            <button>Become donor</button>
          )}
          {currentUser.isTech ? (
            <>
            
            <button>Manage Donors</button>
            <button>Manage Donations</button>
            </>
          ) : (<></>)}
          {currentUser.isAdmin ? (
            <>
            <button>Manage Users</button>
            </>
          ) : (<></>)}
          </div>
        </div>
      </div>
      <div className="becomeDonorContainer">
        <div className="wrapper">
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

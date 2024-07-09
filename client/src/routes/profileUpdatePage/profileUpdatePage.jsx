import "./profileUpdatePage.scss";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthProvider";


function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username,
      email, 
      mobileNumber,
      dateOfBirth,
      city 
    } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        mobileNumber,
        dateOfBirth,
        city
      });
      console.log(res);
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="mobileNumber">Mobile number</label>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="mobileNumber"
              defaultValue={currentUser.mobileNumber}
            />
          </div>
          
          <div className="item">
            <label htmlFor="dateOfBirth">Date of birth</label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              defaultValue={currentUser.dateOfBirth}
            />
          </div>
          <div className="item">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              defaultValue={currentUser.city}
            />
          </div>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src="" alt="" className="avatar" />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;

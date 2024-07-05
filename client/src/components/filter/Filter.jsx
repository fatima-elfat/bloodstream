import "./filter.scss";
import Search from "../../assets/asset07.png"

function Filter() {
  return (
    <div className="filter">
      <h1>
        Search results for <b>Donation requests</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type">
            <option value="">any</option>
            <option value="buy">A+</option>
            <option value="rent">B+</option>
            <option value="buy">AB+</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="Level">Level </label>
          <select name="Level" id="level">
            <option value="">any</option>
            <option value="High">High</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </div>
        <button>
          <img src={ Search } alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;

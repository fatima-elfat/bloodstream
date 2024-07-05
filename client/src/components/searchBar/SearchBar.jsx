import { useState } from "react";
import "./searchBar.scss";
import SB from "../../assets/asset07.png"

const types = ["donation request", "blood bank"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        <input type="text" name="location" placeholder="City Location" />
        <input type="text" name="bloodType" placeholder="Blood type" />
        <button>
          <img src= { SB } alt="" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";

function Pin({ item }) {
  console.log(item)
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.name}</Link>
            <span> {item.description}</span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;

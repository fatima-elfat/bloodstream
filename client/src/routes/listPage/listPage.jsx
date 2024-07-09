import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/Map";
import apiRequest from "../../lib/apiRequest";
import { useEffect, useState } from "react";

function ListPage() {
  useEffect(() => {
    getDonations();
  }, []);
  const [donation, setDonation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const getDonations = () => {
    apiRequest
      .get(`/donations`)
      .then((res) => {
        setDonation(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <div className="listPage">
    <div className="listContainer">
      <div className="wrapper">
        <Filter item={"Calls for blood donations"}/>
        {donation.map(item=>(
          <Card key={item.id} item={item}/>
        ))}
      </div>
    </div>
    <div className="mapContainer">
    <Map items={donation.map(item=>
          item=item.tech.bank
        )}/>
    </div>
  </div>;
}

export default ListPage;

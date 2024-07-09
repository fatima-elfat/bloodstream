
import "./banksPage.scss";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/BankCard"
import Map from "../../components/map/Map";
import apiRequest from "../../lib/apiRequest";
import { useEffect, useState } from "react";

function BanksPage() {
  useEffect(() => {
    getBanks();
  }, []);
  const [bank, setBank] = useState([]);
  const getBanks = () => {
    apiRequest
      .get(`/banks`)
      .then((res) => {
        setBank(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <div className="listPage">
    <div className="listContainer">
      <div className="wrapper">
        <Filter item={ "List of Blood Banks"}/>
        {bank.map(item=>(
          <Card key={item.id} item={item}/>
        ))}
      </div>
    </div>
    <div className="mapContainer">
    <Map items={bank}/>
    </div>
  </div>;
}

export default BanksPage;

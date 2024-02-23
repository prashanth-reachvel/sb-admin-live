import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./KeyProgressIndex.css";
import axios from "axios";

const KeyProgressIndex = () => {
  const { schoolName } = useParams();
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get(
          `http://localadminapi.sevabharath.com/api/inventory/${schoolName}`
        );
        console.log(response.data);
        setInventoryData(response.data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchInventoryData();
  }, [schoolName]);

  // Calculate the container height based on the number of rows
  const containerHeight =
    Math.ceil(inventoryData.length / 3) *
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--card-height"
        ),
        10
      ) +
    20;

  return (
    <div
      className="inventory-box"
      style={{
        height: inventoryData.length === 0 ? "200px" : `${containerHeight}px`,
      }}
    >
      <div className="inventory-top-row">
        <h3 className="inventory-heading">{schoolName}</h3>
        <div className="school-btn-group">
          <Link to={`/school-profile/${schoolName}`}>
            <button className="view-school-btn">view school details</button>
          </Link>
          <Link to={`/add-inventory/${schoolName}`}>
            <button className="inventory-btn">Add Inventory</button>
          </Link>
        </div>
      </div>
      <div className="membership-cards">
        {inventoryData.length === 0 ? (
          <p style={{ margin: "0 auto", paddingTop: "20px" }}>
            No KPIs found...
          </p>
        ) : (
          inventoryData
            .reduce((acc, item, index) => {
              const existingIndex = acc.findIndex(
                (card) => card.title === item.title
              );
              if (existingIndex !== -1) {
                acc[existingIndex] = {
                  ...acc[existingIndex],
                  distributed: item.distributed,
                  available: item.available,
                  totalAddQuantity: item.totalAddQuantity,
                };
              } else {
                acc.push(item);
              }
              return acc;
            }, [])
            .map((item, index) => (
              <div className="member-green-card" key={index}>
                <p className="menber-plan-head">{item.title}</p>
                <div className="white-inner-box">
                  <p className="school-green-text">
                    Distributed : {item.distributed}
                  </p>
                  <p className="school-green-text">
                    Available : {item.available}
                  </p>
                  <p className="school-green-text">
                    Total : {item.totalAddQuantity}
                  </p>
                </div>
                <Link to={`/update-inventory/${schoolName}/${item.title}`}>
                  <button className="add-menber-btn">edit</button>
                </Link>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default KeyProgressIndex;

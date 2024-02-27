import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./KeyProgressIndex.css";
import axios from "axios";

const KeyProgressIndex = () => {
  const { schoolName } = useParams();
  const [inventoryData, setInventoryData] = useState([]);
  const [editShipmentDate, setEditShipmentDate] = useState("");
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get(
          `https://localadminapi.sevabharath.com/api/inventory/${schoolName}`
        );
        console.log(response.data);
        setInventoryData(response.data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchInventoryData();
  }, [schoolName]);

  const handleShipmentEdit = () => {
    setEditShipmentDate(true);
  };

  const handleShipmentDateChange = async (e, title) => {
    if (e.key === "Enter") {
      const newShipmentDate = e.target.value;
      try {
        await axios.put(
          `https://localadminapi.sevabharath.com/api/nextshipment/${encodeURIComponent(
            schoolName
          )}/${encodeURIComponent(title)}`,
          {
            newShipmentDate: newShipmentDate,
            title: title,
          }
        );
        setInventoryData((prevData) => ({
          ...prevData,
          shipmentDate: newShipmentDate,
        }));
        setEditShipmentDate(false);
        alert("Shipment Date updated successfully");
      } catch (error) {
        console.error("Error updating Shipment Date:", error);
      }
    }
  };

  // const handleNextShipmentChange = async (title, schoolName) => {
  //   try {
  //     await axios.post(
  //       `http://localhost:3001/api/nextshipment/${encodeURIComponent(
  //         schoolName
  //       )}/${encodeURIComponent(title)}`,
  //       { nextShipmentDate: nextShipmentDate }
  //     );
  //     console.log("Next shipment date updated successfully");
  //     // Optionally, you can update the local state or fetch the data again to reflect the change
  //   } catch (error) {
  //     console.error("Error updating next shipment date:", error);
  //   }
  // };

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
        <div className="inventory-heading-date-container">
          <h3 className="inventory-heading">{schoolName}</h3>
          <p className="current-date">{currentDate}</p>
        </div>
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
                // Check if the new item has a more recent updatedDate
                if (
                  new Date(item.updatedDate) >
                  new Date(acc[existingIndex].updatedDate)
                ) {
                  acc[existingIndex] = {
                    ...acc[existingIndex],
                    distributed: item.distributed,
                    available: item.available,
                    totalAddQuantity: item.totalAddQuantity,
                    updatedDate: item.updatedDate, // Update the updatedDate
                  };
                }
              } else {
                acc.push(item);
              }
              return acc;
            }, [])
            .map((item, index) => (
              <div className="member-green-card" key={index}>
                <p className="last-updated">Last Updated: {item.updatedDate}</p>
                <p className="menber-plan-head">{item.title}</p>
                <div className="white-inner-box">
                  <p className="school-green-text">
                    Distributed : {item.distributed}
                  </p>
                  <p className="school-green-text">
                    Available : {item.available}
                  </p>
                  <p className="school-green-text">
                    Total Shipped : {item.totalAddQuantity}
                  </p>
                </div>
                <Link to={`/update-inventory/${schoolName}/${item.title}`}>
                  <button className="add-menber-btn">edit</button>
                </Link>
                <div className="next-shipment-container">
                  <label htmlFor="next-shipment">Next Shipment: </label>
                  <input
                    type="date"
                    className="next-shipment-date"
                    contentEditable={editShipmentDate}
                    onKeyPress={(e) => handleShipmentDateChange(e, item.title)}
                    onBlur={() => setEditShipmentDate}
                    value={item.shipmentDate}
                  />
                  {!editShipmentDate && (
                    <button className="edit-btn" onClick={handleShipmentEdit}>
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default KeyProgressIndex;

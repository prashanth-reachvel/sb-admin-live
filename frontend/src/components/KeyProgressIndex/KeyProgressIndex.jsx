import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./KeyProgressIndex.css";
import axios from "axios";

const KeyProgressIndex = () => {
  const { schoolName } = useParams();
  const [inventoryData, setInventoryData] = useState([]);
  const [editShipmentDate, setEditShipmentDate] = useState(false);
  const currentDate = new Date().toLocaleDateString();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get(
          `https://localadminapi.sevabharath.com/api/inventory/${schoolName}`
        );
        console.log(response.data);
        const uniqueTitles = Array.from(
          new Set(response.data.map((item) => item.title))
        );
        const uniqueInventoryData = uniqueTitles.map((title) => {
          const latestItem = response.data
            .filter((item) => item.title === title)
            .sort((a, b) => {
              const dateA = new Date(a.updatedDate || a.createdDate);
              const dateB = new Date(b.updatedDate || b.createdDate);
              return dateB - dateA;
            })[0];
          return latestItem;
        });
        setInventoryData(uniqueInventoryData);
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
        setInventoryData((prevData) =>
          prevData.map((item) =>
            item.title === title
              ? { ...item, shipmentDate: newShipmentDate }
              : item
          )
        );
        setEditShipmentDate(false);
        alert("Shipment Date updated successfully");
      } catch (error) {
        console.error("Error updating Shipment Date:", error);
      }
    }
  };

  return (
    <div className="inventory-box">
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
          inventoryData.map((item, index) => (
            <div className="member-green-card" key={index}>
              <p className="last-updated">
                Last Updated: {formatDate(item.updatedDate || item.createdDate)}
              </p>
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
                <label htmlFor="next-shipment" style={{ fontSize: "12px" }}>
                  Next Shipment:{" "}
                </label>
                <input
                  type="date"
                  className="next-shipment-date"
                  contentEditable={editShipmentDate}
                  onKeyPress={(e) => handleShipmentDateChange(e, item.title)}
                  onBlur={() => setEditShipmentDate(false)}
                  value={item.shipmentDate}
                />
                {!editShipmentDate && (
                  <button
                    className="edit-btn"
                    style={{ fontSize: "12px" }}
                    onClick={handleShipmentEdit}
                  >
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

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UpdateInventory.css";
import RecentUpdates from "../RecentUpdates/RecentUpdates";
import axios from "axios";

const UpdateInventory = () => {
  const { schoolName, title } = useParams();
  const [createdDate, setCreatedDate] = useState("");
  const [totalAddQuantity, setTotalAddQuantity] = useState(0);
  const [newTotalQuantity, setNewTotalQuantity] = useState(0);
  const [totalBoxes, setTotalBoxes] = useState(0);
  const [available, setAvailable] = useState(0);
  const [newDistributed, setNewDistributed] = useState(0);
  const [newTotalBoxes, setNewTotalBoxes] = useState(0);
  const school = schoolName;
  const SB = "Updated by SB";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedTitle = encodeURIComponent(title);
        const response = await axios.get(
          `https://localadminapi.sevabharath.com/api/inventory/${school}/${encodedTitle}`
        );
        const {
          createdDate,
          totalAddQuantity,
          totalBoxes,
          available,
          distributed,
        } = response.data[0];
        console.log(response.data[0]);
        setTotalAddQuantity(parseInt(totalAddQuantity));
        setNewDistributed(parseInt(distributed));
        setAvailable(parseInt(available));
        setTotalBoxes(parseInt(totalBoxes));
        setCreatedDate(createdDate); // Set the createdDate from the response
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchData();
  }, [schoolName, title]);

  const handleUpdateInventory = async (e) => {
    e.preventDefault();

    try {
      const newTotal = totalAddQuantity + newTotalQuantity; // Calculate the new total
      const newAvailable = available + newTotalQuantity;
      const newBoxes = totalBoxes + newTotalBoxes;

      // Get the current date and format it as YYYY-MM-DD
      const currentDate = new Date().toISOString().split("T")[0];

      await axios.post(
        `https://localadminapi.sevabharath.com/api/updateinventory/${school}/${title}`,
        {
          school,
          title,
          updatedDate: currentDate, // Use the current date as updatedDate
          createdDate, // Use the createdDate from the state
          newTotalQuantity,
          totalAddQuantity: newTotal, // Use the new total here
          available: newAvailable,
          distributed: newDistributed,
          totalBoxes: newBoxes,
          reason: SB,
        }
      );
      console.log("Data Updated Successfully");

      // Update the inventory in addinventory API
      await axios.post("https://localadminapi.sevabharath.com/api/addinventory", {
        school,
        title,
        updatedDate: currentDate,
        createdDate: createdDate, // Use the createdDate from the state
        totalAddQuantity: newTotal, // Use the new total here
        available: newAvailable,
        distributed: newDistributed,
        totalBoxes: newBoxes,
        reason: SB,
      });
      console.log("Data Updated in addinventory API");

      setTotalAddQuantity(newTotal); // Update totalAddQuantity with the new total
      setTotalBoxes(newBoxes);
      setNewTotalQuantity(0); // Reset newTotalQuantity
      setNewTotalBoxes(0); // Reset newTotalBoxes
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error updating inventory data:", error);
    }
  };

  return (
    <div>
      <div className="inventory-box">
        <h3 className="update-inventory-inventory-heading">
          Updating Inventory
        </h3>
        <form onSubmit={handleUpdateInventory}>
          <div className="form-group-1">
            <label htmlFor="schoolName" className=" col-form-label-1">
              School :
            </label>
            <input
              type="text"
              id="schoolName"
              name="name"
              className="form-control"
              placeholder="Enter school name"
              value={schoolName}
              readOnly
            />
          </div>
          <div className="form-group-1">
            <label htmlFor="title" className=" col-form-label-1">
              Title :
            </label>
            <input
              type="text"
              id="title-inventory-school title"
              name="name"
              className="form-control"
              placeholder="Please enter title"
              value={title}
              readOnly
            />
          </div>
          <div className="small-inputs">
            <div className="form-group-1">
              <label htmlFor="date" className=" col-form-label-1">
                Date :
              </label>
              <input
                type="date"
                id="date-inventory-school date"
                name="name"
                className="form-control-1"
                placeholder="Please enter date"
                onChange={(e) => setCreatedDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group-1">
              <label htmlFor="total-quantity" className=" col-form-label-2">
                Total Quantity :
                <span className="small-label-text">(bottles)</span>
              </label>
              <input
                type="number"
                id="quant-inventory-school total-quantity"
                name="number"
                className="form-control-1"
                placeholder={`Available Qty: ${available}`}
                onChange={(e) => setNewTotalQuantity(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="form-group-1">
              <label htmlFor="total-quantity" className=" col-form-label-2">
                Total Boxes :
                <span className="small-label-text">
                  (each box contains 25 bottles)
                </span>
              </label>
              <input
                type="number"
                id="quant-inventory-school total-quantity"
                name="number"
                className="form-control-1"
                placeholder="Enter the boxes"
                onChange={(e) => setNewTotalBoxes(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="add-org-btn">
            <button className="inventory-viewall-btn" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
      <RecentUpdates />
    </div>
  );
};

export default UpdateInventory;

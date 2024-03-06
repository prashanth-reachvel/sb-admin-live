import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./AddNewInventory.css";
import axios from "axios";

const AddNewInventory = () => {
  const { schoolName } = useParams();
  const [title, setTitle] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [totalAddQuantity, setTotalAddQuantity] = useState(0);
  const [totalBoxes, setTotalBoxes] = useState(0);
  const SB = "Updated by SB";

  // const handleAddInventory = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "http://localadminapi.sevabharath.com/api/addinventory",
  //       {
  //         school: schoolName,
  //         title,
  //         createdDate,
  //         updatedDate: "",
  //         totalQuantity,
  //         available: 0,
  //         distributed: 0,
  //         reason: SB,
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error Adding Inventory");
  //   }
  // };

  const handleAddInventory = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/addinventory",
        {
          school: schoolName,
          title: title.trim(),
          createdDate,
          totalAddQuantity,
          available: totalAddQuantity,
          distributed: 0,
          totalBoxes,
          reason: SB,
        }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error Adding Inventory");
    }
  };

  return (
    <div className="main-container">
      <div className="container">
        <h2 className="add-title">Add Inventory</h2>
        <form onSubmit={handleAddInventory}>
          <div className="add-inventory-school-label">
            <label>School: </label>
            <input
              type="text"
              className="school-input"
              value={schoolName}
              readOnly
            />
          </div>
          <div className="add-inventory-title">
            <label>Title:</label>
            <input
              type="text"
              className="title-input"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="date-quantity-container">
            <div className="date-container">
              <label>Date:</label>
              <input
                type="date"
                className="date-input"
                onChange={(e) => setCreatedDate(e.target.value)}
              />
            </div>
            <div className="tot-quantity">
              <label className="label-container">
                Total Quantity:
                <span className="small-label-text">(bottles)</span>
              </label>
              <input
                type="number"
                className="quantity-input"
                placeholder="Enter quantity"
                onChange={(e) => setTotalAddQuantity(e.target.value)}
              />
            </div>
            <div className="tot-quantity">
              <label className="label-container">
                Total Boxes:
                <span className="small-label-text">
                  (each box contains 25 bottles)
                </span>
              </label>
              <input
                type="number"
                className="quantity-input"
                placeholder="Enter quantity"
                onChange={(e) => setTotalBoxes(e.target.value)}
              />
            </div>
          </div>
          <div className="btn-div">
            <button className="add-btn" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewInventory;

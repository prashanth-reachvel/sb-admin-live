import React, { useEffect, useState } from "react";
import "./AddSchool.css";
import Sidebar from "../Sidebar";
import axios from "axios";

const AddSchool = () => {
  const [schoolName, setSchoolName] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [address, setAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setSchoolId(generateSchoolId());
  }, []);

  function generateSchoolId() {
    let id = "";
    while (id.length < 6) {
      const digit = Math.floor(Math.random() * 10).toString();
      if (!id.includes(digit)) {
        id += digit;
      }
    }
    return id;
  }

  console.log(schoolId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/add", {
        schoolName,
        schoolId,
        address,
        contactPerson,
        email,
        mobile,
        username,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error Submitting Add School:", error);
    }
  };

  return (
    <div className="add-school-container">
      {/* <Sidebar /> */}
      <div className="add-school-inner-container">
        <h2 className="add-school-title">Add School</h2>
        <form onSubmit={handleSubmit}>
          <div className="label-input-container">
            <label className="add-school-label">School Name: </label>
            <input
              type="text"
              className="add-school-input"
              onChange={(e) => setSchoolName(e.target.value)}
            />
          </div>
          <div className="label-input-container">
            <label className="add-school-label">School ID: </label>
            <input
              type="text"
              className="add-school-input"
              value={schoolId}
              // onChange={(e) => setSchoolId(e.target.value)}
              readOnly
            />
          </div>
          <div className="label-input-container">
            <label className="add-school-label">Address: </label>
            <input
              type="text"
              className="add-school-input"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="label-input-container">
            <label className="add-school-label">Contact Person: </label>
            <input
              type="text"
              className="add-school-input"
              onChange={(e) => setContactPerson(e.target.value)}
            />
          </div>
          <div className="label-input-container">
            <div style={{ display: "flex" }}>
              <label className="add-school-label">Email: </label>
              <input
                type="email"
                className="add-school-input short-input"
                style={{ marginLeft: "110px" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ display: "flex" }}>
              <label className="add-school-label">Mobile: </label>
              <input
                type="number"
                className="add-school-input short-input"
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>
          <div className="label-input-container">
            <label className="add-school-label">Username: </label>
            <input
              type="text"
              className="add-school-input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="label-input-container">
            <label className="add-school-label">Password: </label>
            <input
              type="password"
              className="add-school-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="submit-btn"
            style={{ left: "385px" }}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSchool;

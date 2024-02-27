import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SchoolList.css";
import axios from "axios";

const SchoolList = () => {
  const [schools, setSchools] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://localadminapi.sevabharath.com/schoolslist")
      .then((response) => {
        setSchools(response.data);
      })
      .catch((error) => {
        console.error("Error fetching schools:", error);
      });
  }, []);

  console.log(schools.length);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSchools = schools.filter((school) =>
    school.schoolName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="schoollist-container">
      <div className="schoollist-inner-container">
        <p className="school-text">Schools - {schools.length}</p>
        <div className="search-addschool-container">
          <input
            type="search"
            placeholder="Type here"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Link to="/add-school">
            <button className="add-school">ADD SCHOOL</button>
          </Link>
        </div>
      </div>
      <div className="schoollist-table-container">
        <table>
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>School Name</th>
              <th>Location</th>
              <th>Contact Details</th>
              <th>Students Count</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredSchools.map((school, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{school.schoolName}</td>
                <td>{school.address}</td>
                <td>
                  {school.email} <br />
                  {school.mobile}
                </td>
                <td>{school.students}</td>
                <td>
                  <Link to={`/key-progress-index/${school.schoolName}`}>
                    <button className="go-button">Go</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolList;

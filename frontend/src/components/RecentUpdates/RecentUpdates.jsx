import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecentUpdates.css";
import axios from "axios";

const RecentUpdates = () => {
  const { schoolName, title } = useParams();
  const [updates, setUpdates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const school = schoolName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedTitle = encodeURIComponent(title);
        const response = await axios.get(
          `http://localhost:3001/api/recentupdates/${school}/${encodedTitle}?limit=5`
        );
        setUpdates(response.data || []); // Ensure updates is always an array
      } catch (error) {
        console.error("Error fetching recent updates:", error);
        setUpdates([]); // Set updates to an empty array if there's an error
      }
    };
    fetchData();
  }, [schoolName, title]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUpdates = updates.filter((update) => {
    return (
      (!selectedDate || update.updatedDate === selectedDate) &&
      (!searchQuery ||
        (update.title &&
          update.title.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  });

  return (
    <div className="inventory-box update-table">
      <div className="recent-updates-inventory-top-row">
        <h3 className="inventory-heading">Recent Updates</h3>
        <div style={{ display: "flex" }}>
          <input
            className="date-filter"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <div className="search-update">
            <div className=" school-db-search">
              <input
                type="text"
                className="search-input"
                placeholder="Type here"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
        </div>
      </div>
      <table className="school-table">
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Inventory</th>
            <th>Qty</th>
            <th>Date</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {filteredUpdates.map((update, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>{update.title}</td>
              <td>
                <div
                  className={
                    update.reason === "Updated by SB" ? "positive" : "negative"
                  }
                >
                  {update.reason === "Updated by SB"
                    ? `+ ${update.newTotalQuantity}`
                    : `- ${update.newTotalQuantity}`}
                </div>
              </td>
              <td>{update.updatedDate}</td>
              <td>{update.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentUpdates;

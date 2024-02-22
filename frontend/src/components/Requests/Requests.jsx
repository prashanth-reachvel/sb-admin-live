import React, { useEffect, useState } from "react";
import "./Requests.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/requests?limit=5"
        );
        console.log(response.data);
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchData();
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = async (event, requestId) => {
    const newStatus = event.target.value;
    try {
      await axios.put(`http://localhost:3000/api/requests/${requestId}`, {
        status: newStatus,
      });
      // Update the status in the local state
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId
            ? { ...request, status: newStatus }
            : request
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredRequests = requests.filter((request) => {
    return (
      (!selectedDate || request.date === selectedDate) &&
      (!searchQuery ||
        (request.inventory &&
          request.inventory.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  });

  return (
    <div className="outer-box" style={{ margin: "0" }}>
      <div className="top-row">
        <p className="request-head">Requests</p>
        <div className="filter-right">
          <input
            type="date"
            className="filter-field date-input"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <div className="search-group">
            <input
              type="text"
              className="search-input"
              placeholder="Search here"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>School Name</th>
            <th>Inventory Title</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Documents</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request, index) => (
            <tr key={index}>
              <td className="td-text-style">{index + 1}</td>
              <td>{request.schoolName}</td>
              <td>{request.inventory}</td>
              <td>{request.quantity}</td>
              <td>{request.date}</td>
              <td>
                {/* <a href="https://example.com" className="link">
                  view
                </a> */}
                {/* <img src={`data:image/jpeg;base64,${request.selectedFile}`} /> */}
                {request.selectedFile && (
                  <a
                    href={`http://localhost:3000/uploads/${request.selectedFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                )}
              </td>
              <td>
                {request.status === "Approved" ? (
                  <span className="approved">Approved</span>
                ) : request.status === "Open" ? (
                  <span className="open">On Hold</span>
                ) : request.status === "Declined" ? (
                  <span className="declined">Declined</span>
                ) : (
                  <select
                    value={request.status}
                    onChange={(event) => handleStatusChange(event, request._id)}
                  >
                    <option value="Open">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Declined">Declined</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;

import React, { useState } from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ onLogout }) => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isVendorDropdown, setIsVendorDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSignout = () => {
    setIsLoggedOut(true);
  };

  if (isLoggedOut) {
    navigate("/");
    onLogout();
  }

  const handleVendorDropdown = () => {
    setIsVendorDropdown(!isVendorDropdown);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div className="sidebar-main-container">
      <div>
        <Link to="/admin">
          <p
            className={`sidebar-items ${
              activeItem === "Dashboard" ? "sidebar-active-item" : ""
            }`}
            onClick={() => handleItemClick("Dashboard")}
          >
            Dashboard
          </p>
        </Link>
        <p
          className={`sidebar-items ${
            activeItem === "Vendor Dashboard" ? "sidebar-active-item" : ""
          }`}
          onClick={() => {
            handleItemClick("Vendor Dashboard");
            handleVendorDropdown();
          }}
        >
          Vendor Dashboard
        </p>
        {isVendorDropdown && (
          <div className="vendor-dashboard-dropdown">
            <Link to="/vendor-production1" className="dropdown-item">
              Production
            </Link>
            <Link to="/vendor-production" className="dropdown-item">
              Details
            </Link>
          </div>
        )}
        <p
          className={`sidebar-items ${
            activeItem === "Membership" ? "sidebar-active-item" : ""
          }`}
          onClick={() => handleItemClick("Membership")}
        >
          Membership
        </p>
        <Link to="/school-list">
          <p
            className={`sidebar-items ${
              activeItem === "School List" ? "sidebar-active-item" : ""
            }`}
            onClick={() => handleItemClick("School List")}
          >
            School List
          </p>
        </Link>
        <Link to="/add-school">
          <p
            className={`sidebar-items ${
              activeItem === "Add School" ? "sidebar-active-item" : ""
            }`}
            onClick={() => handleItemClick("Add School")}
          >
            Add School
          </p>
        </Link>
        <Link to="/requests">
          <p
            className={`sidebar-items ${
              activeItem === "Requests" ? "sidebar-active-item" : ""
            }`}
            onClick={() => handleItemClick("Requests")}
          >
            Requests
          </p>
        </Link>
      </div>
      <button className="signout-button" onClick={handleSignout}>
        Signout
      </button>
    </div>
  );
};

export default Sidebar;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SchoolProfile.css";
import axios from "axios";

const SchoolProfile = () => {
  const { schoolName } = useParams();
  const [profileData, setProfileData] = useState([]);
  const [editUsername, setEditUsername] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localadminapi.sevabharath.com/api/profile/${schoolName}`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error Fetching Profile:", error);
      }
    };
    fetchProfileData();
  }, [schoolName]);

  const handleUsernameEdit = () => {
    setEditUsername(true);
  };

  const handlePasswordEdit = () => {
    setEditPassword(true);
  };

  const handleUsernameChange = async (e) => {
    if (e.key === "Enter") {
      const newUsername = e.target.innerText;
      try {
        await axios.put(
          `http://localadminapi.sevabharath.com/api/profile/updateUsername/${schoolName}`,
          {
            username: newUsername,
          }
        );
        setProfileData((prevData) => ({ ...prevData, username: newUsername }));
        setEditUsername(false);
        alert("Username updated successfully");
      } catch (error) {
        console.error("Error updating username:", error);
      }
    }
  };

  const handlePasswordChange = async (e) => {
    if (e.key === "Enter") {
      const newPassword = e.target.innerText;
      try {
        await axios.put(
          `http://localadminapi.sevabharath.com/api/profile/updatePassword/${schoolName}`,
          {
            password: newPassword,
          }
        );
        setProfileData((prevData) => ({ ...prevData, password: newPassword }));
        setEditPassword(false);
        alert("Password updated successfully");
      } catch (error) {
        console.error("Error updating password:", error);
      }
    }
  };

  return (
    <div className="inventory-box">
      <div className="inventory-top-row">
        <h3 className="inventory-heading">{profileData.schoolName}</h3>
        <button className="inventory-btn">Inventory</button>
      </div>
      <div action="#" method="post" id="add-school-form">
        <div className="form-group ">
          <label htmlFor="schoolName" className=" col-form-label">
            School Name:
          </label>
          <div className="school-data">{profileData.schoolName}</div>
        </div>

        <div className="form-group row">
          <label htmlFor="schoolId" className=" col-form-label">
            School ID:
          </label>
          <div className=" school-data">{profileData.schoolId}</div>
        </div>

        <div className="form-group row">
          <label htmlFor="address" className=" col-form-label">
            Address:
          </label>
          <div className=" school-data">{profileData.address}</div>
        </div>

        <div className="form-group row">
          <label htmlFor="contactPerson" className=" col-form-label">
            Contact Person:
          </label>
          <div className=" school-data">{profileData.contactPerson}</div>
        </div>

        <div className="form-group row">
          <label htmlFor="email" className=" col-form-label">
            Email:
          </label>
          <div className=" school-data">{profileData.email}</div>
        </div>

        <div className="form-group row">
          <label htmlFor="phoneNumber" className=" col-form-label">
            Phone Number:
          </label>
          <div className=" school-data">{profileData.mobile}</div>
        </div>

        <div className="form-group  row">
          <label htmlFor="username" className=" col-form-label">
            Username:
          </label>

          <div
            className="input-bg-group school-data"
            id="editableField"
            contentEditable={editUsername}
            onKeyPress={handleUsernameChange}
            onBlur={() => setEditUsername(false)}
          >
            {profileData.username}
            {!editUsername && (
              <button className="edit-btn" onClick={handleUsernameEdit}>
                Edit
              </button>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="password" className=" col-form-label">
            Password:
          </label>
          <div
            className="input-bg-group editable-field school-data"
            id="editablePassword"
            contentEditable={editPassword}
            onKeyPress={handlePasswordChange}
            onBlur={() => setEditPassword(false)}
          >
            {profileData.password}
            {!editPassword && (
              <button className="edit-btn" onClick={handlePasswordEdit}>
                Edit
              </button>
            )}
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="fileUpload" className=" col-form-label">
            Uploaded Docs:
          </label>
          <div className=" school-data mt-2">
            <div className="">
              <select className="doc-view-btn">
                <option value="someOption">View Files</option>
                <option value="otherOption">Other option</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolProfile;

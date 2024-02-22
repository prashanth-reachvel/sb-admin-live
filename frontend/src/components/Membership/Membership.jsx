import React from "react";
import "./Membership.css";
import Sidebar from "../Sidebar";

const Membership = () => {
  return (
    <div className="membership-container">
      {/* <Sidebar /> */}
      <div className="membership-inner-container">
        <h2 className="membership-title">Membership</h2>
        <form>
          <div className="label-input-container">
            <label className="membership-label">Full Name: </label>
            <input type="text" className="membership-input" />
          </div>
          <div className="label-input-container">
            <div>
              <label className="membership-label">Gender: </label>
              <select className="membership-input short-input gender-input">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label className="membership-label">DOB: </label>
              <input type="date" className="membership-input short-input" />
            </div>
          </div>
          <div className="label-input-container">
            <div>
              <label className="membership-label">Nationality: </label>
              <select className="membership-input short-input nationality-input">
                <option>Indian</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="membership-label">Occupation: </label>
              <select className="membership-input short-input">
                <option>Occupation 1</option>
                <option>Occupation 2</option>
              </select>
            </div>
          </div>
          <div className="label-input-container">
            <div>
              <label className="membership-label">Mobile: </label>
              <input
                type="number"
                className="membership-input short-input mobile-input"
              />
            </div>
            <div>
              <label className="membership-label">Email: </label>
              <input type="email" className="membership-input short-input" />
            </div>
          </div>
          <div className="label-input-container">
            <label className="membership-label">Address: </label>
            <input type="text" className="membership-input" />
          </div>
          <div className="label-input-container">
            <div>
              <label className="membership-label">City: </label>
              <input
                type="email"
                className="membership-input short-input city-input"
              />
            </div>
            <div>
              <label className="membership-label">District: </label>
              <input type="number" className="membership-input short-input" />
            </div>
          </div>
          <div className="label-input-container">
            <div>
              <label className="membership-label">State: </label>
              <input
                type="email"
                className="membership-input short-input email-input"
              />
            </div>
            <div>
              <label className="membership-label">Pincode: </label>
              <input type="number" className="membership-input short-input" />
            </div>
          </div>
          <div className="label-input-container">
            <label className="membership-label share-your-opinion">
              Share your ideas on Seva Bharat:{" "}
            </label>
            <textarea
              type="text"
              className="membership-input share-your-opinion-input"
            />
          </div>
          <div className="membership-plans-container">
            <p className="membership-label">Membership:</p>
            <div className="membership-plans-inner-container">
              <input
                type="radio"
                name="membership"
                className="membership-radio-input"
                checked
              />
              <label className="membership-label plan">1 Year Membership</label>
            </div>
            <div className="membership-plans-inner-container">
              <input
                type="radio"
                name="membership"
                className="membership-radio-input"
              />
              <label className="membership-label plan">
                10 Years Membership
              </label>
            </div>
            <div className="membership-plans-inner-container">
              <input
                type="radio"
                name="membership"
                className="membership-radio-input"
              />
              <label className="membership-label plan">
                Lifetime Membership
              </label>
            </div>
          </div>
          <button className="submit-btn">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default Membership;

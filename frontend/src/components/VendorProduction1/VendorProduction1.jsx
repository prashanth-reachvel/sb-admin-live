import React from "react";
import "./VendorProduction1.css";
import Sidebar from "../Sidebar";

const VendorProduction1 = () => {
  return (
    <div className="vendor-production1-container">
      {/* <Sidebar /> */}
      <div className="vendor-production1-inner-container">
        <div className="first-container">
          <div className="title-more-container">
            <p className="title">Narmul Dairy</p>
            <button className="more-button">MORE</button>
          </div>
          <div className="box-container">
            <div className="inner-box-container">
              <h2 className="box-head1">Falvoured Milk-Badam</h2>
              <p className="box-value">7500/8000</p>
              <p>Distributed</p>
            </div>
            <div className="inner-box-container box-2">
              <h2 className="box-head2">Falvoured Milk-Badam</h2>
              <p className="box-value">0/8000</p>
              <p>Distributed</p>
            </div>
            <div className="inner-box-container box-3">
              <h2 className="box-head3">Falvoured Milk-Badam</h2>
              <p className="box-value">7500/8000</p>
              <p>Distributed</p>
            </div>
          </div>
        </div>
        <div className="first-container">
          <div className="title-more-container">
            <p className="title">Raj Enterprises</p>
            <button className="more-button">MORE</button>
          </div>
          <div className="box-container">
            <div className="inner-box-container">
              <h2 className="box-head1">Uniform-School</h2>
              <p className="box-value">7500/8000</p>
              <p>Distributed</p>
            </div>
            <div className="inner-box-container box-2">
              <h2 className="box-head2">Uniform-White</h2>
              <p className="box-value">0/8000</p>
              <p>Distributed</p>
            </div>
            <div className="inner-box-container box-3">
              <h2 className="box-head3">Uniform-Sports Wear</h2>
              <p className="box-value">7500/8000</p>
              <p>Distributed</p>
            </div>
          </div>
        </div>
        <div className="first-container">
          <div className="title-more-container">
            <p className="title">Stationary</p>
            <button className="more-button">MORE</button>
          </div>
          <div className="box-container">
            <div className="inner-box-container">
              <h2 className="box-head1">X Class Textbooks</h2>
              <p className="box-value">7500/8000</p>
              <p>Distributed</p>
            </div>
            <div className="inner-box-container box-2">
              <h2 className="box-head2">White Notes</h2>
              <p className="box-value">0/8000</p>
              <p>Distributed</p>
            </div>
            <div className="inner-box-container box-3">
              <h2 className="box-head3">6th Class Textbooks</h2>
              <p className="box-value">7500/8000</p>
              <p>Distributed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProduction1;

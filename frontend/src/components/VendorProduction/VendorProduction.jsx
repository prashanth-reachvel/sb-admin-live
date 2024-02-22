import React from "react";
import "./VendorProduction.css";
import Sidebar from "../Sidebar";

const VendorProduction = () => {
  return (
    <div className="vendor-production-container">
      {/* <Sidebar /> */}
      <div className="vendor-production-inner-container">
        <div className="inner-header">
          <p className="narmul-dairy">Narmul Dairy</p>
          <div className="button-container">
            <button className="btn-add-inventory">ADD INVENTORY</button>
            <button className="btn-assign-task">ASSIGN TASK</button>
          </div>
        </div>
        <div className="box-container">
          {/* Note: Using a flexbox layout for better responsiveness */}
          <div className="inner-box-container">
            <h2 className="box-head1">Falvoured Milk-Badam</h2>
            <p className="box-value">7500/8000</p>
            <p>Distributed</p>
          </div>
          <div className="inner-box-container box-2">
            <h2 className="box-head2">Falvoured Milk-Badam</h2>
            <p className="box-value">7500/8000</p>
            <p>Distributed</p>
          </div>
          <div className="inner-box-container box-3">
            <h2 className="box-head3">Falvoured Milk-Badam</h2>
            <p className="box-value">7500/8000</p>
            <p>Distributed</p>
          </div>
        </div>
        <div style={{ marginTop: "30px" }}>
          <div className="inner-box-container">
            <h2 className="box-head4">Falvoured Milk-Kaju</h2>
            <p className="box-value">7500/8000</p>
            <p>Distributed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProduction;

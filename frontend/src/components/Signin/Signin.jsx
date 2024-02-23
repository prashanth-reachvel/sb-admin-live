import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signin.css";

const Signin = ({ onLogin }) => {
  // Receive onLogin prop
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .post("https://localadminapi.sevabharath.com/login", { username, password })
        .then((result) => {
          // console.log(result);
          console.log("Response from server:", result.data);
          if (result.data === "Success") {
            onLogin(username); // Pass username to onLogin function
            console.log("Redirecting to /home");
            console.log(username);
            localStorage.setItem("admin_username", username);
            navigate("/admin");
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error:", error);
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="signin-main-container">
      <div className="signin-inner-container">
        <img
          src="/school-girls.jpg"
          alt="signin_img"
          className="signin-bg-image"
        />
        <img
          src="/white-logo.png"
          alt="white-logo"
          className="signin-white-logo"
        />
      </div>
      <div style={{ width: "530px", height: "283px", marginLeft: "50px" }}>
        <p style={{ fontSize: "24px", fontWeight: "700", color: "#046A38" }}>
          Welcome to Seva Bharat
        </p>
        <Link to="/register">
          <p style={{ fontSize: "24px", fontWeight: "700", color: "#046A38" }}>
            Sign Up
          </p>
        </Link>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "16px", fontWeight: "400" }}>
              Username :
            </label>
            <input
              type="text"
              className="input-element"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize: "16px", fontWeight: "400" }}>
              Password :
            </label>
            <input
              type="password"
              className="input-element"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="btn-container">
            <button type="submit" className="signin-button">
              SIGN IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;

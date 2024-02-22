import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Signin from "./components/Signin/Signin";
import Admin from "./components/Admin/Admin";
import AddNewInventory from "./components/AddNewInventory/AddNewInventory";
import VendorProduction from "./components/VendorProduction/VendorProduction";
import VendorProduction1 from "./components/VendorProduction1/VendorProduction1";
import AddSchool from "./components/AddSchool/AddSchool";
import Membership from "./components/Membership/Membership";
import AssignTask from "./components/AssignTask/AssignTask";
import Tasks from "./components/Tasks/Tasks";
import Header from "./components/Header/Header";
import Requests from "./components/Requests/Requests";
import SchoolList from "./components/SchoolList/SchoolList";
import Register from "./components/Register/Register";
import KeyProgressIndex from "./components/KeyProgressIndex/KeyProgressIndex";
import UpdateInventory from "./components/UpdateInventory/UpdateInventory";
import SchoolProfile from "./components/SchoolProfile/SchoolProfile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Update localStorage whenever login state changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // Function to handle successful login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      {isLoggedIn && (
        <div style={{ display: "flex" }}>
          <Sidebar onLogout={handleLogout} />
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/add-inventory/:schoolName"
              element={<AddNewInventory />}
            />
            <Route path="/vendor-production" element={<VendorProduction />} />
            <Route path="/vendor-production1" element={<VendorProduction1 />} />
            <Route path="/add-school" element={<AddSchool />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/assigntask-production" element={<AssignTask />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/school-list" element={<SchoolList />} />
            <Route
              path="/key-progress-index/:schoolName"
              element={<KeyProgressIndex />}
            />
            <Route
              path="/update-inventory/:schoolName/:title"
              element={<UpdateInventory />}
            />
            <Route
              path="/school-profile/:schoolName"
              element={<SchoolProfile />}
            />
          </Routes>
        </div>
      )}
      {!isLoggedIn && (
        <Routes>
          <Route path="/" element={<Signin onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;

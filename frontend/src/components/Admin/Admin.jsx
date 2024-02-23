import React, { useEffect, useState, useRef } from "react";
// import Sidebar from "./Sidebar";
import SchoolList from "../SchoolList/SchoolList";
import "./Admin.css";
import axios from "axios";

const Admin = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const scrollRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localadminapi.sevabharath.com/api/inventories"
        );
        console.log(response.data);

        // Process the inventory data to calculate cumulative values
        const processedData = processInventoryData(response.data);

        setInventoryData(processedData);
      } catch (error) {
        console.error("Error fetching the Data:", error);
      }
    };
    fetchData();
  }, []);

  const processInventoryData = (data) => {
    // Use an object to store cumulative values for each title
    const titleMap = {};

    // Process the data and calculate cumulative values
    data.forEach((item) => {
      const { title, distributed, available, totalAddQuantity } = item;
      if (titleMap[title]) {
        titleMap[title].distributed += distributed;
        titleMap[title].available += available;
        titleMap[title].totalAddQuantity += totalAddQuantity;
      } else {
        titleMap[title] = {
          distributed,
          available,
          totalAddQuantity,
        };
      }
    });

    // Convert the object back to an array
    const processedData = Object.keys(titleMap).map((title, index) => ({
      title,
      ...titleMap[title],
      className:
        index % 3 === 0
          ? "flavoured-milk"
          : index % 3 === 1
          ? "uniform-distribution"
          : "educational-kits",
    }));

    return processedData;
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 200; // Adjust as needed
      setStartIndex((prevIndex) => Math.max(prevIndex - 3, 0));
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 200; // Adjust as needed
      setStartIndex((prevIndex) =>
        Math.min(prevIndex + 3, inventoryData.length - 3)
      );
    }
  };

  return (
    <div className="admin-container">
      {/* <Sidebar /> */}
      <div>
        <div className="scroll-container">
          <div className="scroll-arrow left-arrow" onClick={scrollLeft}>
            {"<"}
          </div>
          <div className="box-container-scroll" ref={scrollRef}>
            {inventoryData.slice(startIndex, startIndex + 3).map((item) => (
              <div key={item.title} className={`box ${item.className}`}>
                <p className="box-title">{item.title}</p>
                <div className="box-content">
                  <p>
                    Distributed: <span>{item.distributed}</span>
                  </p>
                  <p>
                    Available: <span>{item.available}</span>
                  </p>
                  <p>
                    Total: <span>{item.totalAddQuantity}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="scroll-arrow right-arrow" onClick={scrollRight}>
            {">"}
          </div>
        </div>
        <div className="school-list-container">
          <SchoolList />
        </div>
      </div>
    </div>
  );
};

export default Admin;

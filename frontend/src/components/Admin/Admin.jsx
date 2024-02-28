import React, { useEffect, useState, useRef } from "react";
import SchoolList from "../SchoolList/SchoolList";
import "./Admin.css";
import axios from "axios";

const Admin = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://schoolapi.sevabharath.com/api/inventories"
        ); // Use relative URL to access backend endpoint
        console.log(response.data);

        // Process the inventory data to calculate cumulative values
        if (!Array.isArray(response.data)) {
          console.error("Response data is not an array:", response.data);
          setLoading(false);
          return;
        }

        const processedData = processInventoryData(response.data);

        setInventoryData(processedData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching the Data:", error);
        setLoading(false); // Set loading to false in case of an error
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
      if (!titleMap[title]) {
        titleMap[title] = {
          distributed: 0,
          available: 0,
          totalAddQuantity: 0,
        };
      }
      titleMap[title].distributed += distributed;
      titleMap[title].available += available;
      titleMap[title].totalAddQuantity += totalAddQuantity;
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
      <div>
        <div className="scroll-container">
          <div className="scroll-arrow left-arrow" onClick={scrollLeft}>
            {"<"}
          </div>
          <div className="box-container-scroll" ref={scrollRef}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              inventoryData.slice(startIndex, startIndex + 3).map((item) => (
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
              ))
            )}
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

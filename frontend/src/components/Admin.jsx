import React from 'react'
import Sidebar from './Sidebar'
import SchoolList from './SchoolList/SchoolList'

const Admin = () => {
  return (
    <div style={{display: "flex", justifyContent: "space-around"}}>
        <Sidebar />
        {/* 3 Boxes for Flavoured Milk, Uniform Distribution, Educational Kits */}
        <div>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
            <div style={{width: "300px", height: "150px", boxShadow: "1px 1px 10px 0px #0000000D", border: "1px solid #FF671F", background: "linear-gradient(0deg, #FFEDE4, #FFEDE4)", borderRadius: "30px"}}>
                <p style={{fontSize: "20px", fontWeight: "600", color: "#FF671F"}}>Flavoured Milk Campaign</p>
                <div style={{padding: "0", margin: "0", lineHeight: "10px"}}>
                    <p style={{fontSize: "16px", fontWeight: "400"}}>Distributed: <span style={{fontWeight: "700"}}>5000</span></p>
                    <p style={{fontSize: "16px", fontWeight: "400"}}>Available: <span style={{fontWeight: "700"}}>3000</span></p>
                    <p style={{fontSize: "16px", fontWeight: "400"}}>Total: <span style={{fontWeight: "700"}}>8000</span></p>
                </div>
            </div>
            <div style={{width: "300px", height: "150px", boxShadow: "1px 1px 10px 0px #0000000D", border: "1px solid #046A38", background: "linear-gradient(0deg, #D9F5E7, #D9F5E7)", borderRadius: "30px"}}>
                <p style={{fontSize: "20px", fontWeight: "600", color: "#046A38"}}>Uniform Distribution</p>
                <div style={{padding: "0", margin: "0", lineHeight: "10px"}}>
                    <p style={{fontSize: "16px", fontWeight: "400"}}>Distributed: <span style={{fontWeight: "700"}}>5000</span></p>
                    <p style={{fontSize: "16px", fontWeight: "400"}}>Available: <span style={{fontWeight: "700"}}>3000</span></p>
                    <p style={{fontSize: "16px", fontWeight: "400"}}>Total: <span style={{fontWeight: "700"}}>8000</span></p>
                </div>
            </div>
            <div style={{width: "300px", height: "150px", boxShadow: "1px 1px 10px 0px #0000000D", border: "1px solid #444444", background: "linear-gradient(0deg, #F4F4F4, #F4F4F4)", borderRadius: "30px"}}>
                <p style={{fontSize: "20px", fontWeight: "600", color: "#444444"}}>Educational Kits</p>
                <div style={{padding: "0", margin: "0", lineHeight: "10px"}}>
                    <p style={{fontSize: "16px", fontWeight: "400"}}>Distributed: <span style={{fontWeight: "700"}}>5000</span></p>
                    <p style={{fontSize: "16px", fontWeight: "400"}}>Available: <span style={{fontWeight: "700"}}>3000</span></p>
                    <p style={{fontSize: "16px", fontWeight: "400"}}>Total: <span style={{fontWeight: "700"}}>8000</span></p>
                </div>
            </div>
            </div>
            <div style={{width: "988px", height: "640px", boxShadow: "1px 1px 10px 5px #0000000D", borderRadius: "20px"}}>
                {/* School List */}
                <SchoolList />
            </div>
        </div>
    </div>
  )
}

export default Admin
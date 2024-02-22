import React from 'react'

const Sidebar = () => {
  return (
    <div style={{width: "202px", height: "805px", boxShadow: "1px 1px 10px 5px #0000000D", borderRadius: "30px"}}>
        <p style={{fontSize: "16px", fontWeight: "700", color: "#444444", marginBottom: "20px", padding: "10px", background: "#FF671F", borderRadius: "20px"}}>Dashboard</p>
        <p style={{fontSize: "16px", fontWeight: "700", color: "#444444", marginBottom: "20px"}}>Vendor Dashboard</p>
        <p style={{fontSize: "16px", fontWeight: "700", color: "#444444", marginBottom: "20px"}}>Membership</p>
        <p style={{fontSize: "16px", fontWeight: "700", color: "#444444", marginBottom: "20px"}}>School List</p>
        <p style={{fontSize: "16px", fontWeight: "700", color: "#444444", marginBottom: "20px"}}>Add School</p>
        <p style={{fontSize: "16px", fontWeight: "700", color: "#444444", marginBottom: "20px"}}>Requests</p>
    </div>
  )
}

export default Sidebar;
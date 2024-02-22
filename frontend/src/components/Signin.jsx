import React from 'react'

const Signin = () => {
  return (
    <div style={{width: "1200px", height: "700px", boxShadow: "1px 1px 10px 5px #0000000D", borderRadius: "30px", display: "flex", alignItems: "center", textAlign: "left"}}>
      <div style={{width: "530px", height: "700px", background: "#046A38", borderRadius: "30px 0px 0px 30px"}}>
        <img src='../../public/signin.jpg' alt='signin_img' style={{width: "530px", height: "700px", borderRadius: "30px 0px 0px 30px", backgroundSize: "cover", opacity: "20%"}}/>
      </div>
      <div style={{width: "530px", height: "283px", marginLeft: "50px"}}>
        <p style={{fontSize: "24px", fontWeight: "700", color: "#046A38"}}>Welcome to Seva Bharat</p>
        <p style={{fontSize: "24px", fontWeight: "700", color: "#046A38"}}>Sign Up</p>
        <form style={{}}>
          <div style={{marginBottom: "20px"}}>
            <label style={{fontSize: "16px", fontWeight: "400"}}>Username :</label>
            <input type='text' style={{fontSize: "16px", background: "#F1EEEC", width: "400px", height: "20px", borderRadius: "30px", border: "none", outline: "none", marginLeft: "20px", padding: "10px"}}/>
          </div>
          <div>
            <label style={{fontSize: "16px", fontWeight: "400"}}>Password :</label>
            <input type='password' style={{background: "#F1EEEC", width: "400px", height: "20px", borderRadius: "30px", border: "none", outline: "none", marginLeft: "20px", padding: "10px"}}/>
          </div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px"}}>
            <button style={{background: "#046A38", width: "150px", height: "40px", borderRadius: "30px", color:"#fff", border: "none", outline: "none", fontSize: "20px", fontWeight: "600"}}>SIGN IN</button>
          </div>
      </form>
      </div>
    </div>
  )
}

export default Signin
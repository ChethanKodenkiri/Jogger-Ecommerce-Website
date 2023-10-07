import { React, useState } from "react";
import "../style/index.css";
import OtpValidation from "./otpValidation";

const UserOtp = () => {
  const [userOtp, setUserOtp] = useState("");
  const handleUserOtp = (e) => {
    setUserOtp(e.target.value);
  };
  const sendUserOtp = (e) => {
    e.preventDefault();
    OtpValidation(userOtp);
  };

  return (
    <div style={{ marginLeft: "300px", border: "none" }} className="loginPage">
      <h1
        className="loginPage"
        style={{
          border: "none",
          marginLeft: "50px",
          marginRight: "50px",
          marginBottom: "50px",
        }}
      >
        OTP Verification
      </h1>
      <input
        style={{ marginLeft: "80px" }}
        value={userOtp}
        onChange={handleUserOtp}
        className="loginPage"
        type="text"
        placeholder="Enter OTP"
      />
      <button
        style={{ marginLeft: "220px", border: "none", width: "100px"}}
        className="loginPage"
        type="submit"
        onClick={sendUserOtp}
      >
        Verify
      </button>
    </div>
  );
};

export default UserOtp;

import React from 'react';
import { useNavigate } from "react-router-dom";
import "../style/Cancel.css";
import "../style/index.css";

const Cancel = () => {
  const navigate = useNavigate();
  return (
    <div className="cancel">
      <h1>Payment Cancelled</h1>
      <p>Your payment was cancelled. Please try again.</p>
      <button className="cancel-button" onClick={()=>{navigate("/")} }>Go to Homepage</button>   
    </div>
  );
}

export default Cancel;

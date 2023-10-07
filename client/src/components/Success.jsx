import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/index.css";
import "../style/Success.css";

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="success">
      <h1>Thank You!</h1>
      <p>Your order has been placed.</p>
      <button
        className="success-button"
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;

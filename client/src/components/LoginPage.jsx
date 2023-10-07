import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import alert from "sweetalert";
import sendOtp from "./Otp";
import "../style/index.css";
import "../style/loginPage.css";
import Navbar from "./navbar";
import homepageImage from "../Images/ImageComponent/Images";


const LoginPage = ({ userOtp }) => {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (event) => {
    const { name, value } = event.target;
    setUserLogin({ ...userLogin, [name]: value });
    
  };

  const login = async (event) => {
    event.preventDefault();
    const { email, password } = userLogin;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.status === 400 || !data) {
      alert("Invalid credentials", "Please Check the credentials", "error");
    } else {
      sendOtp({ email });
      navigate("/otp");
    }
  };

  return (
    <div>
      <Navbar />
      <img
        src={homepageImage.homepageImage}
        alt=""
        style={{
          width: "100vw", 
          height: "100vh", 
          objectFit: "cover",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
          filter: "brightness(0.5)",
        }}
      />
      <form method="POST" className="forgotPasswordForm">
        <h1 style={{ color: "white" }}>Login</h1>

        <div>
          <label htmlFor="email" style={{ color: "white" }}>
            Email:
          </label>
          <input
            name="email"
            type="email"
            value={userLogin.email}
            onChange={handleLogin}
          />
        </div>

        <div>
          <label htmlFor="password" style={{ color: "white" }}>
            Password:
          </label>
          <input
            name="password"
            type="password"
            value={userLogin.password}
            onChange={handleLogin}
          />
        </div>
        <div>
          <Link
            to="/forgotpassowrd"
            style={{ color: "white", marginLeft: "255px" }}
          >
            Forgot Password?
          </Link>
        </div>

        <button onClick={login} type="submit">
          Login
        </button>
      </form>
      <div>
        <Link to="/register" style={{ color: "white", marginLeft: "540px" }}>
          Or Create New Account
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;

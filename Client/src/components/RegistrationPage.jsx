import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import alert from "sweetalert";
import "../style/index.css";
import "../style/RegistrationPage.css";
import Navbar from "./navbar";
import homepageImage from "../Images/ImageComponent/Images";

const RegistrationPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
      }),
    });

    const data = await res.json();
    if (res.status === 401 || !data) {
      alert("Fill the data", "Invalid Registration", "error");
    } else if (res.status === 422) {
      alert("Email already exists", "Email already exists", "warning");
    } else if (res.status === 403) {
      alert(
        "Phone number should be 10 digits",
        "Phone number should be 10 digits",
        "warning"
      );
    } else if (res.status === 421) {
      alert(
        "Passwords are not matching",
        "Passwords are not matching",
        "warning"
      );
    } else {
      alert("Successful ", "Registration Successful", "success");

      navigate("/login");
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
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

      <form method="POST" className="registrationPage" onSubmit={handleSubmit}>
        <h1 style={{ color: "white" }}>Register</h1>

        <div>
          <label htmlFor="username" style={{ color: "white" }}>
            UserName:
          </label>
          <input
            name="name"
            type="text"
            value={user.name}
            onChange={handleInput}
          />
        </div>

        <div>
          <label htmlFor="email" style={{ color: "white" }}>
            Email:
          </label>
          <input
            name="email"
            type="email"
            value={user.email}
            onChange={handleInput}
          />
        </div>

        <div>
          <label htmlFor="tel" style={{ color: "white" }}>
            Phone Number:
          </label>
          <input
            name="phone"
            type="tel"
            value={user.phone}
            onChange={handleInput}
          />
        </div>

        <div>
          <label htmlFor="password" style={{ color: "white" }}>
            Password:
          </label>
          <input
            name="password"
            type="password"
            value={user.password}
            onChange={handleInput}
          />
        </div>

        <div>
          <label htmlFor="cpassword" style={{ color: "white" }}>
            Confirm Password:
          </label>
          <input
            name="cpassword"
            type="password"
            value={user.cpassword}
            onChange={handleInput}
          />
        </div>

        <button type="submit" onClick={PostData}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;

import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/navbar";
import CartPage from "./components/cartPage";
import ContactUs from "./components/contactus";
import ForgotPassword from "./components/forgotPassword";
import UserOtp from "./components/UserOtp";
import Success from "./components/Success";
import Cancel from "./components/Cancel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/forgotpassowrd" element={<ForgotPassword />} />
        <Route path="/otp" element={<UserOtp />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import alert from "sweetalert";
import "../style/forgotPassword.css";
function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [updateUser, setUpdateUser] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdatePassword = (event) => {
    const { name, value } = event.target;
    setUpdateUser({ ...updateUser, [name]: value });
  };

  const updatePassword = async (event) => {
    event.preventDefault();
    const { email, newPassword, confirmPassword } = updateUser;

    const res = await fetch("/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email,newPassword,confirmPassword}),
    });
    const data = await res.json();
    if(res.status === 404||!data){
      alert("User not found with this email", "Please Check the credentials", "error");
    }
    else if(res.status === 421){
      alert("Passwords do not match", "Please check that passwords match", "error");
    }else if (res.status === 201) {
      alert("Password updated successfully", "Please login with your new password", "success");
      navigate("/login");
  }
};

  return (
    <form className="forgotPasswordForm">
      <h1>Reset Your Password</h1>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          id="email"
          type="email"
          value={updateUser.email}
          onChange={handleUpdatePassword}
        />
      </div>

      <div>
        <label htmlFor="newPassword">New Password:</label>
        <input
          name="newPassword"
          id="newPassword"
          type="password"
          value={updateUser.newPassword}
          onChange={handleUpdatePassword}
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          value={updateUser.confirmPassword}
          onChange={handleUpdatePassword}
        />
      </div>

      <button onClick={updatePassword} type="submit">
        Update Password
      </button>
    </form>
  );
}

export default ForgotPasswordPage;

import React from "react";
import "../login/LoginPage.css";

const LoginPage: React.FC = () => {
  return (
    <div className="login-container text-black">
      {/* Left Side - Login Form */}
      <div className="login-form">
        <img src="images/Logo.png" alt="E Hotel Logo" className="logo" />
        <h1 className="welcome-text ">Welcome Back</h1>
        <p className="subtext">
          The faster you fill up, the faster you’ll be able to travel!
        </p>
        <form className="form-container ">
          <label className="label text-black">Full Name:</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter your full name"
          />
          <label className="label text-black">ID (SSN/SIN):</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter your ID"
          />
          <button className="submit-button">Log in</button>
        </form>
      </div>

      {/* Right Side - Image */}
      <div className="image-container">
        <img
          src="images/LogInImage.png"
          alt="Hotel Pool"
          className="login-image"
        />
      </div>
    </div>
  );
};

export default LoginPage;

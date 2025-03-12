import React from "react";
import Logo from "../../../assets/global/Logo.png";
import LogInImage from "../../../assets/LoginPage/LogInImage.png";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      {/* Left Side - Login Form */}
      <div className="login-form">
        <img src={Logo.src} alt="E Hotel Logo" className="logo" />
        <h1 className="welcome-text">Welcome Back</h1>
        <p className="subtext">
          The faster you fill up, the faster you’ll be able to travel!
        </p>
        <form className="form-container">
          <label className="label">Full Name:</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter your full name"
          />
          <label className="label">ID (SSN/SIN):</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter your ID"
          />
          <button className="submit-button">Sign in</button>
        </form>
      </div>
      
      {/* Right Side - Image */}
      <div className="image-container">
        <img
          src={LogInImage.src}
          alt="Hotel Pool"
          className="login-image"
        />
      </div>
    </div>
  );
};

export default LoginPage;
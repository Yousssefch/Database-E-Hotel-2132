import React from "react";
import "./SignUpPage.css";


const SignUpPage: React.FC = () => {
  return (
    <div className="login-container text-black">
      {/* Left Side - Login Form */}
      <div className="login-form">
        <img src="images/Logo.png" alt="E Hotel Logo" className="logo" />
        <h1 className="welcome-text">Register</h1>
        <p className="subtext">
          Don't have an account? Register now to enjoy seamless check-ins
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
          <label className="label">Address:</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter your ID"
          />

          <label className="label">Customer/Employee:</label>
          <select
            name="Customer/Employee"
            id="Customer/Employee"
            className="customer-select"
          >
            <option value="Customer">Customer</option>
            <option value="Employee">Employee</option>
          </select>

          <button className="submit-button">Register</button>
        </form>
      </div>

      {/* Right Side - Image */}
      <div className="image-container">
        <img
          src="images/SignUpImage.png"
          alt="Hotel Pool"
          className="login-image"
        />
      </div>
    </div>
  );
};

export default SignUpPage;

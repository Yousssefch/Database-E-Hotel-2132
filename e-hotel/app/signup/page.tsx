'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./SignUpPage.css";

const SignUpPage: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        ssn_sin: '',
        address: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                router.push('/login');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred during registration');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="login-container text-black">
            {/* Left Side - Login Form */}
            <div className="login-form">
                <img src="images/Logo.png" alt="E Hotel Logo" className="logo" />
                <h1 className="welcome-text">Register</h1>
                <p className="subtext">
                    Don't have an account? Register now to enjoy seamless check-ins
                </p>
                <form className="form-container" onSubmit={handleSubmit}>
                    <label className="label">Full Name:</label>
                    <input
                        type="text"
                        name="name"
                        className="input-field"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <label className="label">ID (SSN/SIN):</label>
                    <input
                        type="text"
                        name="ssn_sin"
                        className="input-field"
                        placeholder="Enter your ID"
                        value={formData.ssn_sin}
                        onChange={handleChange}
                        required
                    />
                    <label className="label">Address:</label>
                    <input
                        type="text"
                        name="address"
                        className="input-field"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        required
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

                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                    <button type="submit" className="submit-button">Register</button>
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

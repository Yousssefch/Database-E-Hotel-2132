'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../login/LoginPage.css";

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        ssn_sin: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                router.push('/homepage');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred during login');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                <h1 className="welcome-text">Welcome Back</h1>
                <p className="subtext">
                    The faster you fill up, the faster you'll be able to travel!
                </p>
                <form className="form-container" onSubmit={handleSubmit}>
                    <label className="label text-black">Full Name:</label>
                    <input
                        type="text"
                        name="name"
                        className="input-field"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <label className="label text-black">ID (SSN/SIN):</label>
                    <input
                        type="text"
                        name="ssn_sin"
                        className="input-field"
                        placeholder="Enter your ID"
                        value={formData.ssn_sin}
                        onChange={handleChange}
                        required
                    />
                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                    <button type="submit" className="submit-button">Log in</button>
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

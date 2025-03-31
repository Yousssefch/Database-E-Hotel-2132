'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./SignUpPage.css";

const SignUpPage: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        ssn: '',
        address: '',
        profilePicture: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [debugInfo, setDebugInfo] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setDebugInfo(null);
        setIsLoading(true);

        console.log('Submitting form data:', formData);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries([...response.headers.entries()]));

            // Get raw text first to debug potential issues with JSON parsing
            const responseText = await response.text();
            console.log('Raw response text:', responseText);

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Error parsing response as JSON:', parseError);
                setError(`Server returned invalid JSON. Status: ${response.status}`);
                setDebugInfo({
                    status: response.status,
                    responseText: responseText.substring(0, 500) + (responseText.length > 500 ? '...' : '')
                });
                return;
            }

            if (data.success) {
                router.push('/login');
            } else {
                setError(data.message || 'Registration failed');
                setDebugInfo(data.details || null);
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('An error occurred during registration. Please try again.');
            setDebugInfo(err instanceof Error ? { message: err.message, name: err.name } : String(err));
        } finally {
            setIsLoading(false);
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
                        name="ssn"
                        className="input-field"
                        placeholder="Enter your ID without dashes or spaces"
                        value={formData.ssn}
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
                    
                    <label className="label">Profile Picture URL (optional):</label>
                    <input
                        type="text"
                        name="profilePicture"
                        className="input-field"
                        placeholder="Enter profile picture URL"
                        value={formData.profilePicture}
                        onChange={handleChange}
                    />

                    {error && (
                        <div className="text-red-500 text-sm mt-2">
                            <p>{error}</p>
                            {debugInfo && (
                                <details className="mt-2 text-xs">
                                    <summary>Debug Info</summary>
                                    <pre className="mt-1 p-2 bg-gray-100 rounded overflow-auto max-h-40">
                                        {JSON.stringify(debugInfo, null, 2)}
                                    </pre>
                                </details>
                            )}
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
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

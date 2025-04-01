'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./SignUpPage.css";

const SignUpPage: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        ssn: '',
        address: '',
        profilePicture: '',
        userType: 'client', // Default to client
        hotelId: '' // For employees only
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [debugInfo, setDebugInfo] = useState<any>(null);
    const [hotels, setHotels] = useState<any[]>([]);
    const [isLoadingHotels, setIsLoadingHotels] = useState(false);

    // Fetch hotels for employee registration
    useEffect(() => {
        if (formData.userType === 'employee') {
            fetchHotels();
        }
    }, [formData.userType]);

    const fetchHotels = async () => {
        setIsLoadingHotels(true);
        setError('');
        try {
            const response = await fetch('/api/hotels/signup');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch hotels');
            }
            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error('Invalid response format');
            }
            setHotels(data);
        } catch (err) {
            console.error('Error fetching hotels:', err);
            setError(err instanceof Error ? err.message : 'Failed to load hotels for employee registration');
        } finally {
            setIsLoadingHotels(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setDebugInfo(null);
        setIsLoading(true);

        console.log('Submitting form data:', formData);

        try {
            // Choose endpoint based on user type
            const endpoint = formData.userType === 'client' 
                ? '/api/auth/register' 
                : '/api/employees';

            // Prepare the data based on user type
            const requestData = formData.userType === 'client' 
                ? {
                    name: formData.name,
                    ssn: formData.ssn,
                    address: formData.address,
                    profilePicture: formData.profilePicture
                }
                : {
                    fullName: formData.name,
                    ssn_sin: formData.ssn,
                    address: formData.address,
                    hotelId: parseInt(formData.hotelId),
                    role: 'Staff' // Default role, can be expanded later
                };

            console.log(`Sending request to ${endpoint} with data:`, requestData);

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries([...response.headers.entries()]));

            // Get raw text first to debug potential issues with JSON parsing
            const responseText = await response.text();
            console.log('Raw response text:', responseText);

            let data;
            try {
                data = JSON.parse(responseText);
                console.log('Parsed response data:', data);
            } catch (parseError) {
                console.error('Error parsing response as JSON:', parseError);
                setError(`Server returned invalid JSON. Status: ${response.status}`);
                setDebugInfo({
                    status: response.status,
                    responseText: responseText.substring(0, 500) + (responseText.length > 500 ? '...' : '')
                });
                return;
            }

            if (data.success || response.ok) {
                console.log('Registration successful, redirecting to login');
                router.push('/login');
            } else {
                console.error('Registration failed:', data.message || 'Unknown error');
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
                    <label className="label">Register as:</label>
                    <select
                        name="userType"
                        className="customer-select"
                        value={formData.userType}
                        onChange={handleChange}
                    >
                        <option value="client">Client</option>
                        <option value="employee">Employee</option>
                    </select>

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
                    
                    {formData.userType === 'employee' && (
                        <>
                            <label className="label">Select Hotel:</label>
                            <select
                                name="hotelId"
                                className="customer-select"
                                value={formData.hotelId}
                                onChange={handleChange}
                                required
                                disabled={isLoadingHotels}
                            >
                                <option value="">Select a hotel</option>
                                {hotels.map(hotel => (
                                    <option key={hotel.id} value={hotel.id}>
                                        {hotel.name} - {hotel.address}
                                    </option>
                                ))}
                            </select>
                            {isLoadingHotels && <p className="text-sm text-gray-500">Loading hotels...</p>}
                        </>
                    )}
                    
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
                        disabled={isLoading || (formData.userType === 'employee' && !formData.hotelId)}
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

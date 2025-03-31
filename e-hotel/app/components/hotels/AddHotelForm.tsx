'use client';

import React, { useState, useEffect } from 'react';
import "./AddHotelForm.css";

interface HotelChain {
    id: number;
    name: string;
}

const AddHotelForm: React.FC = () => {
    const [hotelChains, setHotelChains] = useState<HotelChain[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contactEmail: '',
        rating: 5,
        hotelChainId: '',
        phoneNumber: '',
        urlImage: '',
        numberOfRooms: 0
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch hotel chains for dropdown
        const fetchHotelChains = async () => {
            try {
                const response = await fetch('/api/hotel-chains');
                if (!response.ok) {
                    throw new Error('Failed to fetch hotel chains');
                }
                const data = await response.json();
                setHotelChains(data);
            } catch (error) {
                console.error('Error fetching hotel chains:', error);
                setError('Failed to load hotel chains. Please try again later.');
            }
        };

        fetchHotelChains();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            // Validate form data
            if (!formData.name || !formData.address || !formData.contactEmail || 
                !formData.hotelChainId || !formData.phoneNumber || !formData.urlImage) {
                throw new Error('Please fill in all required fields');
            }

            // Convert to correct data types
            const hotelData = {
                ...formData,
                hotelChainId: parseInt(formData.hotelChainId as string),
                rating: parseInt(formData.rating.toString()),
                numberOfRooms: parseInt(formData.numberOfRooms.toString())
            };

            const response = await fetch('/api/hotels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(hotelData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add hotel');
            }

            const result = await response.json();
            setSuccess('Hotel added successfully!');
            
            // Reset form
            setFormData({
                name: '',
                address: '',
                contactEmail: '',
                rating: 5,
                hotelChainId: '',
                phoneNumber: '',
                urlImage: '',
                numberOfRooms: 0
            });
        } catch (error: any) {
            console.error('Error adding hotel:', error);
            setError(error.message || 'Error adding hotel. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="add-hotel-form-container">
            {error && (
                <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            {success && (
                <div className="success-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {success}
                </div>
            )}
            <form onSubmit={handleSubmit} className="add-hotel-form">
                <div className="form-group">
                    <label htmlFor="name">Hotel Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter hotel name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter hotel address"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contactEmail">Contact Email:</label>
                    <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter contact email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating (1-5):</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                        className="form-input"
                        placeholder="Enter hotel rating"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="numberOfRooms">Number of Rooms:</label>
                    <input
                        type="number"
                        id="numberOfRooms"
                        name="numberOfRooms"
                        value={formData.numberOfRooms}
                        onChange={handleChange}
                        min="1"
                        required
                        className="form-input"
                        placeholder="Enter number of rooms"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="hotelChainId">Hotel Chain:</label>
                    <select
                        id="hotelChainId"
                        name="hotelChainId"
                        value={formData.hotelChainId}
                        onChange={handleChange}
                        required
                        className="form-input"
                    >
                        <option value="">Select a hotel chain</option>
                        {hotelChains.map(chain => (
                            <option key={chain.id} value={chain.id}>
                                {chain.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter phone number"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="urlImage">Image URL:</label>
                    <input
                        type="url"
                        id="urlImage"
                        name="urlImage"
                        value={formData.urlImage}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter image URL"
                    />
                </div>

                <button 
                    type="submit" 
                    className="submit-button bg-black text-white px-6 py-2 rounded-lg"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Adding Hotel...' : 'Add Hotel'}
                </button>
            </form>
        </div>
    );
};

export default AddHotelForm; 
'use client';

import React, { useState, useEffect } from 'react';
import "./AddHotelForm.css";

interface HotelChain {
    hotel_chain_id: number;
    hotel_chain_name: string;
}

const AddHotelForm: React.FC = () => {
    const [hotelChains, setHotelChains] = useState<HotelChain[]>([]);
    const [formData, setFormData] = useState({
        hotel_name: '',
        address: '',
        email: '',
        rating_stars: '',
        hotel_chain_id: '',
        phone_number: '',
        image_url: ''
    });

    useEffect(() => {
        // Fetch hotel chains for dropdown
        const fetchHotelChains = async () => {
            try {
                const response = await fetch('/api/hotel-chains');
                const data = await response.json();
                setHotelChains(data);
            } catch (error) {
                console.error('Error fetching hotel chains:', error);
            }
        };

        fetchHotelChains();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/hotels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Hotel added successfully!');
                // Reset form
                setFormData({
                    hotel_name: '',
                    address: '',
                    email: '',
                    rating_stars: '',
                    hotel_chain_id: '',
                    phone_number: '',
                    image_url: ''
                });
            } else {
                alert('Failed to add hotel');
            }
        } catch (error) {
            console.error('Error adding hotel:', error);
            alert('Error adding hotel');
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
        <div className="add-hotel-form-container">
            <form onSubmit={handleSubmit} className="add-hotel-form">
                <div className="form-group">
                    <label htmlFor="hotel_name">Hotel Name:</label>
                    <input
                        type="text"
                        id="hotel_name"
                        name="hotel_name"
                        value={formData.hotel_name}
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
                    <label htmlFor="email">Contact Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter contact email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rating_stars">Rating (1-5):</label>
                    <input
                        type="number"
                        id="rating_stars"
                        name="rating_stars"
                        value={formData.rating_stars}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                        className="form-input"
                        placeholder="Enter hotel rating"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="hotel_chain_id">Hotel Chain:</label>
                    <select
                        id="hotel_chain_id"
                        name="hotel_chain_id"
                        value={formData.hotel_chain_id}
                        onChange={handleChange}
                        required
                        className="form-input"
                    >
                        <option value="">Select a hotel chain</option>
                        {hotelChains.map(chain => (
                            <option key={chain.hotel_chain_id} value={chain.hotel_chain_id}>
                                {chain.hotel_chain_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="phone_number">Phone Number:</label>
                    <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter phone number"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image_url">Image URL:</label>
                    <input
                        type="url"
                        id="image_url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter image URL"
                    />
                </div>

                <button type="submit" className="submit-button">
                    Add Hotel
                </button>
            </form>
        </div>
    );
};

export default AddHotelForm; 
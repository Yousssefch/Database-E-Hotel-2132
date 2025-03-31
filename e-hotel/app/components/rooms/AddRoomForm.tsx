'use client';

import React, { useState, useEffect } from 'react';
import "./AddRoomForm.css";

interface Hotel {
    id: number;
    name: string;
    address: string;
}

const AddRoomForm: React.FC = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [formData, setFormData] = useState({
        hotelId: '',
        name: '',
        price: '',
        amenities: '',
        capacity: '',
        viewType: '',
        extendable: false,
        problems: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch hotels for dropdown
        const fetchHotels = async () => {
            try {
                const response = await fetch('/api/hotels');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch hotels');
                }
                
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
                setError('Failed to load hotels. Please try again later.');
            }
        };

        fetchHotels();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            if (!formData.hotelId || !formData.name || !formData.price || 
                !formData.capacity || !formData.viewType) {
                throw new Error('Please fill in all required fields');
            }
            const roomData = {
                hotelId: parseInt(formData.hotelId as string),
                name: formData.name,
                price: parseFloat(formData.price),
                amenities: formData.amenities || 'None',
                capacity: parseInt(formData.capacity),
                viewType: formData.viewType,
                extendable: formData.extendable,
                problems: formData.problems || null
            };

            const response = await fetch('/api/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add room');
            }

            const result = await response.json();
            setSuccess('Room added successfully!');
            
            setFormData({
                hotelId: '',
                name: '',
                price: '',
                amenities: '',
                capacity: '',
                viewType: '',
                extendable: false,
                problems: ''
            });
        } catch (error: any) {
            console.error('Error adding room:', error);
            setError(error.message || 'Error adding room. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' 
                ? (e.target as HTMLInputElement).checked 
                : value
        }));
    };

    return (
        <div className="add-room-form-container">
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
            <form onSubmit={handleSubmit} className="add-room-form">
                <div className="form-group">
                    <label htmlFor="hotelId">Hotel:</label>
                    <select
                        id="hotelId"
                        name="hotelId"
                        value={formData.hotelId}
                        onChange={handleChange}
                        required
                        className="form-input"
                    >
                        <option value="">Select a hotel</option>
                        {hotels.map(hotel => (
                            <option key={hotel.id} value={hotel.id}>
                                {hotel.name} - {hotel.address}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Room Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter room name (e.g. Deluxe Suite)"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price per Night ($):</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="form-input"
                        placeholder="Enter price per night"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="capacity">Capacity (guests):</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                        min="1"
                        className="form-input"
                        placeholder="Enter room capacity"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amenities">Amenities:</label>
                    <textarea
                        id="amenities"
                        name="amenities"
                        value={formData.amenities}
                        onChange={handleChange}
                        className="form-input textarea"
                        placeholder="Enter amenities (e.g. WiFi, TV, Mini Bar, etc.)"
                        rows={3}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="viewType">View Type:</label>
                    <select
                        id="viewType"
                        name="viewType"
                        value={formData.viewType}
                        onChange={handleChange}
                        required
                        className="form-input"
                    >
                        <option value="">Select view type</option>
                        <option value="Sea View">Sea View</option>
                        <option value="Mountain View">Mountain View</option>
                        <option value="City View">City View</option>
                        <option value="Garden View">Garden View</option>
                        <option value="Pool View">Pool View</option>
                    </select>
                </div>

                <div className="form-group flex items-center">
                    <input
                        type="checkbox"
                        id="extendable"
                        name="extendable"
                        checked={formData.extendable}
                        onChange={handleChange}
                        className="form-checkbox h-5 w-5 text-black mr-2"
                    />
                    <label htmlFor="extendable">Room is extendable (e.g. with additional beds)</label>
                </div>

                <div className="form-group">
                    <label htmlFor="problems">Problems/Damages (if any):</label>
                    <textarea
                        id="problems"
                        name="problems"
                        value={formData.problems}
                        onChange={handleChange}
                        className="form-input textarea"
                        placeholder="Enter any problems or damages (optional)"
                        rows={3}
                    />
                </div>

                <button 
                    type="submit" 
                    className="submit-button bg-black text-white px-6 py-2 rounded-lg"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Adding Room...' : 'Add Room'}
                </button>
            </form>
        </div>
    );
};

export default AddRoomForm; 
'use client';

import React, { useState, useEffect } from 'react';
import "./AddRoomForm.css";

interface Hotel {
    hotel_id: number;
    hotel_name: string;
}

const AddRoomForm: React.FC = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [formData, setFormData] = useState({
        hotel_id: '',
        room_name: '',
        price: '',
        amenities: [] as string[],
        capacity: '',
        type_of_view: '',
        extended_capacity: 'no',
        problems: ''
    });
    const [amenityInput, setAmenityInput] = useState('');

    useEffect(() => {
        // Fetch hotels for dropdown
        const fetchHotels = async () => {
            try {
                const response = await fetch('/api/hotels');
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotels();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    extended_capacity: formData.extended_capacity === 'yes' ? true : false,
                    price: parseFloat(formData.price),
                    capacity: parseInt(formData.capacity)
                }),
            });

            if (response.ok) {
                alert('Room added successfully!');
                // Reset form
                setFormData({
                    hotel_id: '',
                    room_name: '',
                    price: '',
                    amenities: [],
                    capacity: '',
                    type_of_view: '',
                    extended_capacity: 'no',
                    problems: ''
                });
                setAmenityInput('');
            } else {
                alert('Failed to add room');
            }
        } catch (error) {
            console.error('Error adding room:', error);
            alert('Error adding room');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddAmenity = () => {
        if (amenityInput.trim()) {
            setFormData(prev => ({
                ...prev,
                amenities: [...prev.amenities, amenityInput.trim()]
            }));
            setAmenityInput('');
        }
    };

    const handleRemoveAmenity = (index: number) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="add-room-form-container">
            <form onSubmit={handleSubmit} className="add-room-form">
                <div className="form-group">
                    <label htmlFor="hotel_id">Hotel:</label>
                    <select
                        id="hotel_id"
                        name="hotel_id"
                        value={formData.hotel_id}
                        onChange={handleChange}
                        required
                        className="form-input"
                    >
                        <option value="">Select a hotel</option>
                        {hotels.map(hotel => (
                            <option key={hotel.hotel_id} value={hotel.hotel_id}>
                                {hotel.hotel_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="room_name">Room Name:</label>
                    <input
                        type="text"
                        id="room_name"
                        name="room_name"
                        value={formData.room_name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter room name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price per Night:</label>
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
                    <label htmlFor="amenities">Amenities:</label>
                    <div className="amenities-input-group">
                        <input
                            type="text"
                            id="amenities"
                            value={amenityInput}
                            onChange={(e) => setAmenityInput(e.target.value)}
                            className="form-input"
                            placeholder="Enter an amenity"
                        />
                        <button 
                            type="button" 
                            onClick={handleAddAmenity}
                            className="add-amenity-button"
                        >
                            Add
                        </button>
                    </div>
                    <div className="amenities-list">
                        {formData.amenities.map((amenity, index) => (
                            <div key={index} className="amenity-tag">
                                {amenity}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveAmenity(index)}
                                    className="remove-amenity-button"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="capacity">Capacity:</label>
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
                    <label htmlFor="type_of_view">View Type:</label>
                    <select
                        id="type_of_view"
                        name="type_of_view"
                        value={formData.type_of_view}
                        onChange={handleChange}
                        required
                        className="form-input"
                    >
                        <option value="">Select view type</option>
                        <option value="Sea">Sea</option>
                        <option value="Mountain">Mountain</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="extended_capacity">Extendable:</label>
                    <select
                        id="extended_capacity"
                        name="extended_capacity"
                        value={formData.extended_capacity}
                        onChange={handleChange}
                        required
                        className="form-input"
                    >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="problems">Problems/Damages:</label>
                    <textarea
                        id="problems"
                        name="problems"
                        value={formData.problems}
                        onChange={handleChange}
                        className="form-input textarea"
                        placeholder="Enter any problems or damages"
                        rows={4}
                    />
                </div>

                <button type="submit" className="submit-button">
                    Add Room
                </button>
            </form>
        </div>
    );
};

export default AddRoomForm; 
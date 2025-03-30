"use client"
import "./HotelReservation.css";
import { useState } from "react";

export default function HotelReservation({ isClient = true, isBooked = false }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="hotel-reservation-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="hotel-reservation-image-container">
                <img 
                    className="inset-0 h-full w-full object-cover hotel-reservation-image" 
                    src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a" 
                />
                <div className="hotel-reservation-overlay" />
                <h1 className="text-white hotel-overlay-text-title">Paris</h1>
            </div>

            <div className="hotel-reservation-text-container">
                <h1 className="hotel-reservation-text-hotel-name">Hotel of Paris</h1>
                <div className="hotel-reservation-text-from-container">
                    <div>
                        <h1 className="hotel-reservation-text-from-title">From :</h1>
                        <h2 className="hotel-reservation-text-from-subtitle">January 18</h2>
                    </div>
                    <div>
                        <h1 className="hotel-reservation-text-from-title">To:</h1>
                        <h2 className="hotel-reservation-text-from-subtitle">January 19</h2>
                    </div>
                </div>
            </div>

            {isHovered && (
                <div className="hover-overlay">
                    {isBooked ? (
                        <p className="overlay-text">This reservation is booked.</p>
                    ) : isClient ? (
                        <>
                            <p className="overlay-text">Do you want to cancel?</p>
                            <button className="overlay-button cancel">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="overlay-text">Do you want to approve this reservation?</p>
                            <div className="overlay-buttons">
                                <button className="overlay-button approve">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                                    </svg>
                                </button>
                                <button className="overlay-button cancel">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
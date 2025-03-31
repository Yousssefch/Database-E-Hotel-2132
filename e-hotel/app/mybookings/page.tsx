'use client';

import React from "react";
import Navbar from "../components/global/Navbar";
import HotelReservation from "../components/myreservations/HotelReservation";
import "./MyBookings.css"

const MyBookings: React.FC = () => {
    return (
        <div className="my-bookings-container">
            <Navbar />

            <div className="my-bookings-right-container">
                <div className="my-bookings-right-top-container">
                    <h1 className="my-bookings-right-top-title text-black">My Bookings:</h1>
                    <h2 className="my-bookings-right-top-subtitle text-black">Here are your upcoming bookings:</h2>

                    <div className="my-bookings-image-container">
                        <img src="images/myReservations.png" className="my-bookings-right-image" alt="My Reservations" />
                    </div>
                    <div className="my-bookings-right-top-bar" />
                </div>

                <div className="my-bookings-cards-container">
                    <HotelReservation />
                </div>
            </div>
        </div>
    );
};

export default MyBookings; 
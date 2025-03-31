'use client';

import React from "react";
import Navbar from "../components/global/Navbar";
import AddRoomForm from "../components/rooms/AddRoomForm";
import "./AddRoom.css";

const AddRoom: React.FC = () => {
    return (
        <div className="add-room-page-container">
            <Navbar />
            
            <div className="add-room-content">
                <div className="add-room-header">
                    <h1 className="add-room-title text-black">Add New Room</h1>
                    <h2 className="add-room-subtitle text-black">Fill in the details to add a new room to a hotel</h2>
                </div>
                
                <div className="add-room-form-wrapper">
                    <AddRoomForm />
                </div>
            </div>
        </div>
    );
};

export default AddRoom; 
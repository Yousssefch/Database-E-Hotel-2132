import React from "react";
import Navbar from "../components/global/Navbar";
import AddHotelForm from "../components/hotels/AddHotelForm";
import "./AddHotel.css";

const AddHotel: React.FC = () => {
    return (
        <div className="add-hotel-page-container">
            <Navbar />
            
            <div className="add-hotel-content">
                <div className="add-hotel-header">
                    <h1 className="add-hotel-title text-black">Add New Hotel</h1>
                    <h2 className="add-hotel-subtitle text-black">Fill in the details to add a new hotel to our system</h2>
                </div>
                
                <div className="add-hotel-form-wrapper">
                    <AddHotelForm />
                </div>
            </div>
        </div>
    );
};

export default AddHotel; 
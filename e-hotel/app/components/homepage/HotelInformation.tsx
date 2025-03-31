"use client"
import { useState } from "react";
import { CalendarIcon, X } from "lucide-react";
import "./HotelInformation.css"

interface Hotel {
  id: number;
  name: string;
  address: string;
  rating: number;
  urlImage: string;
  phoneNumber: string;
  contactEmail: string;
  hotelChain?: {
    name: string;
  };
  rooms?: any[];
}

interface HotelInformationProps {
  isOpen: boolean;
  hotel?: Hotel | null;
  onClose: () => void;
}

export default function HotelInformation({ isOpen, hotel, onClose }: HotelInformationProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!isOpen || !hotel) return null;

  // Calculate the average room price
  const averagePrice = hotel.rooms && hotel.rooms.length > 0
    ? hotel.rooms.reduce((sum, room) => sum + (room.price || 0), 0) / hotel.rooms.length
    : 'N/A';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
     <div className="hotel-information-overlay" />
      <div className="bg-white rounded-2xl shadow-lg w-3/4 h-auto max-h-[80vh] p-6 relative overflow-auto">
        <div className="flex flex-col md:flex-row">
          {/* Hotel Image */}
          <div className="w-full md:w-1/3">
            <img
              src={hotel.urlImage || "https://images.unsplash.com/photo-1499856871958-5b9627545d1a"}
              alt={hotel.name}
              className="rounded-lg w-full h-64 md:h-full object-cover"
            />
          </div>

          {/* Hotel Details */}
          <div className="w-full md:w-2/3 pl-0 md:pl-6 mt-4 md:mt-0 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-black">{hotel.name}</h2>
              <p className="text-black">{hotel.address}</p>
              {hotel.hotelChain && (
                <p className="text-black">Hotel Chain: {hotel.hotelChain.name}</p>
              )}
              <div className="flex items-center mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill text-yellow-500" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <span className="ml-1 text-black">{hotel.rating}.0</span>
              </div>
            </div>

            {/* Date Selection */}
            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-2 text-black">
                <CalendarIcon className="w-5 h-5 text-black" /> Start Date
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </label>
              <label className="flex items-center gap-2 text-black">
                <CalendarIcon className="w-5 h-5 text-black" /> End Date
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </label>
            </div>

            {/* Additional Information */}
            <div className="text-black mt-4">
                <h1 className="hotel-information-add-info">Additional Information:</h1>

                <div className="flex">
                  <label className="text-xs font-semibold">Address:</label>
                  <h1 className="text-xs ml-1 font-light">{hotel.address}</h1>
                </div>

                <div className="flex">
                  <label className="text-xs font-semibold">Phone number:</label>
                  <h1 className="text-xs ml-1 font-light">{hotel.phoneNumber}</h1>
                </div>

                <div className="flex">
                  <label className="text-xs font-semibold">Email:</label>
                  <h1 className="text-xs ml-1 font-light">{hotel.contactEmail}</h1>
                </div>

                <div className="flex">
                  <label className="text-xs font-semibold">Average room price:</label>
                  <h1 className="text-xs ml-1 font-light">${typeof averagePrice === 'number' ? averagePrice.toFixed(2) : averagePrice}</h1>
                </div>

                <div className="flex">
                  <label className="text-xs font-semibold">Available rooms:</label>
                  <h1 className="text-xs ml-1 font-light">{hotel.rooms?.length || 0}</h1>
                </div>
            </div>

            {/* Reserve Button */}
            <div className="flex justify-end mt-4">
              <button className="bg-black text-white px-6 py-2 rounded-lg">
                Reserve Now
              </button>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-800 hover:text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
"use client"
import { useState } from "react";
import { CalendarIcon, X } from "lucide-react";
import "./HotelInformation.css"

interface HotelInformationProps {
  isOpen: boolean;
}

export default function HotelInformation({ isOpen }: HotelInformationProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-80">
     <div className="hotel-information-overlay" />
      <div className="bg-white rounded-2xl shadow-lg w-3/4 h-1/2 p-6 relative">
        <div className="flex">
          {/* Hotel Image */}
          <div className="w-1/3">
            <img
              src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
              alt="Hotel of Paris"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>

          {/* Hotel Details */}
          <div className="w-2/3 pl-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-black">Hotel of Paris</h2>
              <p className="text-gray-600">Paris, France</p>
            </div>

            {/* Date Selection */}
            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-2 text-black">
                <CalendarIcon className="w-5 h-5 text-black"  /> Start Date
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </label>
              <label className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" /> End Date
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </label>
            </div>

            {/* Additional Informations */}
            <div className="text-black">
                <h1 className="hotel-information-add-info">Additional Information :</h1>

                <div className="flex">
                  <label className="text-xs font-semibold">Address:</label>
                  <h1 className="text-xs ml-1 font-light">Text</h1>
                </div>

                <div className="flex">
                  <label className="text-xs font-semibold">Phone number:</label>
                  <h1 className="text-xs ml-1 font-light">Text</h1>
                </div>

                <div className="flex">
                  <label className="text-xs font-semibold">Price:</label>
                  <h1 className="text-xs ml-1 font-light">Text</h1>
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
        <div className="absolute top-0 right-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
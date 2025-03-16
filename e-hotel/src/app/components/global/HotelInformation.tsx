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
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 relative">
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
              <h2 className="text-2xl font-bold">Hotel of Paris</h2>
              <p className="text-gray-600">Paris, France</p>
            </div>

            {/* Date Selection */}
            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" /> Start Date
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

            {/* Reserve Button */}
            <div className="flex justify-end mt-4">
              <button className="bg-black text-white px-6 py-2 rounded-lg">
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

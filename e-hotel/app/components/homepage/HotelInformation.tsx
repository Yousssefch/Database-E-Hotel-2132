"use client"
import { useState } from "react";
import { CalendarIcon, X } from "lucide-react";
import "./HotelInformation.css"
import { useRouter } from "next/navigation";

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
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  if (!isOpen || !hotel) return null;

  // Calculate the average room price
  const averagePrice = hotel.rooms && hotel.rooms.length > 0
    ? hotel.rooms.reduce((sum, room) => sum + (room.price || 0), 0) / hotel.rooms.length
    : 'N/A';

  // Calculate number of nights and total price
  const calculateTotalPrice = () => {
    if (!startDate || !endDate || !selectedRoom) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays * selectedRoom.price;
  };
  
  const totalPrice = calculateTotalPrice();
  
  // Handle reserve button click
  const handleReserve = async () => {
    if (!startDate || !endDate || !selectedRoom) {
      setError("Please select dates and a room");
      return;
    }
    
    // Validate dates
    const checkIn = new Date(startDate);
    const checkOut = new Date(endDate);
    const today = new Date();
    
    if (checkIn < today) {
      setError("Check-in date cannot be in the past");
      return;
    }
    
    if (checkOut <= checkIn) {
      setError("Check-out date must be after check-in date");
      return;
    }
    
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      // First check if user is authenticated
      const authResponse = await fetch('/api/auth/check-auth');
      const authData = await authResponse.json();
      
      if (!authData.authenticated) {
        setError("Please log in to make a reservation");
        setIsLoading(false);
        return;
      }
      
      // Create booking
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerSsnSin: authData.user.ssn_sin,
          roomId: selectedRoom.id,
          bookingDate: new Date().toISOString(),
          checkInDate: checkIn.toISOString(),
          checkOutDate: checkOut.toISOString(),
          status: "confirmed"
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create reservation");
      }
      
      const bookingData = await response.json();
      setSuccess("Reservation successful! Redirecting to your reservations...");
      
      // Redirect to reservations page after 2 seconds
      setTimeout(() => {
        router.push('/myreservations');
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || "An error occurred while creating your reservation");
      console.error("Reservation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
     <div className="hotel-information-overlay" />
      <div className="bg-white rounded-2xl shadow-lg w-3/4 h-auto max-h-[80vh] p-6 relative overflow-auto">
        {/* Show error message if any */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {/* Show success message if any */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        
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
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </label>
              <label className="flex items-center gap-2 text-black">
                <CalendarIcon className="w-5 h-5 text-black" /> End Date
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border rounded-lg px-3 py-2 w-full"
                  min={startDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </label>
            </div>

            {/* Room Selection */}
            <div className="mt-4">
              <h3 className="font-semibold text-black mb-2">Select a Room</h3>
              {hotel.rooms && hotel.rooms.length > 0 ? (
                <div className="bg-gray-50 rounded-lg p-3 max-h-48 overflow-y-auto">
                  {hotel.rooms.map(room => (
                    <div 
                      key={room.id} 
                      className={`flex justify-between items-center p-2 mb-2 rounded-lg cursor-pointer ${selectedRoom?.id === room.id ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                      onClick={() => setSelectedRoom(room)}
                    >
                      <div>
                        <p className="font-medium text-black">{room.name}</p>
                        <p className="text-xs text-gray-600">{room.capacity} Guests • {room.viewType}</p>
                        <p className="text-xs text-gray-600">{room.amenities}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-black">${room.price.toFixed(2)}/night</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-2 text-gray-500">No rooms available</p>
              )}
            </div>

            {/* Reservation Summary */}
            {selectedRoom && startDate && endDate && (
              <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                <h3 className="font-semibold text-black mb-2">Reservation Summary</h3>
                <div className="flex justify-between text-sm mb-1">
                  <span>Room:</span>
                  <span>{selectedRoom.name}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Check-in:</span>
                  <span>{new Date(startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Check-out:</span>
                  <span>{new Date(endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-1 font-semibold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            )}

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
              <button 
                className={`px-6 py-2 rounded-lg ${
                  isLoading 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : selectedRoom && startDate && endDate
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={isLoading || !selectedRoom || !startDate || !endDate}
                onClick={handleReserve}
              >
                {isLoading ? 'Processing...' : selectedRoom ? `Reserve for $${totalPrice.toFixed(2)}` : 'Select dates and room'}
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
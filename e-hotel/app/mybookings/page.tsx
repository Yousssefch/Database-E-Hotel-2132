"use client"
import { useState, useEffect } from "react";
import Navbar from "../components/global/Navbar";
import "./MyBookings.css";

interface Hotel {
  id: number;
  name: string;
  address: string;
  urlImage: string;
}

interface Room {
  id: number;
  hotelId: number;
  name: string;
  price: number;
  hotel?: Hotel;
}

interface Employee {
  id: number;
  fullName: string;
  role: string;
}

interface Customer {
  ssn_sin: string;
  fullName: string;
  address: string;
  registrationDate: string;
  profilePictureURL: string;
}

interface Renting {
  id: number;
  bookingId?: number;
  customerSsnSin: string;
  roomId: number;
  employeeId: number;
  checkInDate: string;
  checkOutDate: string;
  room?: Room;
  employee?: Employee;
  customer?: Customer;
}

const MyBookings: React.FC = () => {
  const [rentings, setRentings] = useState<Renting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRentings = async () => {
      try {
        // First check authentication
        const authResponse = await fetch('/api/auth/check-auth');
        const authData = await authResponse.json();
        
        if (!authData.authenticated) {
          setError("Please log in to view your bookings");
          setIsLoading(false);
          return;
        }
        
        // Fetch all rentings
        const response = await fetch('/api/rentings');
        
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        
        const result = await response.json();
        
        // Check if the API returned an error
        if (result.error) {
          throw new Error(result.error);
        }
        
        // Filter rentings by the logged-in user
        const userSsnSin = authData.user.ssn_sin;
        const userRentings = result.filter((renting: Renting) => 
          renting.customerSsnSin === userSsnSin
        );
        
        console.log("User bookings:", userRentings);
        setRentings(userRentings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load your bookings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRentings();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="my-bookings-container">
      <Navbar />

      <div className="my-bookings-content">
        <div className="my-bookings-header">
          <h1 className="my-bookings-title text-black">My Bookings</h1>
          <h2 className="my-bookings-subtitle text-black">Here are your confirmed bookings:</h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">
            {error}
          </div>
        ) : rentings.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">You don't have any confirmed bookings yet.</p>
            <a href="/" className="inline-block mt-4 px-6 py-2 bg-black text-white rounded-lg">
              Book a hotel now
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {rentings.map(renting => (
              <div key={renting.id} className="booking-card bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative">
                  <img 
                    src={renting.room?.hotel?.urlImage || "https://images.unsplash.com/photo-1499856871958-5b9627545d1a"} 
                    alt={renting.room?.hotel?.name || "Hotel"} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{renting.room?.hotel?.name || "Hotel"}</h3>
                    <p className="text-sm">{renting.room?.hotel?.address || "Address"}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Confirmed</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900">Room Details</h4>
                    <p className="text-gray-600">{renting.room?.name} - ${renting.room?.price?.toFixed(2) || "0.00"}/night</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900">Stay Dates</h4>
                    <div className="flex justify-between text-gray-600">
                      <span>Check-in: {formatDate(renting.checkInDate)}</span>
                      <span>Check-out: {formatDate(renting.checkOutDate)}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900">Employee Assigned</h4>
                    <p className="text-gray-600">{renting.employee?.fullName} - {renting.employee?.role}</p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900">Booking ID: {renting.bookingId || 'Direct Renting'}</h4>
                    <p className="text-xs text-gray-500 mt-1">Rental ID: {renting.id}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings; 
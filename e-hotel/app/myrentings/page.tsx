"use client"
import { useState, useEffect } from "react";
import Navbar from "../components/global/Navbar";
import RentingCard from "../components/myrentings/RentingCard";
import "./MyRentings.css";

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

const MyRentings: React.FC = () => {
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
          setError("Please log in to view your rentings");
          setIsLoading(false);
          return;
        }
        
        // Fetch all rentings
        const response = await fetch('/api/rentings');
        
        if (!response.ok) {
          throw new Error("Failed to fetch rentings");
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
        
        console.log("User rentings:", userRentings);
        setRentings(userRentings);
      } catch (error) {
        console.error("Error fetching rentings:", error);
        setError("Failed to load your rentings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRentings();
  }, []);

  return (
    <div className="my-rentings-container">
      <Navbar />

      <div className="my-rentings-right-container">
        <div className="my-rentings-right-top-container">
          <h1 className="my-rentings-right-top-title text-black">My Rentings:</h1>
          <h2 className="my-rentings-right-top-subtitle text-black">Here are your active rentings:</h2>

          <div className="my-rentings-image-container">
            <img src="images/reservationImage.png" className="my-rentings-right-image" />
          </div>
          <div className="my-rentings-right-top-bar" />
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
            <p className="text-xl text-gray-600">You don't have any active rentings yet.</p>
            <a href="/" className="inline-block mt-4 px-6 py-2 bg-black text-white rounded-lg">
              Book a hotel now
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            {rentings.map((renting) => (
              <RentingCard
                key={renting.id}
                renting={renting}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRentings; 
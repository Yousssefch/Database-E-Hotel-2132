"use client"
import { useState, useEffect } from "react";
import Navbar from "../components/global/Navbar";
import HotelReservation from "../components/myreservations/HotelReservation";
import "./MyReservations.css"

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

interface Booking {
  id: number;
  customerSsnSin: string;
  roomId: number;
  bookingDate: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  room?: Room;
}

const MyReservations: React.FC = () =>{
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // First check authentication
                const authResponse = await fetch('/api/auth/check-auth');
                const authData = await authResponse.json();
                
                if (!authData.authenticated) {
                    setError("Please log in to view your reservations");
                    setIsLoading(false);
                    return;
                }
                
                // Fetch user's bookings
                const response = await fetch('/api/bookings');
                
                if (!response.ok) {
                    throw new Error("Failed to fetch bookings");
                }
                
                const allBookings = await response.json();
                
                // Filter bookings by the logged-in user
                const userSsnSin = authData.user.ssn_sin;
                const userBookings = allBookings.filter((booking: Booking) => 
                    booking.customerSsnSin === userSsnSin
                );
                
                console.log("User bookings:", userBookings);
                setBookings(userBookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setError("Failed to load your reservations");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return(
        <div className="my-reservations-container">
            <Navbar />

            <div className="my-reservations-right-container">
                <div className="my-reservations-right-top-container">
                    <h1 className="my-reservations-right-top-title text-black">My Reservations:</h1>
                    <h2 className="my-reservations-right-top-subtitle text-black">Here are your upcoming reservations:</h2>

                    <div className="my-reservations-image-container">
                        <img src="images/reservationImage.png" className="my-reservations-right-image" />
                    </div>
                    <div className="my-reservations-right-top-bar" />
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">
                        {error}
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-xl text-gray-600">You don't have any reservations yet.</p>
                        <a href="/" className="inline-block mt-4 px-6 py-2 bg-black text-white rounded-lg">
                            Book a hotel now
                        </a>
                    </div>
                ) : (
                    <div className="my-reservations-cards-container">
                        {bookings.map((booking) => (
                            <HotelReservation 
                                key={booking.id}
                                booking={booking}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default MyReservations;
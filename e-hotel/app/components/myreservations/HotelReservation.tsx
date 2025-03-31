"use client"
import "./HotelReservation.css";
import { useState, useEffect } from "react";

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

interface HotelReservationProps {
  booking: Booking;
  isClient?: boolean;
}

export default function HotelReservation({ booking, isClient = true }: HotelReservationProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [hotelDetails, setHotelDetails] = useState<Hotel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCanceling, setIsCanceling] = useState(false);
    const [error, setError] = useState("");

    const isBooked = booking.status === "confirmed";
    const checkInDate = new Date(booking.checkInDate);
    const checkOutDate = new Date(booking.checkOutDate);

    // Format dates to display
    const formatDate = (date: Date) => {
      const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };

    // Fetch hotel details for the room
    useEffect(() => {
      const fetchRoomWithHotel = async () => {
        try {
          if (!booking.room) {
            // If the room is not included in the booking, fetch it
            const roomResponse = await fetch(`/api/rooms/${booking.roomId}`);
            if (!roomResponse.ok) {
              throw new Error('Failed to fetch room details');
            }
            const roomData = await roomResponse.json();
            
            // Now fetch the hotel details
            const hotelResponse = await fetch(`/api/hotels/${roomData.hotelId}`);
            if (!hotelResponse.ok) {
              throw new Error('Failed to fetch hotel details');
            }
            const hotelData = await hotelResponse.json();
            setHotelDetails(hotelData);
          } else if (booking.room.hotel) {
            // If hotel is already included in the room data
            setHotelDetails(booking.room.hotel);
          } else {
            // If only room is included but not hotel
            const hotelResponse = await fetch(`/api/hotels/${booking.room.hotelId}`);
            if (!hotelResponse.ok) {
              throw new Error('Failed to fetch hotel details');
            }
            const hotelData = await hotelResponse.json();
            setHotelDetails(hotelData);
          }
        } catch (error) {
          console.error('Error fetching details:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchRoomWithHotel();
    }, [booking]);

    const handleCancelBooking = async () => {
      if (confirm('Are you sure you want to cancel this reservation?')) {
        setIsCanceling(true);
        try {
          // Update booking status to 'cancelled'
          const response = await fetch(`/api/bookings/${booking.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              status: 'cancelled'
            })
          });

          if (!response.ok) {
            throw new Error('Failed to cancel reservation');
          }

          // Refresh the page to show updated status
          window.location.reload();
        } catch (error) {
          console.error('Error cancelling booking:', error);
          setError('Failed to cancel reservation. Please try again.');
        } finally {
          setIsCanceling(false);
        }
      }
    };

    if (isLoading) {
      return (
        <div className="hotel-reservation-container animate-pulse">
          <div className="h-full w-full bg-gray-300"></div>
        </div>
      );
    }

    return (
        <div 
            className="hotel-reservation-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="hotel-reservation-image-container">
                <img 
                    className="inset-0 h-full w-full object-cover hotel-reservation-image" 
                    src={hotelDetails?.urlImage || "https://images.unsplash.com/photo-1499856871958-5b9627545d1a"} 
                    alt={hotelDetails?.name || "Hotel image"}
                />
                <div className="hotel-reservation-overlay" />
                <h1 className="text-white hotel-overlay-text-title">
                  {hotelDetails?.address.split(',').pop()?.trim() || "Location"}
                </h1>
            </div>

            <div className="hotel-reservation-text-container">
                <h1 className="hotel-reservation-text-hotel-name">{hotelDetails?.name || "Hotel"}</h1>
                <div className="hotel-reservation-text-from-container">
                    <div>
                        <h1 className="hotel-reservation-text-from-title">From:</h1>
                        <h2 className="hotel-reservation-text-from-subtitle">{formatDate(checkInDate)}</h2>
                    </div>
                    <div>
                        <h1 className="hotel-reservation-text-from-title">To:</h1>
                        <h2 className="hotel-reservation-text-from-subtitle">{formatDate(checkOutDate)}</h2>
                    </div>
                </div>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : booking.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
            </div>

            {isHovered && booking.status !== 'cancelled' && (
                <div className="hover-overlay">
                    {isBooked ? (
                        <>
                            <p className="overlay-text">Do you want to cancel?</p>
                            <button 
                              className="overlay-button cancel"
                              onClick={handleCancelBooking}
                              disabled={isCanceling}
                            >
                                {isCanceling ? (
                                  <div className="animate-spin h-4 w-4 border-2 border-white rounded-full"></div>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                  </svg>
                                )}
                            </button>
                        </>
                    ) : (
                        <p className="overlay-text">Waiting for confirmation...</p>
                    )}
                </div>
            )}
            
            {error && (
              <div className="absolute bottom-0 left-0 right-0 bg-red-100 text-red-700 text-xs p-1 text-center">
                {error}
              </div>
            )}
        </div>
    );
}
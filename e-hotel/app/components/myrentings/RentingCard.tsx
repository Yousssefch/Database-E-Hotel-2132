"use client"
import "./RentingCard.css";
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

interface RentingCardProps {
  renting: Renting;
}

export default function RentingCard({ renting }: RentingCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [hotelDetails, setHotelDetails] = useState<Hotel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const checkInDate = new Date(renting.checkInDate);
    const checkOutDate = new Date(renting.checkOutDate);

    // Format dates to display
    const formatDate = (date: Date) => {
      const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };

    // Fetch hotel details for the room
    useEffect(() => {
      const fetchRoomWithHotel = async () => {
        try {
          if (!renting.room) {
            // If the room is not included in the renting, fetch it
            const roomResponse = await fetch(`/api/rooms/${renting.roomId}`);
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
          } else if (renting.room.hotel) {
            // If hotel is already included in the room data
            setHotelDetails(renting.room.hotel);
          } else {
            // If only room is included but not hotel
            const hotelResponse = await fetch(`/api/hotels/${renting.room.hotelId}`);
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
    }, [renting]);

    if (isLoading) {
      return (
        <div className="renting-card-container animate-pulse">
          <div className="h-full w-full bg-gray-300"></div>
        </div>
      );
    }

    return (
        <div 
            className="renting-card-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="renting-card-image-container">
                <img 
                    className="inset-0 h-full w-full object-cover renting-card-image" 
                    src={hotelDetails?.urlImage || "https://images.unsplash.com/photo-1499856871958-5b9627545d1a"} 
                    alt={hotelDetails?.name || "Hotel image"}
                />
                <div className="renting-card-overlay" />
                <h1 className="text-white renting-overlay-text-title">
                  {hotelDetails?.address.split(',').pop()?.trim() || "Location"}
                </h1>
                
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
            </div>

            <div className="renting-card-text-container">
                <h1 className="renting-card-text-hotel-name">{hotelDetails?.name || "Hotel"}</h1>
                <p className="renting-card-text-room-type">{renting.room?.name || "Room"}</p>
                
                <div className="renting-card-text-from-container">
                    <div>
                        <h1 className="renting-card-text-from-title">From:</h1>
                        <h2 className="renting-card-text-from-subtitle">{formatDate(checkInDate)}</h2>
                    </div>
                    <div>
                        <h1 className="renting-card-text-from-title">To:</h1>
                        <h2 className="renting-card-text-from-subtitle">{formatDate(checkOutDate)}</h2>
                    </div>
                </div>

                {renting.room?.price && (
                    <p className="text-xs font-semibold text-green-700 mt-1">
                        ${renting.room.price.toFixed(2)} per night
                    </p>
                )}
                
                {renting.employee && (
                    <p className="renting-card-text-employee">
                        Employee: {renting.employee.fullName} ({renting.employee.role})
                    </p>
                )}
                
                {renting.bookingId && (
                    <div className="mt-2">
                        <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                            From Reservation #{renting.bookingId}
                        </span>
                    </div>
                )}
                
                {!renting.bookingId && (
                    <div className="mt-2">
                        <span className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-800">
                            Direct Renting
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
} 
import { useState } from "react";
import "./HotelCard.css"

interface Room {
  id: number;
  name: string;
  price: number;
  capacity: number;
  amenities: string;
  viewType: string;
}

interface Hotel {
  id: number;
  name: string;
  address: string;
  rating: number;
  urlImage: string;
  rooms?: Room[];
}

interface HotelCardProps {
  hotel: Hotel;
  onClick?: () => void;
}

export default function HotelCard({ hotel, onClick }: HotelCardProps) {
    const [showRooms, setShowRooms] = useState(false);
    
    // Find the cheapest room price to display
    const cheapestRoom = hotel.rooms && hotel.rooms.length > 0 
        ? hotel.rooms.reduce((min, room) => room.price < min.price ? room : min, hotel.rooms[0]) 
        : null;
    
    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('.room-dropdown-container') || 
            (e.target as HTMLElement).closest('button')) {
            // Don't propagate if clicking the dropdown or button
            e.stopPropagation();
        } else {
            // Handle the card click
            onClick && onClick();
        }
    };
    
    const toggleRoomDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowRooms(!showRooms);
    };

    return(
        <div onClick={handleCardClick} className="cursor-pointer relative">
            <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-4 pb-4 pt-20 w-70 mt-10">
                <img 
                  src={hotel.urlImage || "https://images.unsplash.com/photo-1499856871958-5b9627545d1a"} 
                  alt={hotel.name} 
                  className="absolute inset-0 h-full w-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                
                {/* Price Tag in Top Right */}
                {cheapestRoom && (
                    <div className="price-tag">
                        ${cheapestRoom.price.toFixed(2)}
                    </div>
                )}
                
                <h3 className="z-10 mt-3 text-1xl font-bold text-white">{hotel.name}</h3>
                <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">{hotel.address}</div>

                {/* Rating */}
                <div className="hotelcard-rating-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="white" className="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>

                    <h1 className="hotelcard-rating-text">{hotel.rating}.0</h1>
                </div>
                
                {/* View Rooms Button */}
                <button 
                    onClick={toggleRoomDropdown}
                    className="z-10 mt-3 bg-white text-black py-1 px-3 text-sm rounded hover:bg-gray-100 transition"
                >
                    {showRooms ? 'Hide Rooms' : 'View Rooms'}
                </button>
            </article>
            
            {/* Room Dropdown */}
            {showRooms && (
                <div className="room-dropdown-container absolute left-0 right-0 bg-white shadow-lg rounded-b-lg p-3 z-30 text-black">
                    {hotel.rooms && hotel.rooms.length > 0 ? (
                        <div>
                            <h4 className="font-semibold mb-2 border-b pb-1">Available Rooms</h4>
                            <ul className="space-y-2">
                                {hotel.rooms.map(room => (
                                    <li key={room.id} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded">
                                        <div>
                                            <p className="font-medium">{room.name}</p>
                                            <p className="text-xs text-gray-600">{room.capacity} Guests • {room.viewType}</p>
                                            <p className="text-xs text-gray-600">{room.amenities}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">${room.price.toFixed(2)}</p>
                                            <button className="text-xs bg-black text-white px-2 py-1 rounded mt-1">Select</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-center py-2">No rooms available</p>
                    )}
                </div>
            )}
        </div>
    )
}
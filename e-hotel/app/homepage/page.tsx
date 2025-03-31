'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Homepage.css"
import Navbar from "@/app/components/global/Navbar"
import HotelCard from "../components/homepage/HotelCard";
import HotelInformation from "../components/homepage/HotelInformation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface User {
    name: string;
    ssn_sin: string;
    address: string;
    date_of_registration?: string;
    role?: string;
    hotelId?: number;
    hotelName?: string;
    id?: number;
}

interface Hotel {
    id: number;
    name: string;
    address: string;
    rating: number;
    urlImage: string;
    phoneNumber: string;
    contactEmail: string;
    hotelChainId: number;
    hotelChain?: {
        name: string;
    };
    rooms?: any[];
    employees?: any[];
    numberOfRooms: number;
    latitude?: number;
    longitude?: number;
}

interface HotelChain {
    id: number;
    name: string;
}

const Homepage: React.FC = () =>  {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isHotelsLoading, setIsHotelsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
    const [showHotelInfo, setShowHotelInfo] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [userType, setUserType] = useState<string>('');
    const [locationSearch, setLocationSearch] = useState('');
    const [searchRadius, setSearchRadius] = useState(50); // Default 50km radius
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [searchLocation, setSearchLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedChain, setSelectedChain] = useState<string>('all');
    const [minCapacity, setMinCapacity] = useState<number | undefined>(undefined);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [minRating, setMinRating] = useState<number | undefined>(undefined);
    const [maxRating, setMaxRating] = useState<number | undefined>(undefined);
    const [hotelChains, setHotelChains] = useState<HotelChain[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const hotelsPerPage = 9;

    // Function to calculate distance between two points using Haversine formula
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    };

    // Function to geocode an address
    const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
                {
                    headers: {
                        'User-Agent': 'E-Hotel/1.0' // Required by Nominatim's terms of service
                    }
                }
            );
            
            if (!response.ok) {
                throw new Error('Geocoding failed');
            }
            
            const data = await response.json();
            if (data && data[0]) {
                return {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon)
                };
            }
            return null;
        } catch (error) {
            console.error('Geocoding error:', error);
            return null;
        }
    };

    // Function to get user's location
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setError('Could not get your location. Please enter a location manually.');
                }
            );
        } else {
            setError('Geolocation is not supported by your browser');
        }
    };

    // Function to handle location search input
    const handleLocationSearch = async (address: string) => {
        setLocationSearch(address);
        if (address.trim()) {
            try {
                const coordinates = await geocodeAddress(address);
                if (coordinates) {
                    setSearchLocation(coordinates);
                } else {
                    setError('Could not find the specified location. Please try a different address.');
                }
            } catch (error) {
                console.error('Error geocoding location:', error);
                setError('Error finding location. Please try again.');
            }
        } else {
            setSearchLocation(null);
        }
    };

    // Modified filter hotels function to include distance-based filtering
    const filteredHotels = hotels.filter(hotel => {
        // Use case-insensitive search for hotel name and address
        const matchesSearch = searchTerm === '' || 
                            hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            hotel.address.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Location-based filtering
        let matchesLocation = true;
        if ((locationSearch && searchLocation) || userLocation) {
            const searchCoords = searchLocation || userLocation;
            if (searchCoords && hotel.latitude && hotel.longitude) {
                const distance = calculateDistance(
                    searchCoords.lat,
                    searchCoords.lng,
                    hotel.latitude,
                    hotel.longitude
                );
                matchesLocation = distance <= searchRadius;
            }
        }
        
        // New filters
        const matchesChain = selectedChain === 'all' || hotel.hotelChain?.name === selectedChain;
        
        let matchesCapacity = true;
        if (minCapacity && hotel.rooms && hotel.rooms.length > 0) {
            const maxRoomCapacity = Math.max(...hotel.rooms.map(room => room.capacity));
            matchesCapacity = maxRoomCapacity >= minCapacity;
        }

        let matchesRating = true;
        if (minRating && minRating > 0) {
            matchesRating = hotel.rating >= minRating;
        }
        if (maxRating && maxRating > 0 && matchesRating) {
            matchesRating = hotel.rating <= maxRating;
        }

        let matchesAmenities = true;
        if (selectedAmenities.length > 0 && hotel.rooms && hotel.rooms.length > 0) {
            matchesAmenities = hotel.rooms.some(room => 
                selectedAmenities.every(amenity => 
                    room.amenities.toLowerCase().includes(amenity.toLowerCase())
                )
            );
        }
        
        return matchesSearch && matchesLocation && 
               matchesChain && matchesCapacity && matchesRating && matchesAmenities;
    });

    // Modified fetchHotels function to include pagination
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                setIsHotelsLoading(true);
                
                // Build query parameters
                const params = new URLSearchParams();
                
                if (selectedChain !== 'all') {
                    params.append('chain', selectedChain);
                }
                
                if (minCapacity) {
                    params.append('minCapacity', minCapacity.toString());
                }
                
                if (selectedAmenities.length > 0) {
                    params.append('amenities', selectedAmenities.join(','));
                }
                
                if (minRating) {
                    params.append('minRating', minRating.toString());
                }
                
                if (maxRating) {
                    params.append('maxRating', maxRating.toString());
                }

                // Add pagination parameters
                params.append('page', currentPage.toString());
                params.append('limit', hotelsPerPage.toString());
                
                // Fetch hotels with filters and pagination
                const response = await fetch(`/api/hotels/filter?${params.toString()}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch hotels');
                }
                
                const data = await response.json();
                setHotels(data.hotels);
                setTotalPages(Math.ceil(data.total / hotelsPerPage));
            } catch (error) {
                console.error('Error fetching hotels:', error);
                setError('Failed to load hotels. Please try again later.');
            } finally {
                setIsHotelsLoading(false);
            }
        };

        fetchHotels();
    }, [selectedChain, minCapacity, selectedAmenities, minRating, maxRating, currentPage]);

    // Check authentication
    useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log('Checking authentication...');
                setIsLoading(true);
                
                const response = await fetch('/api/auth/check-auth', {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                console.log('Auth check response status:', response.status);
                
                if (!response.ok) {
                    console.error('Authentication failed with status:', response.status);
                    throw new Error('Authentication failed');
                }
                
                const data = await response.json();
                console.log('Auth check response data:', data);
                
                if (!data.authenticated) {
                    console.error('Not authenticated according to response');
                    router.push('/login');
                    return;
                }
                
                setUser(data.user);
                setUserType(data.userType || 'client');
            } catch (error) {
                console.error('Auth check failed:', error);
                setError('Authentication failed. Please login again.');
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    // Add this new useEffect to fetch hotel chains
    useEffect(() => {
        const fetchHotelChains = async () => {
            try {
                const response = await fetch('/api/hotel-chains');
                if (!response.ok) {
                    throw new Error('Failed to fetch hotel chains');
                }
                const data = await response.json();
                setHotelChains(data);
            } catch (error) {
                console.error('Error fetching hotel chains:', error);
                setError('Failed to load hotel chains. Please try again later.');
            }
        };

        fetchHotelChains();
    }, []);

    const handleHotelClick = (hotel: Hotel) => {
        setSelectedHotel(hotel);
        setShowHotelInfo(true);
    };

    const closeHotelInfo = () => {
        setShowHotelInfo(false);
    };

    // Test data for debugging
    const testHotels: Hotel[] = [
        {
            id: 1,
            name: "Grand Hotel Test",
            address: "123 Main St, New York",
            rating: 4,
            urlImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            phoneNumber: "123-456-7890",
            contactEmail: "info@grandhotel.com",
            hotelChainId: 1,
            numberOfRooms: 100,
            hotelChain: {
                name: "Grand Chain"
            },
            rooms: [
                {
                    id: 101,
                    name: "Deluxe Room",
                    price: 199.99,
                    capacity: 2,
                    amenities: "WiFi, TV, Mini Bar",
                    viewType: "City View"
                },
                {
                    id: 102,
                    name: "Suite",
                    price: 299.99,
                    capacity: 4,
                    amenities: "WiFi, TV, Kitchen, Jacuzzi",
                    viewType: "Ocean View"
                }
            ],
            employees: []
        },
        {
            id: 2,
            name: "Luxury Plaza",
            address: "456 Park Ave, London",
            rating: 5,
            urlImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
            phoneNumber: "987-654-3210",
            contactEmail: "info@luxuryplaza.com",
            hotelChainId: 2,
            numberOfRooms: 150,
            hotelChain: {
                name: "Luxury Chain"
            },
            rooms: [
                {
                    id: 201,
                    name: "Standard Room",
                    price: 149.99,
                    capacity: 2,
                    amenities: "WiFi, TV",
                    viewType: "Garden View"
                }
            ],
            employees: []
        }
    ];

    // Add pagination controls
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Add pagination component
    const Pagination = () => {
        // Generate page numbers to display
        const getPageNumbers = () => {
            const pages = [];
            const maxVisiblePages = 5;
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            
            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
            
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            
            return pages;
        };

        return (
            <div className="flex justify-center items-center space-x-2 mt-6 mb-8">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border-2 border-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-100"
                    title="Previous page"
                >
                    <ChevronLeft className="w-5 h-5 text-black" />
                </button>
                
                {getPageNumbers().map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 border rounded-md ${
                            currentPage === pageNum
                                ? 'bg-white text-black border-black'
                                : 'bg-black text-white hover:bg-gray-800'
                        }`}
                    >
                        {pageNum}
                    </button>
                ))}
                
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border-2 border-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-100"
                    title="Next page"
                >
                    <ChevronRight className="w-5 h-5 text-black" />
                </button>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="homepage-container bg-white">
                <Navbar />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="homepage-container bg-white">
                <Navbar />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return(
        <div className= "homepage-container bg-white">
            <Navbar />
            
            <div className="homepage-right-container">
                {/* User Welcome Section */}
                <div className="welcome-section p-4 bg-gray-100 rounded-lg mb-4 shadow-md">
                    <h2 className="text-xl font-semibold text-black">Welcome, {user.name}!</h2>
                    <div className="mt-2 space-y-1">
                        <p className="text-black">SSN/SIN: {user.ssn_sin}</p>
                        <p className="text-black">Address: {user.address}</p>
                        {userType === 'client' && user.date_of_registration && (
                            <p className="text-black">Member since: {new Date(user.date_of_registration).toLocaleDateString()}</p>
                        )}
                        {userType === 'employee' && (
                            <>
                                <p className="text-black">Role: {user.role}</p>
                                <p className="text-black">Hotel: {user.hotelName}</p>
                            </>
                        )}
                    </div>
                </div>
                
                {/* Top Welcoming design :-( */}
                <div className="homepage-top-right-container">
                    <img src="images/homepageImage.png" className="homepage-top-right-image" />
                    <div className="homepage-image-overlay" />
                    <div className="homepage-image-text-overlay">
                        <h1 className="homepage-image-overlay-text">Pick your Destination</h1>
                    </div>
                </div>

                {/* Hotel List */}
                <div className="homepage-hotel-text-container">
                    <h1 className="homepage-hotel-text-title text-black">Hotels</h1>
                    <h2 className="homepage-hotel-text-subtitle">Choose which Hotel you want to spend your days in</h2>
                </div>

                {/* Search bar */}
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <div className="w-full">
                        <input 
                            type="text" 
                            className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 homepage-input" 
                            placeholder="Search by hotel name or address" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Location-based search */}
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-4">
                    <div className="w-full md:w-1/3">
                        <input 
                            type="text" 
                            className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                            placeholder="Enter location (e.g., city, address)" 
                            value={locationSearch}
                            onChange={(e) => handleLocationSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-1/3">
                        <input 
                            type="number" 
                            className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                            placeholder="Search radius (km)" 
                            value={searchRadius}
                            onChange={(e) => setSearchRadius(Number(e.target.value))}
                            min="1"
                            max="100"
                        />
                    </div>
                    <div className="w-full md:w-1/3">
                        <button
                            onClick={getUserLocation}
                            className="w-full cursor-pointer text-white px-4 py-2 rounded-lg bg-black hover:bg-black transition-colors"
                        >
                            Use My Location
                        </button>
                    </div>
                </div>

                {/* Sorting mechanics */}
                <div className="flex w-full flex-wrap md:flex-nowrap gap-2 mt-4 homepage-sort-container">
                    <h1 className="text-black font-medium">Filter:</h1>
                </div>

                {/* Additional Filters */}
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-4 homepage-sort-container">
                    <h1 className="text-black font-medium">Additional Filters:</h1>
                    <select 
                        className="border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 bg-gray-200"
                        value={selectedChain}
                        onChange={(e) => setSelectedChain(e.target.value)}
                    >
                        <option value="all">All Hotel Chains</option>
                        {hotelChains.map(chain => (
                            <option key={chain.id} value={chain.name}>
                                {chain.name}
                            </option>
                        ))}
                    </select>
                    
                    <input 
                        type="number" 
                        placeholder="Min Room Capacity" 
                        className="border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 bg-gray-200" 
                        value={minCapacity || ''}
                        onChange={(e) => setMinCapacity(e.target.value ? Number(e.target.value) : undefined)}
                        min="1"
                    />
                </div>

                {/* Rating and Amenities Filters */}
                <div className="flex w-full flex-wrap gap-4 mt-4 justify-center">
                    <div className="w-full md:w-1/2 max-w-md">
                        <h2 className="text-black font-medium mb-2 text-center">Rating Range:</h2>
                        <div className="flex gap-2 justify-center">
                            <input 
                                type="number" 
                                placeholder="Min Rating" 
                                className="border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 bg-gray-200" 
                                value={minRating || ''}
                                onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : undefined)}
                                min="0"
                                max="5"
                            />
                            <input 
                                type="number" 
                                placeholder="Max Rating" 
                                className="border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 bg-gray-200" 
                                value={maxRating || ''}
                                onChange={(e) => setMaxRating(e.target.value ? Number(e.target.value) : undefined)}
                                min="0"
                                max="5"
                            />
                        </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 max-w-md">
                        <h2 className="text-black font-medium mb-2 text-center">Amenities:</h2>
                        <div className="flex flex-wrap gap-4 justify-center items-center">
                            <div className="flex flex-wrap gap-4 justify-center">
                                <label className="flex items-center space-x-2">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedAmenities.includes('WiFi')}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedAmenities([...selectedAmenities, 'WiFi']);
                                            } else {
                                                setSelectedAmenities(selectedAmenities.filter(a => a !== 'WiFi'));
                                            }
                                        }}
                                        className="rounded text-blue-500"
                                    />
                                    <span className="text-black">WiFi</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedAmenities.includes('TV')}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedAmenities([...selectedAmenities, 'TV']);
                                            } else {
                                                setSelectedAmenities(selectedAmenities.filter(a => a !== 'TV'));
                                            }
                                        }}
                                        className="rounded text-blue-500"
                                    />
                                    <span className="text-black">TV</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedAmenities.includes('Mini Bar')}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedAmenities([...selectedAmenities, 'Mini Bar']);
                                            } else {
                                                setSelectedAmenities(selectedAmenities.filter(a => a !== 'Mini Bar'));
                                            }
                                        }}
                                        className="rounded text-blue-500"
                                    />
                                    <span className="text-black">Mini Bar</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {isHotelsLoading ? (
                    <div className="flex justify-center mt-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                            {filteredHotels.length > 0 ? (
                                filteredHotels.map(hotel => (
                                    <HotelCard 
                                        key={hotel.id} 
                                        hotel={hotel} 
                                        onClick={() => handleHotelClick(hotel)}
                                    />
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-8 text-gray-500">
                                    No hotels found matching your criteria. Try adjusting your search.
                                </div>
                            )}
                        </div>
                        <Pagination />
                    </>
                )}

                <HotelInformation 
                    isOpen={showHotelInfo} 
                    hotel={selectedHotel}
                    onClose={closeHotelInfo}
                />
            </div>
        </div>
    )
}
export default Homepage

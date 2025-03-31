"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Homepage.css";
import Navbar from "@/app/components/global/Navbar";
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
  profilePictureURL?: string;
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
}

const Homepage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHotelsLoading, setIsHotelsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showHotelInfo, setShowHotelInfo] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [userType, setUserType] = useState<string>("");

  // Fetch hotels from API
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setIsHotelsLoading(true);
        console.log("Fetching hotels from API...");
        const response = await fetch("/api/hotels");

        console.log("API response status:", response.status);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch hotels: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Hotels data received:", data);
        console.log("Number of hotels:", data.length);

        if (data.length === 0) {
          console.warn("No hotels returned from API");
        }

        setHotels(data);
        console.log("Hotels state updated");
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError("Failed to load hotels. Please try again later.");
      } finally {
        setIsHotelsLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication...");
        setIsLoading(true);

        const response = await fetch("/api/auth/check-auth", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Auth check response status:", response.status);

        if (!response.ok) {
          console.error("Authentication failed with status:", response.status);
          throw new Error("Authentication failed");
        }

        const data = await response.json();
        console.log("Auth check response data:", data);

        if (!data.authenticated) {
          console.error("Not authenticated according to response");
          router.push("/login");
          return;
        }

        setUser(data.user);
        setUserType(data.userType || "client");
      } catch (error) {
        console.error("Auth check failed:", error);
        setError("Authentication failed. Please login again.");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleHotelClick = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setShowHotelInfo(true);
  };

  const closeHotelInfo = () => {
    setShowHotelInfo(false);
  };

  // Filter hotels based on search term, minimum price, and location
  const filteredHotels = hotels.filter((hotel) => {
    // Use case-insensitive search for hotel name and address
    const matchesSearch =
      searchTerm === "" ||
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.address.toLowerCase().includes(searchTerm.toLowerCase());

    // For price filtering, we need to check the cheapest room in each hotel
    const hasRooms = hotel.rooms && hotel.rooms.length > 0;

    // Skip price filtering if no rooms or price filters not set
    let matchesPrice = true;

    if (hasRooms && (minPrice || maxPrice)) {
      // Find cheapest room - use ! assertion since we already checked that rooms exists and has length > 0
      const cheapestPrice = Math.min(...hotel.rooms!.map((room) => room.price));

      // Apply min price filter if set
      if (minPrice && minPrice > 0) {
        matchesPrice = cheapestPrice >= minPrice;
      }

      // Apply max price filter if set
      if (maxPrice && maxPrice > 0 && matchesPrice) {
        matchesPrice = cheapestPrice <= maxPrice;
      }
    }

    // Check if hotel address contains the selected location (city name)
    const matchesLocation =
      selectedLocation === "all" ||
      hotel.address.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesPrice && matchesLocation;
  });

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
        name: "Grand Chain",
      },
      rooms: [
        {
          id: 101,
          name: "Deluxe Room",
          price: 199.99,
          capacity: 2,
          amenities: "WiFi, TV, Mini Bar",
          viewType: "City View",
        },
        {
          id: 102,
          name: "Suite",
          price: 299.99,
          capacity: 4,
          amenities: "WiFi, TV, Kitchen, Jacuzzi",
          viewType: "Ocean View",
        },
      ],
      employees: [],
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
        name: "Luxury Chain",
      },
      rooms: [
        {
          id: 201,
          name: "Standard Room",
          price: 149.99,
          capacity: 2,
          amenities: "WiFi, TV",
          viewType: "Garden View",
        },
      ],
      employees: [],
    },
  ];

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

  return (
    <div className="homepage-container bg-white">
      <Navbar />

      <div className="homepage-right-container">
        {/* User Welcome Section */}
        <div className="welcome-section p-4 bg-gray-100 rounded-lg mb-4 shadow-md">
          <h2 className="text-xl font-semibold text-black">
            Welcome, {user.name}!
          </h2>
          <div className="mt-2 space-y-1">
            <p className="text-black">SSN/SIN: {user.ssn_sin}</p>
            <p className="text-black">Address: {user.address}</p>
            {userType === "client" && user.date_of_registration && (
              <p className="text-black">
                Member since:{" "}
                {new Date(user.date_of_registration).toLocaleDateString()}
              </p>
            )}
            {userType === "employee" && (
              <>
                <p className="text-black">Role: {user.role}</p>
                <p className="text-black">Hotel: {user.hotelName}</p>
              </>
            )}
          </div>
        </div>

        {/* Top Welcoming design :-( */}
        <div className="homepage-top-right-container">
          <img
            src="images/homepageImage.png"
            className="homepage-top-right-image"
          />
          <div className="homepage-image-overlay" />
          <div className="homepage-image-text-overlay">
            <h1 className="homepage-image-overlay-text">
              Pick your Destination
            </h1>
          </div>
        </div>

        {/* Hotel List */}
        <div className="homepage-hotel-text-container">
          <h1 className="homepage-hotel-text-title text-black">Hotels</h1>
          <h2 className="homepage-hotel-text-subtitle">
            Choose which Hotel you want to spend your days in
          </h2>
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

        {/* Sorting mechanics */}
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-4 homepage-sort-container">
          <h1 className="text-black font-medium">Filter:</h1>
          <input
            type="number"
            placeholder="Min Price"
            className="border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 bg-gray-200 dark:placeholder-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 homepage-sort"
            value={minPrice || ""}
            onChange={(e) =>
              setMinPrice(e.target.value ? Number(e.target.value) : undefined)
            }
            min="0"
          />
          <input
            type="number"
            placeholder="Max Price"
            className="border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 bg-gray-200 dark:placeholder-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 homepage-sort"
            value={maxPrice || ""}
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : undefined)
            }
            min="0"
          />
          <select
            className="border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 bg-gray-200 dark:placeholder-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 homepage-sort"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="all">All Areas</option>
            <option value="new york">New York</option>
            <option value="london">London</option>
            <option value="paris">Paris</option>
            <option value="vancouver">Vancouver</option>
            <option value="toronto">Toronto</option>
          </select>
        </div>

        {isHotelsLoading ? (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onClick={() => handleHotelClick(hotel)}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-500">
                No hotels found matching your criteria. Try adjusting your
                search.
              </div>
            )}
          </div>
        )}

        <HotelInformation
          isOpen={showHotelInfo}
          hotel={selectedHotel}
          onClose={closeHotelInfo}
        />
      </div>
    </div>
  );
};
export default Homepage;

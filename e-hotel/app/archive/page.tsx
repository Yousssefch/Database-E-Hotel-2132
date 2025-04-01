"use client"
import { useState, useEffect } from "react";
import Navbar from "../components/global/Navbar";
import "./Archive.css";
import { useRouter } from "next/navigation";

interface Archive {
  id: number;
  bookingRentingId: number;
  transactionType: string;
  customerInfo: string;
  roomInfo: string;
  checkInDate: string;
  checkOutDate: string;
}

const Archive: React.FC = () => {
  const [archives, setArchives] = useState<Archive[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        // First check authentication
        const authResponse = await fetch('/api/auth/check-auth');
        const authData = await authResponse.json();
        
        if (!authData.authenticated) {
          setError("Please log in to view archives");
          setIsLoading(false);
          return;
        }

        // Check if user is an employee
        if (authData.userType !== "employee") {
          setError("Only employees can access archives");
          setIsLoading(false);
          return;
        }

        // Fetch all archives
        const response = await fetch('/api/archives');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch archives");
        }
        
        const result = await response.json();
        setArchives(result);
      } catch (error) {
        console.error("Error fetching archives:", error);
        setError(error instanceof Error ? error.message : "Failed to load archives. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArchives();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'POST' });
      if (response.ok) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="archive-container">
      <Navbar />

      <div className="archive-right-container">
        <div className="archive-right-top-container">
          <h1 className="archive-right-top-title text-black">Archives:</h1>
          <h2 className="archive-right-top-subtitle text-black">All past transactions:</h2>

          <div className="archive-right-top-bar" />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">
            {error}
            {error.includes("Please log in") && (
              <div className="mt-4">
                <button
                  onClick={() => router.push('/login')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Go to Login
                </button>
              </div>
            )}
          </div>
        ) : archives.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">No archived transactions found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            {archives.map((archive) => (
              <div key={archive.id} className="archive-card bg-white rounded-lg shadow-md p-6">
                <div className="archive-card-header">
                  <h3 className="text-lg font-semibold mb-2">
                    {archive.transactionType === 'booking' ? 'Booking' : 'Renting'} #{archive.bookingRentingId}
                  </h3>
                </div>
                <div className="archive-card-content">
                  <p className="text-gray-600 mb-2">{archive.roomInfo}</p>
                  <p className="text-gray-600 mb-2">Customer: {archive.customerInfo}</p>
                  <div className="archive-dates">
                    <p className="text-sm text-gray-500">
                      Check-in: {new Date(archive.checkInDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Check-out: {new Date(archive.checkOutDate).toLocaleDateString()}
                    </p>
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

export default Archive; 
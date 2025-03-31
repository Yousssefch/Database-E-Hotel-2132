"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/global/Navbar";
import "./AdminPage.css";

interface Customer {
  ssn_sin: string;
  fullName: string;
  address: string;
}

interface Room {
  id: number;
  name: string;
  price: number;
  capacity: number;
  viewType: string;
  hotel?: {
    id: number;
    name: string;
    address: string;
    urlImage: string;
  };
}

interface Booking {
  id: number;
  customerSsnSin: string;
  roomId: number;
  bookingDate: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  customer?: Customer;
  room?: Room;
}

const AdminPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState<Record<number, boolean>>({});
  const [actionResult, setActionResult] = useState<{id: number, success: boolean, message: string} | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Check if admin is authenticated (you might want to add an admin check in your auth system)
        const authResponse = await fetch('/api/auth/check-auth');
        const authData = await authResponse.json();
        
        if (!authData.authenticated) {
          setError("Please log in to view and manage reservations");
          setIsLoading(false);
          return;
        }
        
        // Fetch all bookings with pending status
        const response = await fetch('/api/bookings');
        
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        
        const allBookings = await response.json();
        
        // Filter to only show pending bookings
        const pendingBookings = allBookings.filter((booking: Booking) => 
          booking.status === "pending"
        );
        
        setBookings(pendingBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load reservations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleApproveBooking = async (bookingId: number) => {
    setIsProcessing(prev => ({ ...prev, [bookingId]: true }));
    setActionResult(null);
    
    try {
      // 1. First update the booking status to 'confirmed'
      const updateResponse = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'confirmed'
        })
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to approve booking");
      }
      
      const updatedBooking = await updateResponse.json();
      console.log("Booking approved:", updatedBooking);
      
      // 2. Find a random employee to assign to this booking
      const employeesResponse = await fetch('/api/employees');
      if (!employeesResponse.ok) {
        throw new Error("Failed to fetch employees");
      }
      
      const employees = await employeesResponse.json();
      if (!employees || employees.length === 0) {
        throw new Error("No employees available to assign to the booking");
      }
      
      // Select a random employee
      const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
      
      // 3. Create a renting record (actual booking) for this reservation
      const rentingResponse = await fetch('/api/rentings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bookingId: bookingId,
          customerSsnSin: updatedBooking.customerSsnSin,
          roomId: updatedBooking.roomId,
          employeeId: randomEmployee.id,
          checkInDate: updatedBooking.checkInDate,
          checkOutDate: updatedBooking.checkOutDate
        })
      });
      
      if (!rentingResponse.ok) {
        throw new Error("Failed to create renting record");
      }
      
      const rentingData = await rentingResponse.json();
      console.log("Renting created:", rentingData);

      // 4. Delete the booking since it's now converted to a renting
      const deleteResponse = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
      });
      
      if (!deleteResponse.ok) {
        throw new Error("Failed to delete booking after creating renting");
      }
      
      console.log("Booking deleted after conversion to renting");

      // Update the local state to remove the approved booking
      setBookings(prevBookings => 
        prevBookings.filter(booking => booking.id !== bookingId)
      );
      
      setActionResult({
        id: bookingId,
        success: true,
        message: "Reservation approved successfully and converted to renting"
      });
    } catch (error) {
      console.error("Error approving booking:", error);
      setActionResult({
        id: bookingId,
        success: false,
        message: error instanceof Error ? error.message : "Failed to approve reservation"
      });
    } finally {
      setIsProcessing(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  const handleDeclineBooking = async (bookingId: number) => {
    setIsProcessing(prev => ({ ...prev, [bookingId]: true }));
    setActionResult(null);
    
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'declined'
        })
      });

      if (!response.ok) {
        throw new Error("Failed to decline booking");
      }

      // Update the local state to remove the declined booking
      setBookings(prevBookings => 
        prevBookings.filter(booking => booking.id !== bookingId)
      );
      
      setActionResult({
        id: bookingId,
        success: true,
        message: "Reservation declined successfully"
      });
    } catch (error) {
      console.error("Error declining booking:", error);
      setActionResult({
        id: bookingId,
        success: false,
        message: "Failed to decline reservation"
      });
    } finally {
      setIsProcessing(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="admin-page-container">
      <Navbar />
      
      <div className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title text-black">Reservation Management</h1>
          <h2 className="admin-subtitle text-black">Review and approve pending reservations</h2>
        </div>
        
        {actionResult && (
          <div className={`p-4 my-4 ${actionResult.success ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} border rounded`}>
            {actionResult.message}
          </div>
        )}
        
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
            <p className="text-xl text-gray-600">No pending reservations to review.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Reservation ID</th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Hotel & Room</th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.customer?.fullName || 'Unknown'}</div>
                      <div className="text-sm text-gray-500">{booking.customerSsnSin}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.room?.hotel?.name || 'Unknown Hotel'}</div>
                      <div className="text-sm text-gray-500">{booking.room?.name || `Room #${booking.roomId}`}</div>
                      {booking.room?.price && (
                        <div className="text-sm text-gray-500">${booking.room.price.toFixed(2)}/night</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900"><span className="font-medium">Check-in:</span> {formatDate(booking.checkInDate)}</div>
                      <div className="text-sm text-gray-900"><span className="font-medium">Check-out:</span> {formatDate(booking.checkOutDate)}</div>
                      <div className="text-xs text-gray-500">Booked on: {formatDate(booking.bookingDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproveBooking(booking.id)}
                          disabled={isProcessing[booking.id]}
                          className="inline-flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white text-sm font-medium rounded"
                        >
                          {isProcessing[booking.id] ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          ) : (
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                          {isProcessing[booking.id] ? 'Processing...' : 'Approve & Create Renting'}
                        </button>
                        
                        <button
                          onClick={() => handleDeclineBooking(booking.id)}
                          disabled={isProcessing[booking.id]}
                          className="inline-flex items-center px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white text-sm font-medium rounded"
                        >
                          {isProcessing[booking.id] ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          ) : (
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          )}
                          {isProcessing[booking.id] ? 'Processing...' : 'Decline'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage; 
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Homepage.css"
import Navbar from "@/app/components/global/Navbar"
import topImage from "../../../assets/Homepage/homepage_image.png"
import HotelCard from "../components/homepage/HotelCard";
import HotelInformation from "../components/homepage/HotelInformation";

interface User {
    name: string;
    ssn_sin: string;
    address: string;
    date_of_registration: string;
}

const Homepage: React.FC = () =>  {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/auth/check-auth', {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error('Authentication failed');
                }
                
                const data = await response.json();
                
                if (!data.authenticated) {
                    router.push('/login');
                    return;
                }
                
                setUser(data.user);
            } catch (error) {
                console.error('Auth check failed:', error);
                router.push('/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

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

    if (!user) {
        return null;
    }

    return(
        <div className= "homepage-container bg-white">
            <Navbar />
            
            <div className="homepage-right-container">
                {/* User Welcome Section */}
                <div className="welcome-section p-4 bg-gray-100 rounded-lg mb-4 shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800">Welcome, {user.name}!</h2>
                    <div className="mt-2 space-y-1">
                        <p className="text-gray-600">SSN/SIN: {user.ssn_sin}</p>
                        <p className="text-gray-600">Address: {user.address}</p>
                        <p className="text-gray-600">Member since: {new Date(user.date_of_registration).toLocaleDateString()}</p>
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
                    <div>
                        <input type="text" id="first_name" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 homepage-input" placeholder="Search" required />
                    </div>
                </div>

                {/* Sorting mechanics */}
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-4 homepage-sort-container">
                    <h1 className="text-black">Sort:</h1>
                    <input type="number" placeholder="Min Price" className="border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 homepage-sort" />
                    <input type="date" placeholder="Start Date Available" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500 homepage-sort" />
                    <select className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 homepage-sort">
                        <option value="all">All Areas</option>
                        <option value="new_york">New York</option>
                        <option value="london">London</option>
                        <option value="paris">Paris</option>
                        <option value="vancouver">Vancouver</option>
                        <option value="toronto">Toronto</option>
                    </select>
                </div>

                <div>
                    <HotelCard />
                </div>

                <HotelInformation isOpen={false}/>
            </div>
            
        </div>
    )
}
export default Homepage

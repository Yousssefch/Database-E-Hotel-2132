import "./Homepage.css"
import Navbar from "@/app/components/global/Navbar"
import topImage from "../../../assets/Homepage/homepage_image.png"
import HotelCard from "../components/homepage/HotelCard";
import HotelInformation from "../components/homepage/HotelInformation";
const Homepage: React.FC = () =>  {
    return(
        <div className= "homepage-container">
            <Navbar />
            
            <div className="homepage-right-container">
                
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

                {/* search bar and shinanigans */}
                <div className="flex w-full flex-wrap md:flex-nowrap">
                    <div>
                        <input type="text" id="first_name" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 homepage-input" placeholder="Search" required />
                    </div>
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
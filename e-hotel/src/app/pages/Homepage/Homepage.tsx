import Hero from "@/app/components/Homepage/Hero"
import "./Homepage.css"
import Navbar from "@/app/components/global/Navbar"
import topImage from "../../../assets/Homepage/homepage_image.png"
import {Card, CardHeader, CardBody, Image} from "@heroui/react";
export default function Homepage(){
    return(
        <div className= "homepage-container">
            <Navbar />
            
            <div className="homepage-right-container">
                
                {/* Top Welcoming design :-( */}
                <div className="homepage-top-right-container">
                    <img src={topImage.src} className="homepage-top-right-image" />
                    <div className="homepage-image-overlay" />
                    <div className="homepage-image-text-overlay">
                        <h1 className="homepage-image-overlay-text">Pick your Destination</h1>
                    </div>
                </div>

                {/* Hotel List */}
                <div className="homepage-hotel-text-container">
                    <h1 className="homepage-hotel-text-title">Hotels</h1>
                    <h2 className="homepage-hotel-text-subtitle">Choose which Hotel you want to spend your days in</h2>

                </div>
            </div>
            
        </div>
    )
}
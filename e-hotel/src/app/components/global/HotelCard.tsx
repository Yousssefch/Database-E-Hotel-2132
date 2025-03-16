import "./HotelCard.css"
import {Card, CardFooter, Image, Button} from "@heroui/react";

export default function HotelCard(){
    return(
        <div>
            <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-4 pb-4 pt-20 w-70 mt-10">
                <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a" alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-1xl font-bold text-white">Hotel of Paris</h3>
                <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">Paris</div>

            {/* Rating */}
            <div className="hotelcard-rating-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="white" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>

                <h1 className="hotelcard-rating-text">0.0</h1>
            </div>
            </article>

            
        </div>
    )
}
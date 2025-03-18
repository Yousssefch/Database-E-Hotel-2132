import "./HotelReservation.css"
export default function HotelReservation(){
    return(
        <div className="hotel-reservation-container">
            <div className="hotel-reservation-image-container">
                <img className="inset-0 h-full w-full object-cover hotel-reservation-image" src ="https://images.unsplash.com/photo-1499856871958-5b9627545d1a" />
                {/* Overlay */}
                <div className="hotel-reservation-overlay" />
                <h1 className="text-white hotel-overlay-text-title">Paris</h1>
            </div>

            <div className="hotel-reservation-text-container">
                <h1 className="hotel-reservation-text-hotel-name">Hotel of Paris</h1>
                <div className="hotel-reservation-text-from-container">

                <div>
                    <h1 className="hotel-reservation-text-from-title">From :</h1>
                    <h2 className="hotel-reservation-text-from-subtitle">January 18</h2>
                </div>

                <div>
                    <h1 className="hotel-reservation-text-from-title">To:</h1>
                    <h2 className="hotel-reservation-text-from-subtitle">January 19</h2>
                </div>
                </div>
            </div>          
        </div>
    )
}
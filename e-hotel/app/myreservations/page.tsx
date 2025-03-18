import Navbar from "../components/global/Navbar";
import HotelReservation from "../components/myreservations/HotelReservation";
import "./MyReservations.css"
const MyReservations: React.FC = () =>{
    return(
        <div className="my-reservations-container">
            <Navbar />

            <div className="my-reservations-right-container">
                <div className="my-reservations-right-top-container">
                    <h1 className="my-reservations-right-top-title text-black">My Reservations:</h1>
                    <h2 className="my-reservations-right-top-subtitle text-black">Here are your upcoming reservations:</h2>

                    <div className="my-reservations-image-container">
                        <img src="images/reservationImage.png" className="my-reservations-right-image" />
                    </div>
                    <div className="my-reservations-right-top-bar" />
                </div>

                <div className="my-reservations-cards-container">
                    <HotelReservation />
                </div>
            </div>
        </div>
    )
}
export default MyReservations;
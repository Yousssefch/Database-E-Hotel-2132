import Hero from "@/app/components/global/Homepage/Hero"
import "./Homepage.css"
import NavBar from "@/app/components/global/Navbar"
export default function Homepage(){
    return(
        <div className= "Container">

            {/* NavBar */}
            <NavBar />
            <Hero />
            
        </div>
    )
}
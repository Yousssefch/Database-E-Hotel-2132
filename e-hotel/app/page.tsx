import Hero from "./components/global/Homepage/Hero";
import NavBar from "@/app/components/global/Navbar";
export default function Homepage() {
  return (
    <div className="Container">
      {/* NavBar */}
      <NavBar />
      <Hero />
    </div>
  );
}

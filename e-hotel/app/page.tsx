"use client";
import { useEffect, useState } from "react";
import NavBarTop from "./components/NavBarTop";
import KeenCarousel from "./components/KeenCarousel";

export default function Homepage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    "https://images.pexels.com/photos/2341830/pexels-photo-2341830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
    "https://images.pexels.com/photos/2777056/pexels-photo-2777056.jpeg",
    "https://images.pexels.com/photos/3105066/pexels-photo-3105066.jpeg",
    "https://images.pexels.com/photos/2478248/pexels-photo-2478248.jpeg",
  ];

  const titles = [
    "Travel the world with the best hotel platform",
    "Have peace of mind while you travel",
    "Don't worry about anything, we take care of all your needs",
    "Challenge us and try your favorite hotel/city. We are in contact with the most popular hotels worldwide",
    "Enjoy your life, we are here to make your experience the most unforgettable moments of your life",
  ];

  const delay = 5000; // Durée d'affichage de chaque slide (en millisecondes)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, delay);

    return () => clearInterval(interval); // Nettoyage de l'intervalle quand le composant est démonté
  }, [items.length]);

  return (
    <>
      <NavBarTop />
      <div className="relative w-full min-h-screen  overflow-hidden">
        <div className="relative w-full h-full">
          {items.map((item, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                currentIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <img src={item} className="w-full h-screen object-cover" />

              {/* Titre sur l'image */}
              <div
                className="absolute top-80 inset-0 flex items-center justify-center"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <h1 className="text-6xl py-2 font-bold max-w-3xl text-white text-center px-4">
                  {titles[index]}
                </h1>
              </div>
            </div>
          ))}
        </div>

        {/* Les boutons de navigation */}
        <div className="flex w-full justify-center gap-2 py-2 absolute bottom-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`btn btn-xs ${
                currentIndex === index
                  ? "btn-primary rounded-4xl"
                  : "rounded-4xl"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

"use client"
import Image from "next/image";
import Homepage from "./pages/Homepage/Homepage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { connectToDatabase } from "./database/DB";
import { HeroUIProvider } from "@heroui/react";


export default function Home() {
  return (
    <div className=" ">
      <HeroUIProvider>
        <Homepage />
      </HeroUIProvider>
    </div>
  );
}



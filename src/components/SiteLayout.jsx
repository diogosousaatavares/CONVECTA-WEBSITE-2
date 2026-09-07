import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CookieConsent from "@/components/CookieConsent";
import IntroScreen from "@/components/IntroScreen";
import AmbientBackground from "@/components/AmbientBackground";
import BookingNotification from "@/components/BookingNotification";

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ position: "relative" }}>
      <AmbientBackground />
      <IntroScreen />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1" style={{ position: "relative", zIndex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
      <BookingNotification />
    </div>
  );
}

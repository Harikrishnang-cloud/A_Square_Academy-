"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import PopularClassesSection from "@/components/PopularClassesSection";
import Partners from "@/components/Partners";
import TutorsSection from "@/components/TutorsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#fdfefe] bg-[radial-gradient(circle_at_92%_12%,rgba(254,243,230,0.85)_0%,transparent_45%),radial-gradient(circle_at_5%_90%,rgba(215,248,238,0.7)_0%,transparent_42%)]">
      {/* Background Concentric Radar Rings (Left) */}
      <svg
        className="pointer-events-none absolute -top-12 -left-16 h-[640px] w-[640px] select-none opacity-80 z-0"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="300" cy="300" r="100" stroke="#02b378" strokeOpacity="0.14" strokeWidth="1.2" />
        <circle cx="300" cy="300" r="160" stroke="#02b378" strokeOpacity="0.14" strokeWidth="1.2" />
        <circle cx="300" cy="300" r="220" stroke="#02b378" strokeOpacity="0.14" strokeWidth="1.2" />
        <circle cx="300" cy="300" r="280" stroke="#02b378" strokeOpacity="0.12" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="140" cy="300" r="4.5" fill="#02b378" />
        <circle cx="300" cy="80" r="4" fill="#02b378" />
      </svg>

      {/* Background Concentric Radar Rings (Right) */}
      <svg
        className="pointer-events-none absolute top-1/4 -right-16 h-[680px] w-[680px] select-none opacity-80 z-0"
        viewBox="0 0 640 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="320" cy="320" r="140" stroke="#02b378" strokeOpacity="0.12" strokeWidth="1.2" />
        <circle cx="320" cy="320" r="210" stroke="#02b378" strokeOpacity="0.14" strokeWidth="1.2" />
        <circle cx="320" cy="320" r="280" stroke="#02b378" strokeOpacity="0.14" strokeWidth="1.2" />
        <circle cx="320" cy="320" r="310" stroke="#02b378" strokeOpacity="0.1" strokeWidth="1.2" strokeDasharray="4 4" />
        <circle cx="470" cy="470" r="4" fill="#02b378" />
        <circle cx="180" cy="460" r="4.5" fill="#02b378" />
      </svg>

      <Navbar />
      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <ServicesSection />
        <PopularClassesSection />
        <Partners />
        <TutorsSection />
      </div>
      <Footer />
    </div>
  );
}

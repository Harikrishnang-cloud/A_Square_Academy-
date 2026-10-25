"use client";

import Navbar from "@/components/Navbar";
import StandardsGrid from "@/components/StandardsGrid";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#fdfefe] bg-[radial-gradient(circle_at_92%_12%,rgba(254,243,230,0.85)_0%,transparent_45%),radial-gradient(circle_at_5%_90%,rgba(215,248,238,0.7)_0%,transparent_42%)]">
      {/* Background Concentric Radar Rings */}
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

      {/* Sticky Full-width Transparent/Frosted Navbar */}
      <Navbar />

      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Course Page Header Banner */}
        <section className="pt-4 sm:pt-8 pb-4 text-center max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#182233] tracking-tight leading-tight mb-3 sm:mb-4">
            Find the Right <span className="text-[#02b378]">Mathematics</span> Class for You
          </h1>

          <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto px-1">
            From Below 7th, 8th, 9th, 10th (SSLC/CBSE/IGCSE/ICSE) to +1, +2, Polytechnic(S1,S2 Maths), Degree(BSc Maths) &amp; Post-Graduation(MSc Maths) and
            University Engineering Mathematics (S1, S2, S3, Discrete).
            Individual attention, structured practice, and proven results.
          </p>

          {/* Value Props */}
          <div className="flex items-center justify-center gap-3 sm:gap-7 mt-5 sm:mt-6 text-xs sm:text-sm font-semibold text-gray-700 flex-wrap">
            <div className="flex items-center gap-1.5 bg-white/70 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-full border border-gray-100 sm:border-0 shadow-2xs sm:shadow-none">
              <CheckCircle size={15} className="text-[#02b378]" />
              <span>Personalized Doubt Sessions</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/70 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-full border border-gray-100 sm:border-0 shadow-2xs sm:shadow-none">
              <CheckCircle size={15} className="text-[#02b378]" />
              <span>Chapterwise Mock Tests</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/70 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-full border border-gray-100 sm:border-0 shadow-2xs sm:shadow-none">
              <CheckCircle size={15} className="text-[#02b378]" />
              <span>Experienced Faculty</span>
            </div>
          </div>
        </section>

        {/* Complete Standards & Curriculum Grid */}
        <StandardsGrid
          title="Browse By Class & Curriculum"
          subtitle="Select your standard to see the detailed syllabus, batch timings, and enroll for a free trial class."
        />
      </div>

      {/* Comprehensive Kerala-based SEO Footer */}
      <Footer />
    </div>
  );
}

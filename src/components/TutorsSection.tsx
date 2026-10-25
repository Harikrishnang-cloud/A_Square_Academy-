"use client";

import Image from "next/image";

interface Tutor {
  id: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  image: string;
  twitter?: string;
  linkedin?: string;
}

const TUTORS: Tutor[] = [
  {
    id: "anjana",
    name: "Anjana S",
    role: "Lead Math Faculty & Founder",
    experience: "14+ Years Exp",
    bio: "14+ years experience mentoring 3,000+ board students. Expert in Calculus, Geometry, and Competitive problem-solving.",
    image: "",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "Abhijith",
    name: "Abhijith",
    role: "Head of Engineering Mathematics",
    experience: "10+ Years Exp",
    bio: "Former University Professor with doctoral research in Applied Mathematics. Master of M1/M2/M3 & Transform Calculus.",
    image: "",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "anand-mohan",
    name: "Anand Mohan",
    role: "Senior Faculty – +1 & +2 Higher Secondary",
    experience: "12+ Years Exp",
    bio: "M.Sc. Mathematics Gold Medalist. Lead educator for CBSE, ICSE & State boards, with 98% distinction track record.",
    image: "",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "meera-krishnan",
    name: "Meera Krishnan",
    role: "Foundation & Olympiad Specialist",
    experience: "6+ Years Exp",
    bio: "Certified Vedic Math trainer passionate about removing math fear in Classes 5–9 and building rock-solid basics.",
    image: "",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
];

export default function TutorsSection() {
  return (
    <section id="tutors" className="py-12 sm:py-20 relative z-10 scroll-mt-24" aria-labelledby="tutors-heading">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 px-2 sm:px-4">
        <span className="inline-block text-[#02b378] font-bold text-xs sm:text-sm tracking-wider uppercase mb-1.5 sm:mb-2">
          Tutors
        </span>
        <h2
          id="tutors-heading"
          className="text-2xl sm:text-4xl font-extrabold text-[#182233] tracking-tight mb-2.5 sm:mb-4"
        >
          Meet the Heroes
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-xl mx-auto">
          At A² Academy, our expert mathematics faculty and university rank holders guide thousands of students. We offer the conceptual clarity and problem-solving abilities to succeed.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
        {TUTORS.map((tutor) => {
          // Fallback initials if image is empty
          const initials = tutor.name
            .split(" ")
            .map((n) => n[0])
            .filter(Boolean)
            .slice(0, 2)
            .join("");

          return (
            <div
              key={tutor.id}
              className="group relative bg-[#F9FAFB] hover:bg-white p-6 sm:p-7 text-center transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1.5 flex flex-col items-center"
            >
              
              {/* Avatar (Image or stylized initials placeholder) */}
              <div className="relative w-20 h-20 sm:w-22 sm:h-22 mb-4 mt-1">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-xs ring-1 ring-slate-200/70 group-hover:ring-[#02b378]/50 transition-all duration-300">
                  {tutor.image ? (
                    <Image
                      src={tutor.image}
                      alt={tutor.name}
                      width={96}
                      height={96}
                      unoptimized
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-50 text-[#02b378] font-bold text-xl sm:text-2xl select-none group-hover:scale-105 transition-transform duration-300">
                      {initials}
                    </div>
                  )}
                </div>
              </div>

              {/* Tutor Name */}
              <h3 className="text-base sm:text-[17px] font-bold text-[#182233] tracking-tight group-hover:text-[#02b378] transition-colors duration-200">
                {tutor.name}
              </h3>

              {/* Role */}
              <p className="text-xs sm:text-[13px] font-medium text-[#02b378] mt-1 mb-2 line-clamp-1">
                {tutor.role}
              </p>

              {/* Experience Pill Tag */}
              {tutor.experience && (
                <div className="mb-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-[11px] font-medium bg-emerald-50/80 text-emerald-800 border border-emerald-200/70">
                    
                    {tutor.experience}
                  </span>
                </div>
              )}

              {/* Short Bio */}
              <p className="text-slate-500 text-xs sm:text-[12.5px] leading-relaxed mb-5 flex-1 line-clamp-3">
                {tutor.bio}
              </p>

              {/* Social Icons */}
              <div className="flex items-center justify-center gap-3 pt-2 text-slate-400">
                {/* Twitter / X */}
                <a
                  href={tutor.twitter || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${tutor.name} Twitter Profile`}
                  className="p-1.5 rounded-full hover:text-[#02b378] hover:bg-emerald-50 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={tutor.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${tutor.name} LinkedIn Profile`}
                  className="p-1.5 rounded-full hover:text-[#02b378] hover:bg-emerald-50 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

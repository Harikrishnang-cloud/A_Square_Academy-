"use client";

import Image from "next/image";
import Link from "next/link";
import { MonitorPlay, Presentation, Lightbulb } from "lucide-react";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] items-center pt-4 sm:pt-10 pb-8 min-h-auto lg:min-h-[calc(100vh-210px)] gap-8 lg:gap-8">
      {/* Left Content */}
      <div className="relative z-20 flex flex-col items-center lg:items-start text-center lg:text-left px-2 sm:px-0">
        {/* Accent dot above headline */}
        <div className="hidden lg:block absolute -top-5 -left-5 h-2.5 w-2.5 rounded-full bg-[#02b378]" />

        <h1 className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[60px] font-extrabold leading-[1.18] sm:leading-[1.14] tracking-tight text-[#182233] mb-4 sm:mb-5">
          Up Your <span className="text-[#02b378]">Skills</span>
          <br />
          To <span className="text-[#02b378]">Advance</span> Your
          <br />
          <span className="text-[#02b378]">Career</span> Path
        </h1>

        <p className="text-sm sm:text-[15.5px] leading-relaxed text-gray-500 max-w-[440px] mb-6 sm:mb-8">
          Expert Mathematics tuition with A² Academy. From Below 7th, 8th, 9th,
          10th, +1, +2 to Engineering Mathematics (M1, M2, M3, Discrete) -
          helping every student master Math with confidence.
        </p>

        {/* CTA Buttons - Full width on small phones, inline on larger */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-9">
          <Link
            href="/courses"
            className="w-full sm:w-auto text-center bg-[#02b378] hover:bg-[#019966] text-white font-semibold text-sm sm:text-[15px] px-8 sm:px-9 py-3 sm:py-3.5 rounded-lg shadow-lg shadow-[#02b378]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#02b378]/40 cursor-pointer"
          >
            Get Started
          </Link>
          <Link
            href="/courses"
            className="w-full sm:w-auto text-center bg-[#e8faf2] hover:bg-[#d6f6e8] text-[#02b378] font-semibold text-sm sm:text-[15px] px-7 sm:px-8 py-3 sm:py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            Explore Courses
          </Link>
        </div>

        {/* Accent dot below CTA */}
        <div className="hidden lg:block absolute bottom-12 left-1/4 h-2.5 w-2.5 rounded-full bg-[#02b378]" />

        {/* 3 Pillars / Feature Highlights */}
        <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-7 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-[14px] font-semibold text-gray-700">
            <div className="flex items-center justify-center text-amber-500">
              <Lightbulb size={18} strokeWidth={2.2} />
            </div>
            <span>Concept Clarity</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-[14px] font-semibold text-gray-700">
            <div className="flex items-center justify-center text-orange-500">
              <Lightbulb size={18} strokeWidth={2.2} />
            </div>
            <span>Exam-Oriented</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-[14px] font-semibold text-gray-700">
            <div className="flex items-center justify-center text-purple-400">
              <Lightbulb size={18} strokeWidth={2.2} />
            </div>
            <span>Problem Solving</span>
          </div>
        </div>
      </div>

      {/* Right Graphic Stage */}
      <div
        className="relative flex items-center justify-center min-h-[380px] sm:min-h-[500px] z-20 overflow-hidden sm:overflow-visible w-full py-4"
        aria-label="Tuition Overview Banner"
      >
        <div className="relative w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] flex items-center justify-center">
          {/* Green Circular Background Disk */}
          <div className="absolute w-[260px] h-[260px] sm:w-[390px] sm:h-[390px] rounded-full bg-gradient-to-br from-[#02ba7c] to-[#00a46b] shadow-2xl shadow-[#02b378]/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />

          {/* Student Image Cutout */}
          <div className="absolute w-[270px] h-[310px] sm:w-[410px] sm:h-[460px] bottom-1 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <Image
              src="/student-hero.png"
              alt="Confident student ready to master mathematics with A² Academy"
              width={460}
              height={500}
              priority
              className="w-full h-full object-contain object-bottom drop-shadow-[0_16px_24px_rgba(0,0,0,0.15)]"
            />
          </div>

          {/* Floating Badge 1: 2K+ Math Classes */}
          <div className="absolute top-[28%] left-0 sm:-left-6 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3 shadow-lg border border-white/80 z-30 transition-transform duration-300 scale-90 sm:scale-100 origin-left hover:scale-105 animate-float-slow cursor-default">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#e8faf2] flex items-center justify-center text-[#02b378] shrink-0">
              <MonitorPlay size={18} strokeWidth={2.2} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[15px] sm:text-[18px] font-extrabold text-gray-900 leading-tight">
                2K+
              </span>
              <span className="text-[10.5px] sm:text-[12px] font-medium text-gray-400">
                Tuition Sessions
              </span>
            </div>
          </div>

          {/* Floating Badge 2: 5K+ Students Mentored */}
          <div className="absolute top-[4%] right-0 sm:-right-4 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:px-4 sm:py-3 flex flex-col items-center text-center gap-1 shadow-lg border border-white/80 z-30 transition-transform duration-300 scale-90 sm:scale-100 origin-right hover:scale-105 animate-float-medium cursor-default">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 46 46">
                <circle
                  cx="23"
                  cy="23"
                  r="18"
                  stroke="#E5E7EB"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle
                  cx="23"
                  cy="23"
                  r="18"
                  stroke="#02B378"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="113"
                  strokeDashoffset="34"
                  fill="none"
                  transform="rotate(-90 23 23)"
                />
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[15px] sm:text-[18px] font-extrabold text-gray-900 leading-tight">
                5K+
              </span>
              <span className="text-[10px] sm:text-[12px] font-medium text-gray-400">
                Students Mentored
              </span>
            </div>
          </div>

          {/* Floating Badge 3: 250+ Expert Tutors */}
          <div className="absolute bottom-[10%] right-0 sm:-right-6 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3 shadow-lg border border-white/80 z-30 transition-transform duration-300 scale-90 sm:scale-100 origin-right hover:scale-105 animate-float-fast cursor-default">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#e8faf2] flex items-center justify-center text-[#02b378] shrink-0">
              <Presentation size={18} strokeWidth={2.2} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-[11.5px] font-medium text-gray-400">
                Math Tutors
              </span>
              <span className="text-[15px] sm:text-[18px] font-extrabold text-gray-900 leading-tight">
                250+
              </span>
            </div>
          </div>

          {/* Floating Accent Sphere */}
          <div className="absolute bottom-[20%] left-2 sm:left-4 h-6 sm:h-8 w-6 sm:w-8 rounded-full bg-gradient-to-br from-[#02ba7c] to-[#009964] shadow-md shadow-[#02b378]/40 z-20" />
        </div>
      </div>
    </section>
  );
}

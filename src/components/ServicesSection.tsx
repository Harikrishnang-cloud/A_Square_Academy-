"use client";

import Link from "next/link";
import { Layers, Monitor, LineChart, ChevronRight } from "lucide-react";

export default function ServicesSection() {
  return (
    <section id="about" className="py-10 sm:py-16 scroll-mt-24">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
        <span className="text-xs font-bold text-[#02b378] uppercase tracking-wider">
          Our Services
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#182233] tracking-tight mt-2 sm:mt-2.5">
          Fostering a playful &amp; engaging learning environment
        </h2>
      </div>

      {/* 3 Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {/* Card 1: Active Green Card */}
        <div className="bg-[#02b378] text-white rounded-2xl p-6 sm:p-7 shadow-xl shadow-[#02b378]/25 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#02b378]/35">
          <div>
            <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center text-white mb-6">
              <Layers size={24} strokeWidth={2.2} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">
              Interactive Maths Coaching
            </h3>
            <p className="text-white/85 text-xs sm:text-[13px] leading-relaxed mb-6">
              Lessons on core mathematics that cover intuitive visualization, step-by-step logic, and individual doubt-solving for every student.
            </p>
          </div>
          <div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-white/80 transition-colors"
            >
              <span>Learn More</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Card 2: White Card with Blue Icon */}
        <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
          <div>
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <Monitor size={24} strokeWidth={2.2} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#182233]">
              Board Exam Mastery
            </h3>
            <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed mb-6">
              Structured preparation for 10th and 12th board exams covering past question papers, blueprint analysis, and scoring techniques.
            </p>
          </div>
          <div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#02b378] hover:text-[#019966] transition-colors"
            >
              <span>Learn More</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Card 3: White Card with Pink/Purple Icon */}
        <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
          <div>
            <div className="w-12 h-12 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center mb-6">
              <LineChart size={24} strokeWidth={2.2} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#182233]">
              Engineering Mathematics
            </h3>
            <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed mb-6">
              University syllabus aligned courses for M1, M2, M3, and Discrete Mathematics covering Anna Univ, KTU, VTU, and Autonomous universities.
            </p>
          </div>
          <div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#02b378] hover:text-[#019966] transition-colors"
            >
              <span>Learn More</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

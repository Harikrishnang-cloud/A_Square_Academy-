"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Star } from "lucide-react";

interface PopularClass {
  id: string;
  category: string;
  title: string;
  description: string;
  
  image: string;
  rating: number;
  reviewsCount: string;
  instructorName: string;
  instructorAvatar: string;
  enrolledCount: string;
  price: string;
}

const popularClasses: PopularClass[] = [
  {
    id: "class-10th-board",
    category: "High School",
    title: "10th Standard Board Exam Special",
    description: "Master Quadratic Equations, Trigonometry, Circles & Surface Areas with 100% score target techniques.",
    image: "/course-geometry.jpg",
    rating: 4.9,
    reviewsCount: "1,420",
    instructorName: "Anjana S",
    instructorAvatar: "",
    enrolledCount: "250+ Enrolled",
    price: "₹499",
  },
  {
    id: "class-engineering-math",
    category: "Engineering",
    title: "Engineering Mathematics (S1 & S2)",
    description: "In-depth matrices, vector calculus, multiple integrals, ODEs, and Laplace transforms for university exams.",
    image: "/course-tutordesk.jpg",
    rating: 4.8,
    reviewsCount: "832",
    instructorName: "Abhijith",
    instructorAvatar: "",
    enrolledCount: "180+ Enrolled",
    price: "₹999",
  },
  {
    id: "class-12th-higher-secondary",
    category: "Higher Secondary",
    title: "+1 & +2 Higher Secondary Mathematics",
    description: "Complete calculus, integrals, differential equations, vectors, and 3D geometry for CBSE & State boards.",
    image: "/course-blueprint.jpg",
    rating: 4.9,
    reviewsCount: "1,251",
    instructorName: "Anjana S",
    instructorAvatar: "",
    enrolledCount: "220+ Enrolled",
    price: "₹199",
  },
];

export default function PopularClassesSection() {
  return (
    <section id="popular-classes" className="py-10 sm:py-16 scroll-mt-24">
      <div className="text-center sm:text-left mb-7 sm:mb-10 px-2 sm:px-0">
        <span className="text-xs font-bold text-[#02b378] uppercase tracking-wider">
          Explore Programs
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#182233] tracking-tight mt-1 mb-2">
          Our Most Popular Class
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm">
          Let&apos;s join our famous class, the knowledge provided will definitely be useful for you.
        </p>
      </div>

      {/* 3 Popular Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {popularClasses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
          >
            {/* Card Thumbnail */}
            <div className="relative w-full aspect-16/10 bg-gray-100 overflow-hidden">
              <Image
                src={course.image}
                alt={course.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Duration floating badge */}
              {/* <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-xs">
                <Clock size={12} className="text-gray-300" />
                <span>{course.duration}</span>
              </div> */}
            </div>

            {/* Card Content */}
            <div className="p-4 sm:p-6 flex flex-col justify-between flex-1">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#02b378]">
                  {course.category}
                </span>

                <div className="flex items-start justify-between gap-2 mt-1 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#182233] group-hover:text-[#02b378] transition-colors leading-snug">
                    <Link href="/courses" className="hover:underline">
                      {course.title}
                    </Link>
                  </h3>
                  <Link
                    href="/courses"
                    className="text-gray-400 group-hover:text-[#02b378] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-0.5"
                    aria-label={`View ${course.title}`}
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                </div>

                <p className="text-gray-500 text-xs sm:text-[12.5px] leading-relaxed line-clamp-2 mb-4">
                  {course.description}
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-1.5 text-xs mb-5">
                  <span className="font-bold text-gray-800">{course.rating}</span>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-gray-400 text-[11px]">
                    ({course.reviewsCount})
                  </span>
                </div>
              </div>

              {/* Bottom Instructor & Price bar */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    {course.instructorAvatar ? (
                      <Image
                        src={course.instructorAvatar}
                        alt={course.instructorName}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-emerald-100 text-[#02b378] text-[11px] font-bold">
                        {course.instructorName[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900 leading-tight">
                      {course.instructorName}
                    </span>
                    <span className="text-[10.5px] text-gray-400 leading-tight">
                      {course.enrolledCount}
                    </span>
                  </div>
                </div>

                <div className="text-base sm:text-lg font-extrabold text-[#02b378]">
                  {course.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots indicator */}
      <div className="flex items-center justify-center gap-2 mt-10">
        <span className="w-6 h-2 rounded-full bg-[#02b378]" />
        <span className="w-2 h-2 rounded-full bg-gray-300" />
        <span className="w-2 h-2 rounded-full bg-gray-300" />
      </div>
    </section>
  );
}

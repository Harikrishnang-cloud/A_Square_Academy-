"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaFacebookF,
  FaTelegram,
  FaPhone,
  FaEnvelope,} from "react-icons/fa6";
import {HiOutlineMapPin,HiOutlineClock,HiOutlineArrowRight,HiOutlineAcademicCap,HiCheckCircle,} from "react-icons/hi2";

export default function Footer() {
  return (
    <footer
      className="bg-black text-neutral-300 relative z-20 mt-16 font-sans selection:bg-[#02b378] selection:text-white"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        A² Academy Kerala Mathematics Tuition Footer
      </h2>

      {/* Top Banner: Kerala Student Admissions & Demo Helpline (White Background) */}
      <div className="bg-white border-b border-gray-200/80 text-gray-900 shadow-xs">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 py-6 sm:py-9">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold bg-emerald-50 text-[#02b378] border border-emerald-200/80 mb-2.5">
                <HiOutlineAcademicCap className="w-4 h-4 text-[#02b378]" />
                Kerala Admissions Open 2026
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#182233] tracking-tight">
                Looking for the Best Mathematics Tuition in Kerala?
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                Join 5,000+ students from SSLC, +1, +2 (State/ICSE/CBSE) &amp; KTU Engineering. Book your free 1-on-1 trial class today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto shrink-0">
              <a
                href="https://wa.me/919876543210?text=Hello%20A2%20Academy,%20I%20am%20interested%20in%20Mathematics%20tuition."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center justify-center inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-md shadow-[#25D366]/25 transition-all hover:-translate-y-0.5"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>WhatsApp Helpline</span>
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center justify-center inline-flex items-center gap-2 bg-[#182233] hover:bg-black text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-xs transition-all hover:-translate-y-0.5"
              >
                <span>Book Free Trial</span>
                <HiOutlineArrowRight className="w-4 h-4 text-[#02b378]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand Logo & Original Connect Icons (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Logo on clean white capsule badge for authentic brand color visibility on black theme */}
            <Link href="/" className="inline-block group" aria-label="A² Academy Home">
              <div className="inline-flex items-center bg-white px-4 py-2.5 rounded-sm shadow-md border border-neutral-200 transition-transform duration-200 group-hover:scale-102">
                <Image
                  src="/a2-academy-logo.png"
                  alt="A² Academy Logo"
                  width={170}
                  height={50}
                  priority
                  className="h-9 sm:h-10 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed pr-2">
              Kerala&apos;s specialized mathematics tuition institution. Delivering conceptual mastery, individual doubt clearing, and proven 100% board results for School, Higher Secondary, and KTU B.Tech engineering students.
            </p>

            {/* Kerala Trust Points */}
            <div className="space-y-2 pt-1 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <HiCheckCircle className="w-4 h-4 text-[#02b378] shrink-0" />
                <span>Kerala State SCERT, DHSE, CBSE &amp; KTU Syllabus</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheckCircle className="w-4 h-4 text-[#02b378] shrink-0" />
                <span>5,000+ Kerala Students Mentored with A+ Grades</span>
              </div>
            </div>

            {/* Original Connect Icons using react-icons with official brand hover colors */}
            <div className="pt-2">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-3">
                Connect With Us
              </span>
              <div className="flex items-center flex-wrap gap-2.5">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp A² Academy"
                  title="WhatsApp"
                  className="w-9 h-9 rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram A² Academy"
                  title="Instagram"
                  className="w-9 h-9 rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-[#E4405F] hover:border-[#E4405F] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube A² Academy"
                  title="YouTube"
                  className="w-9 h-9 rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <FaYoutube className="w-5 h-5" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn A² Academy"
                  title="LinkedIn"
                  className="w-9 h-9 rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <FaLinkedinIn className="w-5 h-5" />
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram A² Academy"
                  title="Telegram"
                  className="w-9 h-9 rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-[#229ED9] hover:border-[#229ED9] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <FaTelegram className="w-5 h-5" />
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook A² Academy"
                  title="Facebook"
                  className="w-9 h-9 rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <FaFacebookF className="w-5 h-5" />
                </a>

                {/* Call */}
                <a
                  href="tel:+919876543210"
                  aria-label="Call A² Academy"
                  title="Direct Phone Call"
                  className="w-9 h-9 rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-[#02b378] hover:border-[#02b378] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <FaPhone className="w-5 h-5" />
                </a>

                {/* Email */}
                <a
                  href="mailto:contact@asquareacademy.com"
                  aria-label="Email A² Academy"
                  title="Email Us"
                  className="w-9 h-9 rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-[#02b378] hover:border-[#02b378] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <FaEnvelope className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Kerala School Mathematics (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase border-b border-neutral-800 pb-2">
              School Maths (Kerala)
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-neutral-400 pt-1">
              <li>
                <Link href="/courses" className="hover:text-[#02b378] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#02b378]" />
                  10th SSLC Kerala State Board
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#02b378] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#02b378]" />
                  Class 10 CBSE Board Exam
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#02b378] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#02b378]" />
                  Class 10 ICSE Mathematics
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#02b378] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#02b378]" />
                  9th Standard (State &amp; CBSE)
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#02b378] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#02b378]" />
                  8th Standard Foundation Batch
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#02b378] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#02b378]" />
                  Class 5, 6 &amp; 7 Basics &amp; Olympiad
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#02b378] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#02b378]" />
                  Vedic &amp; Speed Mental Math
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Higher Secondary & KTU B.Tech (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase border-b border-neutral-800 pb-2">
              +2 &amp; KTU Engineering
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-neutral-400 pt-1">
              <li>
                <Link href="/courses" className="hover:text-[#02b378] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#02b378]" />
                  +1 Higher Secondary (DHSE Kerala)
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#02b378] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#02b378]" />
                  +2 Higher Secondary Board Batch
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#02b378] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#02b378]" />
                  +1 &amp; +2 CBSE Science Maths
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#02b378] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#02b378]" />
                  KTU S1: MAT 101 Linear Algebra
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#02b378] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#02b378]" />
                  KTU S2: MAT 102 Vector Calculus
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#02b378] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#02b378]" />
                  KTU S3: MAT 201 Transforms &amp; PDE
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#02b378] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#02b378]" />
                  Discrete Mathematical Structures (KTU)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Kerala Hub & Support (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase border-b border-neutral-800 pb-2">
              Kerala Hub
            </h4>
            <div className="space-y-3.5 text-xs text-neutral-400 pt-1">
              <div className="flex items-start gap-2.5">
                <HiOutlineMapPin className="w-4 h-4 text-[#02b378] shrink-0 mt-0.5" />
                <span>
                  A² Academy Center,<br />
                  Kerala, India
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <FaPhone className="w-3.5 h-3.5 text-[#02b378] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a href="tel:+919876543210" className="block hover:text-white transition-colors">
                    +91 98765 43210
                  </a>
                  <a href="tel:+919444412345" className="block hover:text-white transition-colors">
                    +91 94444 12345
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <FaEnvelope className="w-3.5 h-3.5 text-[#02b378] shrink-0 mt-0.5" />
                <a href="mailto:contact@asquareacademy.com" className="hover:text-white transition-colors break-all">
                  contact@asquareacademy.com
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <HiOutlineClock className="w-4 h-4 text-[#02b378] shrink-0 mt-0.5" />
                <span>
                  Mon – Sat: 8:00 AM – 8:30 PM<br />
                  Sun: 9:00 AM – 2:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SEO District & Coverage Footprint across 14 Kerala Districts */}
        <div className="mt-12 pt-8 border-t border-neutral-900">
          <div className="space-y-3">
            <div className="text-[11.5px] text-neutral-400 leading-relaxed">
              <span className="font-bold text-neutral-300">Online &amp; Live Tuition Across All 14 Districts in Kerala: </span>
              Thiruvananthapuram • Kollam • Pathanamthitta • Alappuzha • Kottayam • Idukki • Ernakulam (Kochi) • Thrissur • Palakkad • Malappuram • Kozhikode • Wayanad • Kannur • Kasaragod.
            </div>
            <div className="text-[11.5px] text-neutral-400 leading-relaxed">
              <span className="font-bold text-neutral-300">Curriculums &amp; Universities: </span>
              Kerala State SCERT / Pareeksha Bhavan • Directorate of Higher Secondary Education (DHSE Kerala) • Central Board of Secondary Education (CBSE) • Council for the Indian School Certificate Examinations (ICSE) • APJ Abdul Kalam Technological University (KTU B.Tech Engineering Mathematics).
            </div>
          </div>
        </div>

        {/* Bottom Copyright and Navigation Bar */}
        <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © 2026 A² Academy Kerala. All rights reserved. Empowering Kerala students in Mathematics.
          </p>

          <div className="flex items-center flex-wrap gap-5 text-neutral-400">
            <Link href="/" className="hover:text-[#02b378] transition-colors">
              Home
            </Link>
            <Link href="/courses" className="hover:text-[#02b378] transition-colors">
              Courses
            </Link>
            <Link href="/contact" className="hover:text-[#02b378] transition-colors">
              Contact Us
            </Link>
            <Link href="/courses" className="hover:text-[#02b378] transition-colors">
              Batches &amp; Fees
            </Link>
            <a href="#privacy" className="hover:text-[#02b378] transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

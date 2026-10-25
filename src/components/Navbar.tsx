"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ExploreDropdown from "./ExploreDropdown";
import { TuitionStandard } from "@/types/tuition";
import { Menu, X, Phone, MessageCircle, ChevronRight } from "lucide-react";

interface NavbarProps {
  onSelectStandard?: (std: TuitionStandard) => void;
}

export default function Navbar({ onSelectStandard }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "About us", href: "/#about" },
    { label: "Contact us", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-[#fdfefe]/95 backdrop-blur-md shadow-xs border-b border-gray-100/80 py-3 sm:py-3.5"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center no-underline transition-transform duration-200 hover:scale-105 shrink-0"
            aria-label="A² Academy Home"
          >
            <Image
              src="/a2-academy-logo.png"
              alt="A² Academy Logo"
              width={160}
              height={50}
              priority
              className="h-8 sm:h-10 md:h-11 w-auto object-contain"
            />
          </Link>

          {/* Explore Dropdown & Search (Visible on sm and up) */}
          <div className="hidden sm:block">
            <ExploreDropdown onSelectStandard={onSelectStandard} />
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation">
            <ul className="hidden lg:flex items-center list-none gap-7 xl:gap-8">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`text-[14.5px] transition-colors ${
                        isActive
                          ? "font-bold text-[#02b378]"
                          : "font-medium text-gray-600 hover:text-[#02b378]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Action Area & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop / Tablet Call Button */}
            <a
              href="tel:+919876543210"
              className="hidden sm:inline-flex items-center gap-2 bg-[#02b378] hover:bg-[#019966] text-white font-semibold text-[13px] sm:text-[14px] px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-md shadow-[#02b378]/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#02b378]/35 cursor-pointer whitespace-nowrap"
            >
              <Phone size={15} />
              <span>Call Our Team</span>
            </a>

            {/* Quick Call Icon button on extra small screens */}
            <a
              href="tel:+919876543210"
              aria-label="Call A² Academy"
              className="sm:hidden w-9 h-9 rounded-lg bg-[#02b378] text-white flex items-center justify-center shadow-xs"
            >
              <Phone size={15} />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-[#02b378] hover:bg-gray-100/80 transition-colors cursor-pointer"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-white/98 backdrop-blur-xl border-b border-gray-200 shadow-2xl px-6 py-6 max-h-[calc(100vh-70px)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Mobile Search/Explore */}
            <div className="mb-6 block sm:hidden">
              <ExploreDropdown onSelectStandard={onSelectStandard} />
            </div>

            {/* Nav Links */}
            <nav className="space-y-1 mb-6">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-[#e8faf2] text-[#02b378]"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#02b378]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Quick Action Buttons */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <a
                href="tel:+919876543210"
                className="w-full flex items-center justify-center gap-2 bg-[#02b378] hover:bg-[#019966] text-white font-semibold text-sm py-3 rounded-xl shadow-md shadow-[#02b378]/20 transition-all"
              >
                <Phone size={16} />
                <span>Call Admission Helpline</span>
              </a>

              <a
                href="https://wa.me/919876543210?text=Hi%20A2%20Academy,%20I%20am%20inquiring%20about%20Maths%20tuition."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm py-3 rounded-xl shadow-xs transition-all"
              >
                <MessageCircle size={16} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Spacer so content doesn't get covered under fixed navbar */}
      <div className="h-18 sm:h-22 w-full shrink-0" aria-hidden="true" />
    </>
  );
}

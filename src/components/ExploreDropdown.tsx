"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import { tuitionStandards } from "@/data/tuitionStandards";
import { TuitionStandard } from "@/types/tuition";

interface ExploreDropdownProps {
  onSelectStandard?: (std: TuitionStandard) => void;
}

export default function ExploreDropdown({ onSelectStandard }: ExploreDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = tuitionStandards.filter((std) =>
    std.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <div className="flex items-center bg-white border border-gray-200 rounded-lg py-1.5 pl-3.5 pr-2 shadow-xs transition-all duration-200 focus-within:border-[#02b378] focus-within:ring-3 focus-within:ring-[#02b378]/20 w-full sm:w-[270px] md:w-[310px]">
        <Search size={16} className="text-gray-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search Math classes..."
          className="w-full bg-transparent border-none outline-hidden text-[13.5px] text-gray-700 placeholder:text-gray-400 ml-2"
          aria-label="Search mathematics tuition standards"
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center gap-1 border-none text-[13px] font-semibold py-1 px-2.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            isOpen
              ? "bg-[#02b378] text-white"
              : "bg-transparent text-[#02b378] hover:bg-[#e8faf2]"
          }`}
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span>Explore</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Clean Dropdown */}
      {isOpen && (
        <div className="absolute left-0 sm:left-auto right-0 top-full mt-2 w-full sm:w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="max-h-64 overflow-y-auto space-y-0.5">
            {filtered.length === 0 ? (
              <div className="p-3 text-center text-xs text-gray-400">
                No classes found
              </div>
            ) : (
              filtered.map((std) => (
                <button
                  key={std.id}
                  type="button"
                  onClick={() => {
                    setSearchQuery(std.title);
                    setIsOpen(false);
                    if (onSelectStandard) onSelectStandard(std);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 hover:text-[#02b378] hover:bg-[#e8faf2] transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="truncate">{std.title}</span>
                  <span className="text-[10.5px] font-medium text-gray-400 shrink-0 ml-2">
                    {std.grade.replace("Grades ", "Gr. ")}
                  </span>
                </button>
              ))
            )}
          </div>

          <div className="pt-1.5 mt-1 border-t border-gray-100">
            <Link
              href="/courses"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-1.5 text-xs font-bold text-[#02b378] hover:bg-[#e8faf2] rounded-lg transition-colors"
            >
              View all courses →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

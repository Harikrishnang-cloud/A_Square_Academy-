"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Clock, Users, X, CheckCircle2, Phone, MapPin,
  User,
  GraduationCap,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { tuitionStandards } from "@/data/tuitionStandards";
import { TuitionStandard, StandardCategory } from "@/types/tuition";
import { toast } from "react-toastify";

interface StandardsGridProps {
  onSelectStandard?: (std: TuitionStandard) => void;
  title?: string;
  subtitle?: string;
}

interface FormErrors {
  name?: string;
  place?: string;
  std?: string;
  contactNumber?: string;
}

export default function StandardsGrid({
  onSelectStandard,
  title = "All Tuition Standards & Mathematics Subjects",
  subtitle = "From foundational primary school math to advanced college engineering mathematics, explore our tailored curriculum for every grade.",
}: StandardsGridProps) {
  const [activeCategory, setActiveCategory] = useState<StandardCategory>("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStd, setSelectedStd] = useState<TuitionStandard | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    std: "",
    contactNumber: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    place: string;
    std: string;
    contactNumber: string;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  // Input refs for auto-focusing on first error
  const nameInputRef = useRef<HTMLInputElement>(null);
  const placeInputRef = useRef<HTMLInputElement>(null);
  const stdSelectRef = useRef<HTMLSelectElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Validation function
  function validateField(fieldName: string, value: string): string | undefined {
    const trimmed = value.trim();

    switch (fieldName) {
      case "name":
        if (!trimmed) {
          return "Name is required.";
        }
        if (trimmed.length < 2) {
          return "Name must be at least 2 characters.";
        }
        if (!/^[a-zA-Z\s.']{2,60}$/.test(trimmed)) {
          return "Please enter a valid name (alphabets only).";
        }
        return undefined;

      case "place":
        if (!trimmed) {
          return "Place / Location is required.";
        }
        if (trimmed.length < 2) {
          return "Place must be at least 2 characters.";
        }
        if (trimmed.length > 60) {
          return "Place must be under 60 characters.";
        }
        return undefined;

      case "std":
        if (!trimmed) {
          return "Please select a standard / class.";
        }
        return undefined;

      case "contactNumber": {
        if (!trimmed) {
          return "Contact number is required.";
        }
        // Extract digits only
        const digitsOnly = trimmed.replace(/\D/g, "");
        // Accept 10 digits, or 12 digits if starting with country code 91
        if (digitsOnly.length === 10) {
          if (!/^[6-9]\d{9}$/.test(digitsOnly)) {
            return "Please enter a valid 10-digit mobile number starting with 6-9.";
          }
        } else if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
          const mainPart = digitsOnly.slice(2);
          if (!/^[6-9]\d{9}$/.test(mainPart)) {
            return "Please enter a valid mobile number starting with 6-9.";
          }
        } else {
          return "Contact number must be exactly 10 digits.";
        }
        return undefined;
      }

      default:
        return undefined;
    }
  }

  // Validate entire form
  function validateAll(): FormErrors {
    return {
      name: validateField("name", formData.name),
      place: validateField("place", formData.place),
      std: validateField("std", formData.std),
      contactNumber: validateField("contactNumber", formData.contactNumber),
    };
  }

  // Real-time validation update on field change
  function handleChange(field: keyof typeof formData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      const fieldError = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: fieldError }));
    }
  }

  // Mark field as touched on blur and validate
  function handleBlur(field: keyof typeof formData) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldError = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: fieldError }));
  }

  // Close modal on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const categories: StandardCategory[] = [
    "All",
    "School",
    "High School",
    "Higher Secondary",
    "Engineering",
    "Competitive",
  ];

  const filtered = tuitionStandards.filter(
    (std) => activeCategory === "All" || std.category === activeCategory
  );

  function handleOpenModal(std: TuitionStandard) {
    setSelectedStd(std);
    setFormData({
      name: "",
      place: "",
      std: std.title,
      contactNumber: "",
    });
    setTouched({});
    setErrors({});
    setSubmitError(null);
    setHoneypot("");
    setIsSubmitted(false);
    setSubmittedData(null);
    setIsModalOpen(true);
    if (onSelectStandard) onSelectStandard(std);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setSubmittedData(null);
    setSubmitError(null);
    setTouched({});
    setErrors({});
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    // Mark all as touched
    const allTouched = {
      name: true,
      place: true,
      std: true,
      contactNumber: true,
    };
    setTouched(allTouched);

    const validationErrors = validateAll();
    setErrors(validationErrors);

    // Check if any error exists
    const hasErrors = Object.values(validationErrors).some((err) => Boolean(err));

    if (hasErrors) {
      toast.error("Please fill in all required fields accurately.");
      // Focus first erroneous field
      if (validationErrors.name && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (validationErrors.place && placeInputRef.current) {
        placeInputRef.current.focus();
      } else if (validationErrors.std && stdSelectRef.current) {
        stdSelectRef.current.focus();
      } else if (validationErrors.contactNumber && phoneInputRef.current) {
        phoneInputRef.current.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enquiryType: "Course Enquiry",
          name: formData.name,
          place: formData.place,
          std: formData.std,
          contactNumber: formData.contactNumber,
          _hp: honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmittedData({ ...formData });
        setFormData({
          name: "",
          place: "",
          std: "",
          contactNumber: "",
        });
        setTouched({});
        setErrors({});
        setSubmitError(null);
        setIsSubmitted(true);
        toast.success("Enrollment request submitted successfully!");
      } else {
        const errorMsg =
          result.error ||
          "Unable to submit enrollment request. Please check your network or try again.";
        setSubmitError(errorMsg);
        toast.error(errorMsg);
      }
    } catch {
      const networkError =
        "Network connection error. Please verify your internet connection and try again.";
      setSubmitError(networkError);
      toast.error(networkError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="standards-section" className="py-10 sm:py-16 border-t border-gray-100">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 px-2 sm:px-0">
        <span className="inline-block text-xs font-semibold text-[#02b378] uppercase tracking-wider px-3 py-1 rounded-full mb-2 sm:mb-3">
          Comprehensive Mathematics Curriculum
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#182233] tracking-tight">
          {title}
        </h2>
        <p className="text-gray-500 text-xs sm:text-base mt-2">{subtitle}</p>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-6 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${activeCategory === cat
                  ? "bg-[#02b378] text-white shadow-sm shadow-[#02b378]/30"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filtered.map((std) => (
          <div
            key={std.id}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-[#02b378]/50 transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold text-[#02b378] bg-[#e8faf2] px-2.5 py-1 rounded-md">
                  {std.badge}
                </span>
                <span className="text-xs font-medium text-gray-400">
                  {std.grade}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#02b378] transition-colors">
                {std.title}
              </h3>
              <p className="text-xs font-medium text-gray-500 mb-4">
                {std.boards}
              </p>

              {std.schedule && (
                <div className="flex items-center gap-4 text-[11.5px] text-gray-500 mb-3 bg-gray-50/70 p-2 rounded-lg">
                  <div className="flex items-center gap-1">
                    <Clock size={13} className="text-[#02b378]" />
                    <span>{std.schedule}</span>
                  </div>
                </div>
              )}

              <div className="space-y-2 border-t border-gray-100 pt-3">
                <span className="text-[11px] font-bold uppercase text-gray-400 tracking-wider">
                  Key Topics Covered:
                </span>
                <ul className="space-y-1.5">
                  {std.topics.map((t, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-gray-600 leading-snug"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#02b378] mt-1.5 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Users size={13} className="text-gray-400" />
                <span>Batches Open</span>
              </span>
              <button
                type="button"
                onClick={() => handleOpenModal(std)}
                className="bg-[#e8faf2] hover:bg-[#02b378] text-[#02b378] hover:text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Enroll Now</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Enrollment Form Modal with Complete Validation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 sm:p-8 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close form"
            >
              <X size={20} />
            </button>

            {isSubmitted && submittedData ? (
              <div className="text-center py-6">

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Enrollment Inquiry Received!
                </h3>
                <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-gray-900">{submittedData.name}</span>.
                  We have received your admission inquiry for{" "}
                  <span className="font-semibold text-[#02b378]">{submittedData.std}</span> (Location: {submittedData.place}).
                  Our academic counselor will contact you at{" "}
                  <span className="font-semibold text-gray-900">{submittedData.contactNumber}</span> shortly to finalize your batch schedule.
                </p>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-[#02b378] hover:bg-[#019966] text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-all cursor-pointer shadow-md shadow-[#02b378]/25"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="inline-block text-[11px] font-bold text-[#02b378] uppercase tracking-wider bg-[#e8faf2] px-2.5 py-1 rounded-md mb-2">
                    Admission Inquiry
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Enroll in Tuition Batch
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Please provide accurate details below. Our academic team will verify and contact you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Submission Error Banner */}
                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2 animate-in fade-in duration-150">
                      <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="font-semibold block mb-0.5">Submission Failed</span>
                        <span>{submitError}</span>
                      </div>
                    </div>
                  )}

                  {/* Honeypot field for bot protection */}
                  <input
                    type="text"
                    name="_hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />
                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Student / Parent Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <User
                        size={16}
                        className={`absolute left-3.5 transition-colors ${touched.name && errors.name
                            ? "text-red-400"
                            : touched.name && !errors.name
                              ? "text-[#02b378]"
                              : "text-gray-400"
                          }`}
                      />
                      <input
                        ref={nameInputRef}
                        type="text"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        className={`w-full bg-white border rounded-lg py-2.5 pl-10 pr-3.5 text-sm text-gray-800 placeholder:text-gray-400 outline-hidden transition-all ${touched.name && errors.name
                            ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : touched.name && !errors.name
                              ? "border-[#02b378]/60 focus:border-[#02b378] focus:ring-2 focus:ring-[#02b378]/20"
                              : "border-gray-200 focus:border-[#02b378] focus:ring-2 focus:ring-[#02b378]/20"
                          }`}
                      />
                    </div>
                    {touched.name && errors.name && (
                      <div className="flex items-center gap-1 text-[11.5px] text-red-500 mt-1 animate-in fade-in duration-150">
                        <AlertCircle size={13} className="shrink-0" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Place Field */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Place / Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <MapPin
                        size={16}
                        className={`absolute left-3.5 transition-colors ${touched.place && errors.place
                            ? "text-red-400"
                            : touched.place && !errors.place
                              ? "text-[#02b378]"
                              : "text-gray-400"
                          }`}
                      />
                      <input
                        ref={placeInputRef}
                        type="text"
                        placeholder="e.g. Chennai, Bangalore, Kochi"
                        value={formData.place}
                        onChange={(e) => handleChange("place", e.target.value)}
                        onBlur={() => handleBlur("place")}
                        className={`w-full bg-white border rounded-lg py-2.5 pl-10 pr-3.5 text-sm text-gray-800 placeholder:text-gray-400 outline-hidden transition-all ${touched.place && errors.place
                            ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : touched.place && !errors.place
                              ? "border-[#02b378]/60 focus:border-[#02b378] focus:ring-2 focus:ring-[#02b378]/20"
                              : "border-gray-200 focus:border-[#02b378] focus:ring-2 focus:ring-[#02b378]/20"
                          }`}
                      />
                    </div>
                    {touched.place && errors.place && (
                      <div className="flex items-center gap-1 text-[11.5px] text-red-500 mt-1 animate-in fade-in duration-150">
                        <AlertCircle size={13} className="shrink-0" />
                        <span>{errors.place}</span>
                      </div>
                    )}
                  </div>

                  {/* Standard (Std) Field */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Standard (Class / Grade) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <GraduationCap
                        size={16}
                        className={`absolute left-3.5 transition-colors ${touched.std && errors.std
                            ? "text-red-400"
                            : touched.std && !errors.std
                              ? "text-[#02b378]"
                              : "text-gray-400"
                          }`}
                      />
                      <select
                        ref={stdSelectRef}
                        value={formData.std}
                        onChange={(e) => handleChange("std", e.target.value)}
                        onBlur={() => handleBlur("std")}
                        className={`w-full bg-white border rounded-lg py-2.5 pl-10 pr-3.5 text-sm text-gray-800 outline-hidden transition-all ${touched.std && errors.std
                            ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : touched.std && !errors.std
                              ? "border-[#02b378]/60 focus:border-[#02b378] focus:ring-2 focus:ring-[#02b378]/20"
                              : "border-gray-200 focus:border-[#02b378] focus:ring-2 focus:ring-[#02b378]/20"
                          }`}
                      >
                        <option value="" disabled>
                          Select Standard
                        </option>
                        {tuitionStandards.map((std) => (
                          <option key={std.id} value={std.title}>
                            {std.title} ({std.grade})
                          </option>
                        ))}
                      </select>
                    </div>
                    {touched.std && errors.std && (
                      <div className="flex items-center gap-1 text-[11.5px] text-red-500 mt-1 animate-in fade-in duration-150">
                        <AlertCircle size={13} className="shrink-0" />
                        <span>{errors.std}</span>
                      </div>
                    )}
                  </div>

                  {/* Contact Number Field */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <Phone
                        size={16}
                        className={`absolute left-3.5 transition-colors ${touched.contactNumber && errors.contactNumber
                            ? "text-red-400"
                            : touched.contactNumber && !errors.contactNumber
                              ? "text-[#02b378]"
                              : "text-gray-400"
                          }`}
                      />
                      <input
                        ref={phoneInputRef}
                        type="tel"
                        maxLength={14}
                        placeholder="Enter 10-digit mobile number"
                        value={formData.contactNumber}
                        onChange={(e) => {
                          // Allow digits, +, spaces, hyphens
                          const val = e.target.value.replace(/[^\d+\s-]/g, "");
                          handleChange("contactNumber", val);
                        }}
                        onBlur={() => handleBlur("contactNumber")}
                        className={`w-full bg-white border rounded-lg py-2.5 pl-10 pr-3.5 text-sm text-gray-800 placeholder:text-gray-400 outline-hidden transition-all ${touched.contactNumber && errors.contactNumber
                            ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : touched.contactNumber && !errors.contactNumber
                              ? "border-[#02b378]/60 focus:border-[#02b378] focus:ring-2 focus:ring-[#02b378]/20"
                              : "border-gray-200 focus:border-[#02b378] focus:ring-2 focus:ring-[#02b378]/20"
                          }`}
                      />
                    </div>
                    {touched.contactNumber && errors.contactNumber && (
                      <div className="flex items-center gap-1 text-[11.5px] text-red-500 mt-1 animate-in fade-in duration-150">
                        <AlertCircle size={13} className="shrink-0" />
                        <span>{errors.contactNumber}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#02b378] hover:bg-[#019966] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-lg shadow-md shadow-[#02b378]/25 transition-all duration-200 hover:shadow-lg hover:shadow-[#02b378]/35 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Submitting Enrollment Request...</span>
                        </>
                      ) : (
                        <span>Submit Enrollment Request</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import { Phone,Mail,MapPin,Clock,Send,CheckCircle2,AlertCircle,MessageSquare,
  Loader2,
} from "lucide-react";
import { tuitionStandards } from "@/data/tuitionStandards";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    std: "",
    message: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    phone: string;
    std: string;
    message: string;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  function validate(field: string, value: string): string {
    const trimmed = value.trim();
    switch (field) {
      case "name":
        if (!trimmed) return "Name is required.";
        if (trimmed.length < 2) return "Name must be at least 2 characters.";
        return "";
      case "phone": {
        if (!trimmed) return "Contact phone number is required.";
        const digits = trimmed.replace(/\D/g, "");
        if (digits.length < 10) return "Please enter a valid 10-digit mobile number.";
        return "";
      }
      case "std":
        if (!trimmed) return "Please select a standard / class.";
        return "";
      case "message":
        if (!trimmed) return "Please enter your message or question.";
        return "";
      default:
        return "";
    }
  }

  function handleChange(field: string, val: string) {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (touched[field]) {
      const err = validate(field, val);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  }

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validate(field, formData[field as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    const newTouched = { name: true, phone: true, std: true, message: true };
    setTouched(newTouched);

    const newErrors: Record<string, string> = {
      name: validate("name", formData.name),
      phone: validate("phone", formData.phone),
      std: validate("std", formData.std),
      message: validate("message", formData.message),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => Boolean(err))) {
      toast.error("Please fill in all required fields accurately.");
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
          enquiryType: "Contact Us",
          name: formData.name,
          contactNumber: formData.phone,
          email: formData.email,
          std: formData.std,
          message: formData.message,
          _hp: honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmittedData({ ...formData });
        setFormData({ name: "", email: "", phone: "", std: "", message: "" });
        setTouched({});
        setErrors({});
        setSubmitError(null);
        setIsSubmitted(true);
        toast.success("Message sent successfully! We will contact you soon.");
      } else {
        const errorMsg =
          result.error ||
          "Unable to send message. Please check your network or try again.";
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
      </svg>

      {/* Sticky Full-width Navbar */}
      <Navbar />

      <main className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#182233] tracking-tight leading-tight">
            Get in Touch With Us
          </h1>
          <p className="text-gray-500 text-xs sm:text-base mt-2 sm:mt-3">
            Have questions about tuition batches, faculty, or admission?
            Fill out the form below or reach us directly.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Phone Card */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-[#e8faf2] text-[#02b378] flex items-center justify-center shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  Call or WhatsApp
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  Mon – Sat: 8:00 AM to 8:30 PM
                </p>
                <div className="space-y-0.5">
                  <a
                    href="tel:+919876543210"
                    className="block text-sm font-bold text-[#02b378] hover:underline"
                  >
                    +91 98765 43210
                  </a>
                  <a
                    href="tel:+919444412345"
                    className="block text-sm font-bold text-[#02b378] hover:underline"
                  >
                    +91 94444 12345
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  Email Support
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  We usually respond within 2-4 hours
                </p>
                <a
                  href="mailto:contact@asquareacademy.com"
                  className="text-sm font-semibold text-gray-800 hover:text-[#02b378] transition-colors"
                >
                  contact@asquareacademy.com
                </a>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  Tuition Center Location
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  A² Academy Tuition Center,
                  gfgjkhjlkgjhkhkjk hlgg hklh
                </p>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  Class &amp; Office Timings
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-800">Weekdays:</span> 8:00 AM – 8:30 PM<br />
                  <span className="font-semibold text-gray-800">Sundays:</span> 9:00 AM – 2:00 PM (Doubt &amp; Mock Tests)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-lg p-5 sm:p-10 border border-gray-100 shadow-xl shadow-gray-100/50">
            {isSubmitted && submittedData ? (
              <div className="text-center py-12 animate-in fade-in duration-200">
                <div className="w-16 h-16 bg-[#e8faf2] text-[#02b378] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto mb-4 leading-relaxed">
                  Thank you, <span className="font-semibold text-gray-900">{submittedData.name}</span>.
                  We have received your message regarding{" "}
                  <span className="font-semibold text-[#02b378]">{submittedData.std}</span>.
                  Our academic team will reach out to you via{" "}
                  <span className="font-semibold text-gray-900">{submittedData.phone}</span> shortly.
                </p>
                {submittedData.message && (
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-3.5 text-xs text-gray-600 max-w-md mx-auto mb-6 text-left">
                    <span className="font-semibold text-gray-700 block mb-1">Your Message / Enquiry:</span>
                    <p className="italic text-gray-600 leading-relaxed">&ldquo;{submittedData.message}&rdquo;</p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setSubmittedData(null);
                    setFormData({ name: "", email: "", phone: "", std: "", message: "" });
                    setTouched({});
                    setErrors({});
                    setSubmitError(null);
                  }}
                  className="bg-[#02b378] hover:bg-[#019966] text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-all cursor-pointer shadow-md shadow-[#02b378]/25"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-6">
                  Fill in your details and standard, and we will get back to you with syllabus details and batch timings.
                </p>

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
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Abhijith"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      className={`w-full bg-white border rounded-lg py-2.5 px-3.5 text-sm text-gray-800 placeholder:text-gray-400 outline-hidden transition-all ${
                        touched.name && errors.name
                          ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-gray-200 focus:border-[#02b378] focus:ring-2 focus:ring-[#02b378]/20"
                      }`}
                    />
                    {touched.name && errors.name && (
                      <div className="flex items-center gap-1 text-[11.5px] text-red-500 mt-1">
                        <AlertCircle size={13} className="shrink-0" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Phone & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        maxLength={14}
                        placeholder="10 digit mobile number"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^\d+\s-]/g, "");
                          handleChange("phone", val);
                        }}
                        onBlur={() => handleBlur("phone")}
                        className={`w-full bg-white border rounded-lg py-2.5 px-3.5 text-sm text-gray-800 placeholder:text-gray-400 outline-hidden transition-all ${
                          touched.phone && errors.phone
                            ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200 focus:border-[#02b378] focus:ring-2 focus:ring-[#02b378]/20"
                        }`}
                      />
                      {touched.phone && errors.phone && (
                        <div className="flex items-center gap-1 text-[11.5px] text-red-500 mt-1">
                          <AlertCircle size={13} className="shrink-0" />
                          <span>{errors.phone}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="myemail@gmail.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-gray-800 placeholder:text-gray-400 outline-hidden transition-all focus:border-[#02b378] focus:ring-2 focus:ring-[#02b378]/20"
                      />
                    </div>
                  </div>

                  {/* Standard (Std) Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Standard / Class Interested In <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.std}
                      onChange={(e) => handleChange("std", e.target.value)}
                      onBlur={() => handleBlur("std")}
                      className={`w-full bg-white border rounded-lg py-2.5 px-3.5 text-sm text-gray-800 outline-hidden transition-all ${
                        touched.std && errors.std
                          ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-gray-200 focus:border-[#02b378] focus:ring-2 focus:ring-[#02b378]/20"
                      }`}
                    >
                      <option value="" disabled>
                        Select Your Standard
                      </option>
                      {tuitionStandards.map((std) => (
                        <option key={std.id} value={std.title}>
                          {std.title} ({std.grade})
                        </option>
                      ))}
                    </select>
                    {touched.std && errors.std && (
                      <div className="flex items-center gap-1 text-[11.5px] text-red-500 mt-1">
                        <AlertCircle size={13} className="shrink-0" />
                        <span>{errors.std}</span>
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Your Message / Inquiry <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Ask about batch timings, fee structure, individual 1-on-1 coaching, or syllabus..."
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onBlur={() => handleBlur("message")}
                      className={`w-full bg-white border rounded-lg py-2.5 px-3.5 text-sm text-gray-800 placeholder:text-gray-400 outline-hidden transition-all resize-none ${
                        touched.message && errors.message
                          ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-gray-200 focus:border-[#02b378] focus:ring-2 focus:ring-[#02b378]/20"
                      }`}
                    />
                    {touched.message && errors.message && (
                      <div className="flex items-center gap-1 text-[11.5px] text-red-500 mt-1">
                        <AlertCircle size={13} className="shrink-0" />
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-[220px] bg-[#02b378] hover:bg-[#019966] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-lg shadow-md shadow-[#02b378]/25 transition-all duration-200 hover:shadow-lg hover:shadow-[#02b378]/35 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Comprehensive Kerala-based SEO Footer */}
      <Footer />
    </div>
  );
}

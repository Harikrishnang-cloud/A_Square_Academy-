"use client";

interface TrustFeature {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
}

const TRUST_FEATURES: TrustFeature[] = [
  {
    id: "kerala-state",
    title: "Kerala State Syllabus",
    subtitle: "SCERT • SSLC & DHSE +2",
    
  },
  {
    id: "cbse-icse",
    title: "CBSE / ICSE / IGCSE",
    subtitle: "Classes 5 to 12 All Boards",
    
  },
  {
    id: "online-classes",
    title: "Interactive Online Classes",
    subtitle: "Live 1-on-1 & Smart Batches",
    
  },
  {
    id: "expert-tutors",
    title: "Expert Math Faculty",
    subtitle: "University Rank Holders",
    
  },
];

export default function Partners() {
  return (
    <section
      aria-label="Academic Curricula & Features"
      className="py-10 relative z-20 border-t border-b border-gray-100/80 my-8"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10">
        {/* Left Trust Stat */}
        <div className="flex items-center justify-center sm:justify-start gap-3.5 shrink-0 text-center sm:text-left lg:pr-8 lg:border-r lg:border-gray-100">
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-2xl sm:text-3xl font-black text-[#02b378] tracking-tight leading-none">
              250+
            </span>
            <span className="text-xs sm:text-[13px] font-bold text-gray-900 mt-1">
              Schools &amp; Collaborations
            </span>
            <span className="text-[11px] font-medium text-gray-400">
              Across Kerala &amp; Gulf NRI Batches
            </span>
          </div>
        </div>

        {/* 4 Matching Curricula & Academic Pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 flex-1 w-full">
          {TRUST_FEATURES.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-center p-3 sm:p-3.5 rounded-xl bg-white/70 hover:bg-white border border-gray-100/80 hover:border-gray-200 shadow-2xs hover:shadow-xs transition-all duration-200"
            >
              <span className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#02b378] transition-colors leading-snug">
                {item.title}
              </span>
              <span className="text-[10.5px] sm:text-[11.5px] text-gray-500 font-medium mt-0.5 leading-tight">
                {item.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

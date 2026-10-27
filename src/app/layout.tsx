import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "A² Academy | Best Mathematics Tuition in Kerala - SSLC, Plus Two & KTU B.Tech",
  description:
    "Kerala's premier mathematics tuition academy offering expert coaching for Class 5 to 10 (SSLC/CBSE/ICSE), +1, +2 Higher Secondary (DHSE), and KTU B.Tech Engineering Mathematics (M1, M2, M3, Discrete). 1-on-1 doubt clearing & proven A+ results.",
  keywords: [
    "Maths tuition Kerala",
    "SSLC maths tuition Kerala",
    "Plus two maths tuition Kerala",
    "DHSE mathematics tuition",
    "KTU engineering maths tuition",
    "B.Tech maths tuition Kerala",
    "CBSE maths tuition Kerala",
    "A2 Academy Kerala",
    "A Square Mathematics Academy",
    "Online maths tuition Kochi Trivandrum Kozhikode Thrissur",
    "MAT 101 MAT 102 tuition KTU",
    "Vedic maths classes Kerala",
  ],
  authors: [{ name: "A² Academy Kerala" }],
  creator: "A² Academy",
  publisher: "A² Academy",
  metadataBase: new URL("https://asquareacademy.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "A² Academy | Premier Mathematics Tuition Academy in Kerala",
    description:
      "Join Kerala's top-rated mathematics coaching for SSLC, +1, +2 (State & CBSE) and KTU Engineering Mathematics. Expert mentors, comprehensive mock tests, and 100% pass guarantee.",
    url: "https://asquareacademy.in",
    siteName: "A² Academy Kerala",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A² Academy | Best Mathematics Tuition in Kerala",
    description:
      "Kerala's trusted mathematics coaching for SSLC, Plus Two DHSE, and KTU B.Tech Engineering Maths.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "geo.region": "IN-KL",
    "geo.placename": "Kerala, India",
  },
};

import ToastProvider from "@/components/ToastProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "A² Academy - Mathematics Tuition Kerala",
    alternateName: "A Square Mathematics Academy",
    url: "https://asquareacademy.in",
    logo: "https://asquareacademy.in/a2-academy-logo.png",
    description:
      "Premier mathematics tuition academy in Kerala providing specialized coaching for SSLC, Plus One, Plus Two (DHSE/CBSE), and KTU Engineering Mathematics.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Kerala",
    },
    telephone: "+91-9876543210",
    sameAs: ["https://wa.me/919876543210"],
  };

  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={plusJakartaSans.className}>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}

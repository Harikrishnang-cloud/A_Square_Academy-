import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter to protect public endpoint against spam bursts
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10; // max 10 submissions per minute per IP

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count += 1;
  return false;
}

// Clean old rate limit entries every 10 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(ip);
      }
    }
  }, 10 * 60 * 1000);
}

function sanitize(input?: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
    .slice(0, 1500);
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait a minute before submitting again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse payload
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request payload." },
        { status: 400 }
      );
    }

    // 3. Spam Honeypot Detection
    // If the hidden honeypot field is filled out, reject bot silently
    if (body._hp && String(body._hp).trim() !== "") {
      return NextResponse.json({
        success: true,
        message: "Enquiry received successfully.",
      });
    }

    const enquiryType = sanitize(body.enquiryType);
    const name = sanitize(body.name);
    const place = sanitize(body.place);
    const std = sanitize(body.std);
    const contactNumber = sanitize(body.contactNumber);
    const email = sanitize(body.email);
    const message = sanitize(body.message);

    // 4. Validate enquiryType
    if (enquiryType !== "Course Enquiry" && enquiryType !== "Contact Us") {
      return NextResponse.json(
        { success: false, error: "Invalid enquiry type specified." },
        { status: 400 }
      );
    }

    // 5. Common Required Validations
    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const digitsOnly = contactNumber.replace(/\D/g, "");
    if (!digitsOnly || digitsOnly.length < 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!std) {
      return NextResponse.json(
        { success: false, error: "Please select a standard / class." },
        { status: 400 }
      );
    }

    // 6. Form-specific Validations
    if (enquiryType === "Course Enquiry") {
      if (!place || place.length < 2) {
        return NextResponse.json(
          { success: false, error: "Place / Location is required for Course Enquiry." },
          { status: 400 }
        );
      }
    } else if (enquiryType === "Contact Us") {
      if (!message || message.length < 2) {
        return NextResponse.json(
          { success: false, error: "Please enter your message or question." },
          { status: 400 }
        );
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json(
          { success: false, error: "Please provide a valid email address." },
          { status: 400 }
        );
      }
    }

    // 7. Check Google Apps Script Endpoint URL
    const googleScriptUrl =
      process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (!googleScriptUrl || googleScriptUrl.includes("YOUR_DEPLOYMENT_ID")) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google Sheets integration endpoint (GOOGLE_SCRIPT_URL) is not configured in .env.local yet. Please deploy the Google Apps Script and configure GOOGLE_SCRIPT_URL.",
        },
        { status: 503 }
      );
    }

    // 8. Server-side timestamp
    const now = new Date();
    const timestamp = now.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const messageVal = enquiryType === "Contact Us" ? message : "";
    const placeVal = enquiryType === "Course Enquiry" ? place : "";
    const emailVal = enquiryType === "Contact Us" ? email : "";

    // 9. Prepare comprehensive payload with all possible Google Sheet header variations
    const payload = {
      // Header variations for Message / Enquiry
      "Message / Inquiry": messageVal,
      "Message / Enquiry": messageVal,
      "Message/Inquiry": messageVal,
      "Message/Enquiry": messageVal,
      "Message": messageVal,
      "message": messageVal,
      "Enquiry": messageVal,
      "enquiry": messageVal,
      "Inquiry": messageVal,
      "inquiry": messageVal,
      "Your Message / Inquiry": messageVal,
      "Your Message / Enquiry": messageVal,
      "Message or Inquiry": messageVal,
      "Message or Enquiry": messageVal,

      // Header variations for Enquiry Type
      "Timestamp": timestamp,
      "timestamp": timestamp,
      "Enquiry Type": enquiryType,
      "Inquiry Type": enquiryType,
      "enquiryType": enquiryType,
      "inquiryType": enquiryType,
      "type": enquiryType,

      // Header variations for Student / Parent Name
      "Student / Parent Name": name,
      "Full Name": name,
      "Name": name,
      "name": name,
      "fullName": name,

      // Header variations for Place / Location
      "Place / Location": placeVal,
      "Place/Location": placeVal,
      "Location": placeVal,
      "Place": placeVal,
      "place": placeVal,
      "location": placeVal,

      // Header variations for Standard / Class
      "Standard / Class": std,
      "Standard/Class": std,
      "Standard / Class Interested In": std,
      "Standard": std,
      "Class": std,
      "std": std,
      "standard": std,

      // Header variations for Contact Number
      "Contact Number": contactNumber,
      "Phone Number": contactNumber,
      "Mobile Number": contactNumber,
      "contactNumber": contactNumber,
      "phone": contactNumber,

      // Header variations for Email Address
      "Email Address": emailVal,
      "Email": emailVal,
      "email": emailVal,

      // Header variations for Status
      "Status": "New",
      "status": "New",
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

    let googleResponse: Response;
    try {
      googleResponse = await fetch(googleScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
        signal: controller.signal,
      });
    } catch (fetchErr: unknown) {
      clearTimeout(timeout);
      const isAbort = (fetchErr as Error)?.name === "AbortError";
      return NextResponse.json(
        {
          success: false,
          error: isAbort
            ? "Connection to Google Sheets timed out. Please try again."
            : "Failed to connect to Google Sheets endpoint. Please check your network or script deployment.",
        },
        { status: 502 }
      );
    } finally {
      clearTimeout(timeout);
    }

    // 10. Process Google Apps Script Response
    const responseText = await googleResponse.text();
    let result: { status?: string; success?: boolean; message?: string } = {};

    try {
      result = JSON.parse(responseText);
    } catch {
      // Non-JSON response
      if (!googleResponse.ok) {
        return NextResponse.json(
          {
            success: false,
            error: `Google Apps Script returned an error (${googleResponse.status}). Please check deployment permissions.`,
          },
          { status: 502 }
        );
      }
    }

    // Check for success: either status === "success" or success === true or 200 OK with success message
    const isSuccess =
      result.success === true ||
      result.status === "success" ||
      responseText.toLowerCase().includes("success");

    if (result.status === "error" || result.success === false) {
      return NextResponse.json(
        {
          success: false,
          error: result.message || "Failed to record enquiry in Google Sheets.",
        },
        { status: 400 }
      );
    }

    if (!isSuccess && !googleResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save enquiry in Google Sheets.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted and recorded in Google Sheets successfully.",
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: (err as Error)?.message || "Internal server error occurred.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const configured = Boolean(
    process.env.GOOGLE_SCRIPT_URL &&
      !process.env.GOOGLE_SCRIPT_URL.includes("YOUR_DEPLOYMENT_ID")
  );

  return NextResponse.json({
    status: "ok",
    service: "A² Academy Enquiries Integration API",
    googleSheetsEndpointConfigured: configured,
    endpoint: configured ? process.env.GOOGLE_SCRIPT_URL : "Not configured",
  });
}

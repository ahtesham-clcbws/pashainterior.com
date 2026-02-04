import { NextRequest, NextResponse } from "next/server";
import { getTestimonials, updateTestimonials } from "@/lib/data";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    const payload = verifyToken(token || "");
    if (!payload || payload.role !== "developer") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const testimonials = getTestimonials();
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    const payload = verifyToken(token || "");
    if (!payload || payload.role !== "developer") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const testimonials = await req.json();
    await updateTestimonials(testimonials);
    return NextResponse.json({ success: true, message: "Testimonials updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update testimonials" }, { status: 500 });
  }
}

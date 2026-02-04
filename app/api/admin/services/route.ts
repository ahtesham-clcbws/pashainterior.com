import { NextRequest, NextResponse } from "next/server";
import { getServices, updateServices } from "@/lib/data";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    const payload = verifyToken(token || "");
    if (!payload || payload.role !== "developer") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const services = getServices();
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    const payload = verifyToken(token || "");
    if (!payload || payload.role !== "developer") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const services = await req.json();
    await updateServices(services);
    return NextResponse.json({ success: true, message: "Services updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update services" }, { status: 500 });
  }
}

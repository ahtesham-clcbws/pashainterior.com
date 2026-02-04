import { NextRequest, NextResponse } from "next/server";
import { getGlobalData, updateGlobalData } from "@/lib/data";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    const payload = verifyToken(token || "");
    if (!payload || payload.role !== "developer") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const data = getGlobalData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    const payload = verifyToken(token || "");
    if (!payload || payload.role !== "developer") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    await updateGlobalData(data);
    return NextResponse.json({ success: true, message: "Settings updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 });
  }
}

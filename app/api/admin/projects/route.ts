import { NextRequest, NextResponse } from "next/server";
import { getProjects, updateProjects } from "@/lib/data";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    const payload = verifyToken(token || "");
    if (!payload || payload.role !== "developer") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const projects = getProjects();
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    const payload = verifyToken(token || "");
    if (!payload || payload.role !== "developer") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const projects = await req.json();
    await updateProjects(projects);
    return NextResponse.json({ success: true, message: "Projects updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update projects" }, { status: 500 });
  }
}

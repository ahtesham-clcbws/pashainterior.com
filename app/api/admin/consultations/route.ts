import { NextResponse } from "next/server";
import { getConsultations, updateConsultationStatus, deleteConsultation } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("auth_token=")[1]?.split(";")[0];
    const user = verifyToken(token || "");
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const data = getConsultations();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch consultations" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("auth_token=")[1]?.split(";")[0];
    const user = verifyToken(token || "");
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { id, status } = await req.json();
    updateConsultationStatus(id, status);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update status" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("auth_token=")[1]?.split(";")[0];
    const user = verifyToken(token || "");
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { id } = await req.json();
    deleteConsultation(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}

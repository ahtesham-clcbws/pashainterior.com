import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

// Get all contacts
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const contacts = db.prepare("SELECT * FROM contacts ORDER BY createdAt DESC").all();
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

// Mark as read/unread
export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id, isRead } = await req.json();
    const stmt = db.prepare("UPDATE contacts SET isRead = ? WHERE id = ?");
    stmt.run(isRead ? 1 : 0, id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

// Delete contact record
export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    const stmt = db.prepare("DELETE FROM contacts WHERE id = ?");
    stmt.run(id);

    return NextResponse.json({ success: true, message: "Record deleted" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

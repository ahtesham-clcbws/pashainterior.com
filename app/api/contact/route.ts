import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import * as z from "zod";

const submissionSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = submissionSchema.parse(body);
    
    const { name, email, phone, message } = validatedData;
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const stmt = db.prepare(`
      INSERT INTO contacts (name, email, phone, message, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(name, email, phone || null, message, ip, userAgent);

    return NextResponse.json({ success: true, message: "Submission received" }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.flatten() }, { status: 400 });
    }
    console.error("Database error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

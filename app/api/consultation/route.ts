import { NextResponse } from "next/server";
import { createConsultation } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, projectType, budgetRange, description } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json({ success: false, error: "Name and Email are required" }, { status: 400 });
    }

    const newConsultation = {
      id: uuidv4(),
      name,
      email,
      phone,
      projectType,
      budgetRange,
      description,
      createdAt: new Date().toISOString()
    };

    createConsultation(newConsultation);

    return NextResponse.json({ success: true, message: "Consultation request scheduled" });

  } catch (error) {
    console.error("Consultation API Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

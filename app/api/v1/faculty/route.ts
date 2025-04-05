// app/api/faculty/route.ts

import faculty from "@/models/faculty";
import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";

export async function GET() {
  try {
    await connectMongo();

    const allFaculties = await faculty.find({}).select("-password");

    return NextResponse.json({ data: allFaculties }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to fetch faculties", error }, { status: 500 });
  }
}

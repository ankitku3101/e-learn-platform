import { NextRequest, NextResponse } from "next/server";
import course from "@/models/course";
import faculty from "@/models/faculty";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { id, coursename, description, duration } = body;

    // Validate ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
    }

    // Validate required fields
    if (!coursename?.trim()) {
      return NextResponse.json({ message: "Course name is required" }, { status: 400 });
    }
    if (!description?.trim()) {
      return NextResponse.json({ message: "Description is required" }, { status: 400 });
    }

    // Convert duration to Number (if possible)
    duration = Number(duration);
    if (isNaN(duration) || duration <= 0) {
      return NextResponse.json({ message: "Duration must be a valid number" }, { status: 400 });
    }

    await dbConnect();

    // Find faculty email
    const contact = await faculty.findById(id).select("email");
    if (!contact) {
      return NextResponse.json({ message: "Faculty not found" }, { status: 404 });
    }

    // Create new course
    const createdCourse = await course.create({
      faculty: contact._id,
      contact: contact.email,
      coursename,
      description,
      duration,
    });

    return NextResponse.json(
      { message: "Course created successfully", data: createdCourse },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong while creating the course." },
      { status: 500 }
    );
  }
}

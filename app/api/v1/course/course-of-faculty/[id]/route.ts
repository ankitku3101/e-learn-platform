import course from "@/models/course";
import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "ID is not valid or not provided" },
        { status: 400 }
      );
    }

    await dbConnect();

    const matchedDocs = await course.aggregate([
      {
        $match: {
          faculty: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    console.log("Document course fetched successfully for faculty:", id);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully fetched documents",
        data: matchedDocs,
        totalCourses: matchedDocs.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong during fetching courses.",
      },
      { status: 500 }
    );
  }
}

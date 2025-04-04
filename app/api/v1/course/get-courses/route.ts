import { NextRequest,NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import course from "@/models/course";

export async function GET(req:NextRequest){
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page')||"1",10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const skip = (page-1)*limit;

        const courses = await course.aggregate([
            {
                $sort: { createdAt: -1 },
            },
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: limit }],
                    totalCount: [{ $count: "count" }],
                },
            },
            {
                $addFields: {
                    totalCount: { $ifNull: [{ $arrayElemAt: ["$totalCount.count", 0] }, 0] },
                },
            }
        ])

        console.log("Fetched Student Enrollments");

        return NextResponse.json(
            {
                success: true,
                page,
                limit,
                totalCourses: courses[0].totalCount,
                data: courses[0].data,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching paginated courses:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong." },
            { status: 500 }
        );
    }
}
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import student from "@/models/student";
import mongoose from "mongoose";

export async function POST(req:NextRequest){
    try {
        await dbConnect();
        const reqBody = await req.json();
        console.log("Here");
        const {
            userId
        } = reqBody;

        const myEnrolledDocuments = await student.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(userId),
                }
            },
            {
                $lookup: {
                    from: "courses",
                    let: { courseIds: "$enrolledincourse" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$_id", "$$courseIds"] },
                            },
                        },
                        {
                            $project: {
                                enrolledStudents: 0, // Exclude this field
                            },
                        },
                    ],
                    as: "enrolledCourses",
                },
            },
            {
                $project:{
                    enrolledCourses:1,
                    _id:1,
                }
            }
        ])

        return NextResponse.json({message:"Successfully fetched all the populet course docs.",data:myEnrolledDocuments},{status:200});
    } catch (error) {
        return NextResponse.json(
            { message: error.message || "Something went wrong while creating the course." },
            { status: 500 }
        );
    }
}
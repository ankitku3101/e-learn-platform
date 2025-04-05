import dbConnect from "@/lib/mongodb";
import course from "@/models/course";
import mongoose from "mongoose";
import { NextRequest,NextResponse } from "next/server";

interface Param{
    params: Promise<{ id: string }>;
}

export async function GET(request:NextRequest,{params}:Param){
    try {
        //courseId
        const {id} = await params;

        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({message:"Invalid course id provided"},{status:400});
        }

        await dbConnect();

        const document = await course.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(id)
                }
            },
            {
                $project:{
                    enrollCount:{
                        $size:"$enrolledStudents"
                    }
                }
            }
        ])

        const number = document[0]?.enrollCount || 0;

        return NextResponse.json({message:"The Number of students in the course : ",number},{status:200});
    } catch (error) {
        console.error("Enroll count failed", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong." },
            { status: 500 }
        );
    }
}
import course from "@/models/course";
import faculty from "@/models/faculty";
import { NextRequest,NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(req:NextRequest){
    try {
        const requestBody = await req.json();
        const {
            id,
            coursename,
            description,
            duration
        } = requestBody;

        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({message:"Invalid User Id"},{status:400});
        }

        if(!coursename){
            return NextResponse.json({message:"No Coursename provided"},{status:400});
        }

        await dbConnect();

        const contact = await faculty.findById(id).select("-name -username -password -createdCourses -role");

        const createdCourse = await course.create({
            faculty:contact._id,
            contact:contact.email,
            coursename,
            description,
            duration
        })

        console.log("Course Creatd Successfully");
        return NextResponse.json({message:"Course Created successfully",data:createdCourse},{status:200});
    } catch (error:any) {
        return NextResponse.json({message:error.message || "Something went wrong during creating course."},{status:500});
    }
}
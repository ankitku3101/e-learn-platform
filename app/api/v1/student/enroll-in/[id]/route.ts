import student from "@/models/student";
import course from "@/models/course";
import dbConnect from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

interface Params{
    params:{id:string}
}

export async function PATCH(request:NextRequest,{params}:Params) {
    try {
        //courseId
        const {id} = await params;
        const session = await getServerSession(authOptions);
        // const userId = session?.user.id;
        const requestBody = await request.json();
        const {my_id} = requestBody;
        const userId = my_id;

        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({message:"Id not provided or valid"},{status:400})
        }
        
        if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
            return NextResponse.json({message:"Id not provided or valid"},{status:400})
        }

        await dbConnect();

        const updatedStudent = await student.findByIdAndUpdate(userId,{
            $addToSet:{enrolledincourse:id}
        })

        if(!updatedStudent){
            return NextResponse.json({message:"Updated failed in student"},{status:400})
        }

        console.log("Updated Student id with courses")

        const updatedCourse = await course.findByIdAndUpdate(id,{
            $addToSet:{enrolledStudents:userId}
        })

        if(!updatedCourse){
            return NextResponse.json({message:"Updated failed in course"},{status:400})
        }

        console.log("Updated Course with student id");

        return NextResponse.json({message:"Updation successful",data:updatedStudent},{})

    } catch (error) {
        console.error("Error patching student and course", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong." },
            { status: 500 }
        );
    }
}
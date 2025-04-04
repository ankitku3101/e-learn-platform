import dbConnect from "@/lib/mongodb";
import course from "@/models/course";
import { NextResponse,NextRequest } from "next/server";

export async function GET(request:NextRequest){
    try {
        const myDocument = await course.aggregate([
            {
                $project:{
                    coursename:1,
                    enrollCount:{
                        $size:"$enrolledStudents"
                    }
                }
            }
        ])

        console.log("Fetched successfully all the documents and it's enrolled member number");

        return NextResponse.json({message:"Successfully fetched data.",data:myDocument},{status:200});
    } catch (error:any) {
        return NextResponse.json({message:error.message||"Something went wrong"},{status:500});
    }
}
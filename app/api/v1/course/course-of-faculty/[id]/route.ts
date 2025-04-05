import course from "@/models/course";
import dbConnect from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";
import mongoose from "mongoose";

interface Params {
    params: Promise<{ id: string }>;
}

export async function GET(request:NextRequest,{params} : Params){
    try {
        const {id} = await params;

        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({message:"id is not valid or provided"},{status:400});
        }

        await dbConnect();

        const matchedDocs = await course.aggregate([
            {
                $match:{
                    faculty:new mongoose.Types.ObjectId(id),
                }
            },
            {
                $sort:{
                    createdAt:-1
                }
            }
        ])

        console.log("Document course Fetched succesfully of a user");

        return NextResponse.json({message:"Successfully fetched documents",data:matchedDocs},{status:200});
    } catch (error:any) {
        return NextResponse.json({message:error.message || "Something went wrong during creating course."},{status:500});
    }
}
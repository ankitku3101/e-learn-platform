import question from "@/models/question";
import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import quiz from "@/models/quiz";

interface Param{
    params: Promise<{ id: string }>;
}

export async function POST(request:NextRequest,{params}:Param){
    try {
        await dbConnect();

        const {id} = await params;
        const reqBody = await request.json();
        const {
            mainQuestion,
            options,
            correctOption
        } = reqBody;
        
        if(!mainQuestion || !correctOption){
            return NextResponse.json({message:"Question or answer not mentioned"},{status:400});
        }

        if(options.length===0){
            return NextResponse.json({message:"Options are not available"},{status:400});
        }

        const createQuestion = await question.create({
            belongsto:new mongoose.Types.ObjectId(id),
            mainQuestion,
            options,
            correctOption
        })

        await quiz.findByIdAndUpdate(id,{
            $addToSet:{questions:createQuestion._id}
        })

        if(!createQuestion){
            return NextResponse.json({message:"Question created"},{status:400});
        }

        return NextResponse.json({message:"Success Question Creation",data:createQuestion},{status:200});
    } catch (error:any) {
        return NextResponse.json({message:error.message||"Some error happened",error},{status:500});
    }
}
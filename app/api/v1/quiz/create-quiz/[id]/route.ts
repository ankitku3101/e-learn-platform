import quiz from "@/models/quiz";
import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

interface Param{
    params: Promise<{ id: string }>;
}

export async function POST(req:NextRequest,{params}:Param){
    try {
        await dbConnect();
        
        const {id} = await params;
        console.log("Here")
        const reqBody = await req.json();
        const {isactive=false,lastdate} = reqBody;
        

        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({message:"Invalid id"},{status:400});
        }

        const createQuiz = await quiz.create({
            belongsto:new mongoose.Types.ObjectId(id),
            isactive,
            lastdate
        })

        if(!createQuiz){
            return NextResponse.json({message:"Quiz creatoin failed"},{status:400});
        }

        return NextResponse.json({message:"Created quiz",data:createQuiz},{status:200});
    } catch (error:any) {
        return NextResponse.json({message:error.message||"Some error happened",error},{status:500});
    }
}
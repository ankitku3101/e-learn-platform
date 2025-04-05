import module from "@/models/module";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface Param{
    params:{id:string}
}

export async function POST(request:NextRequest,{params}:Param){
    try {
        await dbConnect();

        //Course ID
        const {id} = await params;
        const formBody = await request.formData();
        const description = formBody.get('description')?.toString();

        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({message:"Invalid Id"},{status:400})
        }

        const lastModule = await module.findOne({belongsto:id}).sort({order:-1}).exec();

        const nextOrder = lastModule?.order ? lastModule.order + 1 : 1;

        const moduleCreated = await module.create({
            belongsto:new mongoose.Types.ObjectId(id),
            description:description,
            order:nextOrder
        })

        return NextResponse.json({message:"Module created successfully",data:moduleCreated},{status:200});

    } catch (error:any) {
        return NextResponse.json({message:error.message||"Some error happened",error},{status:500});
    }
}
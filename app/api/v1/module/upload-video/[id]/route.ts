import module from "@/models/module";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import videolesson from "@/models/videolesson";

interface Param{
    params:{id:string}
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req:NextRequest,{params}:Param){
    try {
        const {id} = await params;
        const formBody = await req.formData();
        const name = formBody.get("name")?.toString();
        const fileEntry = formBody.get("file");

        if (!fileEntry || !(fileEntry instanceof File)) {
            return new Response(JSON.stringify({ error: "Invalid file upload" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const file:File = fileEntry;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const base64 = buffer.toString('base64');
        const dataUri = `data:${file.type};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataUri, {
            folder: 'e_learning/files',
        });

        const createVideoLesson = await videolesson.create({
            belongsto:id,
            name:name,
            link:result.secure_url
        })

        return NextResponse.json({message:"File uploaded successfully",data:createVideoLesson},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Something went wrong"},{status:500});
    }
}
import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import module from "@/models/module";

interface Params{
    params: Promise<{ id: string }>;
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req:NextRequest,{params}:Params){
    try {
        //Module ID
        const {id} = await params;
        await dbConnect();

        const formBody = await req.formData();
        const fileEntry = formBody.get('file');

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

        const updateMaterialLink = await module.findByIdAndUpdate(id,{
            $addToSet:{material:result.secure_url}
        },{new:true})

        return NextResponse.json({message:"Material uploaded",data:updateMaterialLink},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Something went wrong"},{status:500});
    }
}
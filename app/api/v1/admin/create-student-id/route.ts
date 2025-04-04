import student from "@/models/student";
import { NextRequest,NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import {hash} from "bcryptjs";

export async function POST(request:NextRequest){
    try {
        
        const requestBody = await request.json();
        const {
            name,
            username,
            email,
            password,
        } = requestBody;
        
        if(!name || !username || !email || !password){
            return NextResponse.json({error:"Among name, username, email, password something is missing."},{status:400})
        }

        await connectMongo();

        const hashedPassword = await hash(password,10);

        const createdStudent = await student.create({
            name,
            username,
            email,
            password:hashedPassword,
        })

        const StudentUser = await student.findById(createdStudent._id).select("-password");

        console.log("User created successfully.");

        return NextResponse.json({message:"Student created Successfully",data:StudentUser},{status:200});
    } catch (error:any) {
        return NextResponse.json({message:error.message||"Some error happened",error},{status:500});
    }
}
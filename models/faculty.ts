import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:[true,"Name is mandatory."],
        },
        username:{
            type:String,
            required:[true,"Username is mandatory."],
            trim:true,
            lowercase:true,
            unique:true
        },
        email:{
            type:String,
            required:[true,"Email is mandatory."],
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required:[true,"Password is mandatory."],
        },
        createdCourses:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"course"
        },
        role: {
            type: String,
            default: "faculty"
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.models.faculty || mongoose.model("faculty",facultySchema);
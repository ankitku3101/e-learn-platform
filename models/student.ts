import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
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
        enrolledincourse:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"course"
            }
        ],
        role:"student"
    },
    {
        timestamps:true
    }
)

export default mongoose.models.student || mongoose.model("student",studentSchema);
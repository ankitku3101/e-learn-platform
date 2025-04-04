import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        belongsto:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"module"
        },
        doc:{
            type:String,
        },
        submissions:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"assignmentSubmission"
            }
        ],
        isactive:{
            type:Boolean,
            default:false,
        },
        lastdate:{
            type:Date,
            required:[true,"Mention the last date."]
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.models.assignment || mongoose.model("assignment",assignmentSchema);
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
        ]
    },
    {
        timestamps:true
    }
)

export default mongoose.models.assignment || mongoose.model("assignment",assignmentSchema);
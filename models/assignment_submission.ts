import mongoose from "mongoose";

const assignmentSubmissionSchema = new mongoose.Schema(
    {
        belongsto:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"assignment"
        },
        submittedby:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"student"
        },
        filelink:{
            type:String
        },
        score:{
            type:Number,
            min:[0,"Score can not be negative"],
            max:[10,"Score can not be more than 10"]
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.models.assignmentSubmission || mongoose.model("assignmentSubmission",assignmentSubmissionSchema);
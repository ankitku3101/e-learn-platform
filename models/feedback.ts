import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        ofcourse:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"course"
        },
        OVERALLRATING:{
            type:Number,
            min:[0,"Rating can not be negative"],
            max:[10,"Rating can not exceed 10."]
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.models.feedback || mongoose.model("feedback",feedbackSchema);
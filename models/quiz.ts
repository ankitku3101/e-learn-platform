import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {
        belongsto:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"module"
        },
        questions:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"question"
            }
        ],
        submissions:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"quizSubmission"
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

export default mongoose.models.quiz || mongoose.model("quiz",quizSchema);
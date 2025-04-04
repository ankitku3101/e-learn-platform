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
        ]
    },
    {
        timestamps:true
    }
)

export default mongoose.models.quiz || mongoose.model("quiz",quizSchema);
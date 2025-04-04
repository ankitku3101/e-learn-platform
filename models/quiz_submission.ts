import mongoose from "mongoose";

const quizSubmissionSchema = new mongoose.Schema(
    {
        belongsto:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"quiz"
        },
        submittedby:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"student"
        },
        answers:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"questionAnswered"
            }
        ],
        score:{
            type:Number,
            min:[0,"Score can not be negative"],
            max:[10,"Score can not be exceed 10"]
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.models.quizSubmission || mongoose.model("quizSubmission",quizSubmissionSchema);
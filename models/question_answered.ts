import mongoose from "mongoose";

const questionAnsweredSchema = new mongoose.Schema(
    {
        belongsto:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"quiz"
        },
        mainQuestion:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"question"
        },
        choosenOption:{
            type:String,
            trim:true,
            lowercase:true
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.models.questionAnswered || mongoose.model("questionAnswered",questionAnsweredSchema);
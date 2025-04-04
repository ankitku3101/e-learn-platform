import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        belongsto:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"quiz"
        },
        mainQuestion:{
            type:String,
            trim:true,
        },
        options:[
            {
                type:String,
                trim:true,
                lowercase:true
            }
        ],
        correctOption:{
            type:String,
            trim:true,
            lowercase:true
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.models.question || mongoose.model("question",questionSchema);
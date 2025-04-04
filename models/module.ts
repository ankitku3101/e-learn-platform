import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
    {
        belongsto:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"course"
        },
        order:{
            type:Number,
            required:true
        },
        description:{
            type:String,
            trim:true,
            validate:{
                validator: function(value:string) {
                    return value.split(/\s+/).filter((word)=> word.length > 0).length <= 100;
                },
                message:"Description must be less than 300 words."
            }
        },
        videos:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"videolesson",
            },
        ],
        material:[
            {
                type:String
            }
        ],
        assignments:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"assignment"
            }
        ],
        quizs:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"quiz"
            }
        ]
    },
    {
        timestamps:true
    }
)

export default mongoose.models.module || mongoose.model("module",moduleSchema)
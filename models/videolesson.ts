import mongoose from "mongoose";

const videolessonSchema = new mongoose.Schema(
    {
        belongsto:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"module"
        },
        name:{
            type:String,
            required:true,
            trim:true,
        },
        link:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.models.videolesson || mongoose.model('videolesson',videolessonSchema)
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        faculty:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"faculty"
        },
        contact:{
            type:String,
            trim:true,
        },
        coursename:{
            type:String,
            required:[true,"Course Name is essential"]
        },
        description:{
            type:String,
            trim:true,
            validate:{
                validator: function(value:string) {
                    return value.split(/\s+/).filter((word)=> word.length > 0).length <= 300;
                },
                message:"Description must be less than 300 words."
            }
        },
        modules:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"module"
            }
        ],
        duration:{
            type:Number
        },
        feedback:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"feedback"
            }
        ],
        enrolledStudents:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"student"
            }
        ]
    },
    {
        timestamps:true
    }
)

export default mongoose.models.course || mongoose.model('course',courseSchema);
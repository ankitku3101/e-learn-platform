import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination:function(_req,_res,cb){
        cb(null,path.join(process.cwd(),"public/temp"));
    },
    filename:function(_req,file,cb){
        cb(null,file.originalname+"_"+Date.now());
    }
})

export const upload = multer({storage});

/**

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

This is my assignment submission schema.

What will happen is that the student will upload a pdf file of the given assignment question.,

So i have to use

 */
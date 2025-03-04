import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    imgUrl:{
        String:String
    },
    author:{
        type:mongoose.Types.Schema.ObjectId,
        ref:"User"
    },
    comments:[
        {
            type:mongoose.Types.Schema.ObjectId,
            ref:"User",
            comment:String
        }
    ],
    likes:[
        {
            type:mongoose.Types.Schema.ObjectId,
            ref:"User",
            comment:String
        }
    ]
},{timestamps:true})

export const PostModel = mongoose("PostModel",postSchema)
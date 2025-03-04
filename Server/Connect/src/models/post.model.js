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
        type:String,
        required:true
    }
},{timestamps:true})

export const PostModel = mongoose("PostModel",postSchema)
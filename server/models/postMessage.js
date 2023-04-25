import mongoose from "mongoose";

//Schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String, //image to string
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

//Model

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
import mongoose from "mongoose";

//Schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String, //image to string
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

//Model

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
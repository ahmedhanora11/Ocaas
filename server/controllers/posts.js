import PostMessage from '../models/postMessage.js';

// All routes functions will be here
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost = (req, res) => {
    const body = req.body;
    
    try {
        
    } catch (error) {
        
    }
}
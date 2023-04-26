import express from "express";
import { getPosts, createPost, updatePost, likePost, deletePost } from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();
// All main routes will be here
//5000/posts

//auth here for actions that needs permisions 
router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost); //user can control only their posts
router.delete('/:id', auth, deletePost); //user can delete only their posts
router.patch('/:id/likePost', auth, likePost); //liking one post only at the backend

export default router;
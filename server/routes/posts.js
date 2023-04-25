import express from "express";
import { getPosts, createPost, updatePost, likePost, deletePost } from "../controllers/posts.js";

const router = express.Router();
// All main routes will be here
//5000/posts
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;
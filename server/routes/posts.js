import express from "express";
import { getPosts, createPost, updatePost, likePost, deletePost, getPostsBySearch, getPost, commentPost } from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();
// All main routes will be here
//5000/posts

//auth here for actions that needs permisions 
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost); //user can control only their posts
router.delete('/:id', auth, deletePost); //user can delete only their posts
router.patch('/:id/likePost', auth, likePost); //liking one post only at the backend
router.post('/:id/commentPost', auth, commentPost); //liking one post only at the backend

export default router;
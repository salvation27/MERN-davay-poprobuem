import { Router } from "express";
import { createPost } from "../controllers/posts.js";
import { checkAuth } from "../utils/checkAuth.js";


const router = new Router();

//     http://localhost:3000/api/posts

// create posts
router.post("/create",checkAuth, createPost);

export default router;

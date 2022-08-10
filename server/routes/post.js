import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostsById,
  getMyPosts,
  removePost,
  updatePost,
  getPostComments,
} from "../controllers/posts.js";
import { checkAuth } from "../utils/checkAuth.js";


const router = new Router();

//     http://localhost:1234/api/posts

// create posts
//     http://localhost:1234/api/posts/create
router.post("/create",checkAuth, createPost);
// create posts
//     http://localhost:3000/api/posts/
router.get("/", getPosts);
// get one post by id
//     http://localhost:3000/api/posts/:id
router.get("/:id", getPostsById);

// get my posts 
//     http://localhost:3000/api/posts/user/me
router.get("/user/me", checkAuth, getMyPosts);

// remove post
//     http://localhost:3000/api/posts/:id
router.delete("/:id", checkAuth, removePost);

// update post
//     http://localhost:3000/api/posts/:id
router.put("/:id", checkAuth, updatePost);

// get post comment
//     http://localhost:3000/api/posts/comments/:id
router.get("/comments/:id", checkAuth, getPostComments);

export default router;

import { Router } from "express";
import { createComment } from "../controllers/comments.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// create comment
//     http://localhost:3000/api/comments/:id
router.post("/:id",checkAuth, createComment);


export default router;

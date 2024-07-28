import express from "express";
import {getFeedPosts,getUserPosts,likePost}from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/",verifyToken,getFeedPosts);
router.get("/:userID/posts",verifyToken,getUserPosts);
// router.get("/userID/portfolio",verifyToken,getUserPortfolio);

//UPDATE
router.patch("/:id/like",verifyToken,likePost);

export default router;

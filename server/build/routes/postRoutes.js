import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
switch (process.env.NODE_ENV) {
    case "development":
        dotenv.config({ path: path.resolve(__dirname, '../../.env') });
        break;
    case "production":
        dotenv.config();
        break;
    // Add 'staging' and 'production' cases here as well!
    default:
        throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`);
}
//dotenv.config({ path: path.resolve(__dirname, '../../.env') })
import express from "express";
import { validatePost } from './validators/validatePost.js';
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post.js";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const router = express.Router();
// GET ALL POSTS
router.route("/")
    .get(async (_request, response) => {
    try {
        const posts = await Post.find({});
        const cleanedPosts = posts
            ?.map((post) => ({
            id: post._id,
            prompt: post.prompt,
            name: post.name,
            photo: post.photo
        }))
            .reverse();
        response
            .status(200)
            .json({
            success: true,
            posts: cleanedPosts
        });
    }
    catch (error) {
        response
            .status(500)
            .json({
            success: false,
            message: "Oops, our mistake! We encountered a problem, but don't worry, we're fixing it right now! 😊"
        });
    }
})
    .post(validatePost, async (request, response) => {
    try {
        const { name, prompt, photo } = request.body;
        const cloudinaryPhoto = await cloudinary.uploader.upload(photo);
        const newPost = await Post.create({
            name,
            prompt,
            photo: cloudinaryPhoto.url
        });
        response
            .status(201)
            .json({
            success: true,
            data: newPost
        });
    }
    catch (error) {
        response
            .status(500)
            .json({
            success: false,
            message: "Oops, our mistake! We encountered a problem, but don't worry, we're fixing it right now! 😊"
        });
    }
});
export default router;

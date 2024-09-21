import express, { Router, type Request, type Response } from "express";
import { validatePost } from "./validators/validatePost.js";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router: Router = express.Router();

router
  .route("/")
  .get(async (_request: Request, response: Response) => {
    try {
      const posts = await Post.find({});

      const cleanedPosts = posts
        ?.map((post) => ({
          id: post._id,
          prompt: post.prompt,
          name: post.name,
          photo: post.photo,
        }))
        .reverse();

      response.status(200).json({
        posts: cleanedPosts,
      });
    } catch (error) {
      let messsage =
        "Oops, our mistake! We encountered a problem, but don't worry, we're fixing it right now! 😊";

      if (error instanceof Error) {
        messsage = error.message;
      }

      response.status(500).json({
        error: messsage,
      });
    }
  })
  .post(validatePost, async (request: Request, response: Response) => {
    try {
      const { name, prompt, photo } = request.body;

      const cloudinaryPhoto = await cloudinary.uploader.upload(photo);
      const newPost = await Post.create({
        name,
        prompt,
        photo: cloudinaryPhoto.url,
      });

      response.status(201).json({
        post: newPost,
      });
    } catch (error) {
      let message =
        "Oops, our mistake! We encountered a problem, but don't worry, we're fixing it right now! 😊";

      if (error instanceof Error) {
        message = error.message;
      }
      response.status(500).json({
        error: message,
      });
    }
  });

export default router;

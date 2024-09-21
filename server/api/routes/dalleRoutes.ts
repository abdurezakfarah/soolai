import { validatePrompt } from "./validators/validatePrompt.js";
import express, { Router, type Request, type Response } from "express";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const router: Router = express.Router();

router
  .route("/")
  .post(validatePrompt, async (request: Request, response: Response) => {
    try {
      const { prompt } = request.body;

      const imageResponse = await openai.images.generate({
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
      });

      const image = imageResponse.data[0].b64_json;

      response.status(200).json({
        success: true,
        photo: image,
      });
    } catch (error) {
      console.log(error);

      let message =
        "Oops, our mistake! We encountered a problem, but don't worry, we're fixing it right now! 😊";
      if (error instanceof Error) {
        message = error.message;
      }
      response.status(500).json({
        success: false,
        message,
      });
    }
  });

export default router;

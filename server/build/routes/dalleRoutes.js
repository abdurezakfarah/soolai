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
import { validatePrompt } from './validators/validatePrompt.js';
import express from "express";
import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
const router = express.Router();
router.route("/")
    .post(validatePrompt, async (request, response) => {
    try {
        const { prompt } = request.body;
        const imageResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });
        const image = imageResponse.data[0].b64_json;
        response
            .status(200)
            .json({
            success: true,
            photo: image
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

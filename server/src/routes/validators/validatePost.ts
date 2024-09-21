import { type Request, type Response, type NextFunction } from "express";
import Joi from "joi";

export const validatePost = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    prompt: Joi.string().min(3).required(),
    photo: Joi.string().dataUri().required(),
  });
  const { error } = schema.validate(request.body);
  if (error) {
    response.status(400).json({
      status: 404,
      statusText: "Bad Request",
      error: error?.details?.[0]?.message,
    });
  }
  next();
};

import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validatePrompt = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    prompt: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(request.body);

  if (error) {
    response.status(400).json({
      success: false,
      status: 404,
      statusText: "Bad Request",
      error: true,
      message: error?.details?.[0]?.message,
    });
  }

  next();
};

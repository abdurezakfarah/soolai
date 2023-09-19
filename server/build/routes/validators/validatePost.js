import Joi from 'joi';
export const validatePost = (request, response, next) => {
    const schema = Joi.object({
        name: Joi.
            string()
            .min(3)
            .required(),
        prompt: Joi
            .string()
            .min(3)
            .required(),
        photo: Joi
            .string()
            .dataUri()
            .required(),
    });
    const { error } = schema.validate(request.body);
    if (error) {
        response
            .status(400)
            .json({
            success: false,
            status: 404,
            statusText: "Bad Request",
            error: true,
            message: error?.details?.[0]?.message
        });
    }
    next();
};

import Joi from 'joi';

export const registerCredential = Joi.object({
    url: Joi.string().uri().required(),
    title: Joi.string().min(1).max(32).required(),
    username: Joi.string().required(),
    password: Joi.string().required()
});
import joi from 'joi'; 

export const signUpSchema = joi.object({
    name: joi.string(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required()

})

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required()

})
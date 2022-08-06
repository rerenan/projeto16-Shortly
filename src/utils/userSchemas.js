import joi from "joi";

const signUpUserSchema = joi.object({
    name: joi.string().max(70).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).messages({
        'any.only': "password and confirmPassword they're not the same"
    })
})

const signInUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

export {
    signUpUserSchema,
    signInUserSchema
}
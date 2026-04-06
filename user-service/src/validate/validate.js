import Joi from 'joi';

export const signValidate = Joi.object ({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('customer', 'seller', 'admin').default('customer')
});

export const loginValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});
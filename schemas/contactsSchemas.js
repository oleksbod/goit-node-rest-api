import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(), // від 3 до 30 символів, обов’язкове поле
    email: Joi.string().email().required(), // повинен бути коректним email, обов’язкове поле
    phone: Joi.string()
        .pattern(/^[0-9\-\+\s]{7,15}$/) // дозволяє цифри, +, -, пробіли (від 7 до 15 символів), обов’язкове поле
        .required(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^[0-9\-\+\s]{7,15}$/),
}).min(1);

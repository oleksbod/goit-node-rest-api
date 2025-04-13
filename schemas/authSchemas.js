import Joi from "joi";

import { emailRegexp } from "../constants/auth.js";

export const authRegisterSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

export const authLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

export const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
});

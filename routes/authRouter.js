import express from "express";
import authControllers from "../controllers/authControllers.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";

import validateBody from "../decorators/validateBody.js";

import { authRegisterSchema, authLoginSchema, updateSubscriptionSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(authRegisterSchema), authControllers.register);

authRouter.post("/login", isEmptyBody, validateBody(authLoginSchema), authControllers.login);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/current", authenticate, authControllers.current);

authRouter.patch(
    "/subscription",
    authenticate,
    isEmptyBody,
    validateBody(updateSubscriptionSchema),
    authControllers.updateSubscription
);

export default authRouter;

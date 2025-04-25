import express from "express";
import authControllers from "../controllers/authControllers.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";

import validateBody from "../decorators/validateBody.js";

import upload from "../middlewares/upload.js";

import {
    authRegisterSchema,
    authLoginSchema,
    updateSubscriptionSchema,
    authVerifySchema,
} from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import isFileExist from "../middlewares/isFileExist.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(authRegisterSchema), authControllers.register);

authRouter.post("/login", isEmptyBody, validateBody(authLoginSchema), authControllers.login);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/verify/:verificationToken", authControllers.verify);

authRouter.post("/verify", isEmptyBody, validateBody(authVerifySchema), authControllers.resendVerifyEmail);

authRouter.get("/current", authenticate, authControllers.current);

authRouter.patch(
    "/subscription",
    authenticate,
    isEmptyBody,
    validateBody(updateSubscriptionSchema),
    authControllers.updateSubscription
);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), isFileExist, authControllers.updateAvatar);

export default authRouter;

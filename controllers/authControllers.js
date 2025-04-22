import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";
import compareHash from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";

import path from "node:path";
import fs from "fs/promises";

const avatarsDir = path.resolve("public", "avatars");

const register = async (req, res) => {
    const { email } = req.body;
    const user = await authServices.findUser({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const newUser = await authServices.saveUser(req.body);

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    const comparePassword = await compareHash(password, user.password);
    if (!comparePassword) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user.id };

    const token = createToken(payload);

    await authServices.saveUserToken({ id: user.id, token });

    res.json({
        token: token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

const logout = async (req, res) => {
    const user = req.user;
    await authServices.saveUserToken({ id: user.id, token: null });
    res.sendStatus(204);
};

const current = (req, res) => {
    const user = req.user;
    res.status(200).json({
        email: user.email,
        subscription: user.subscription,
    });
};

const updateSubscription = async (req, res) => {
    const { id } = req.user;
    const { subscription } = req.body;

    const updatedUser = await authServices.updateUserSubscription({ id, subscription });
    if (!updatedUser) {
        throw HttpError(404, "Not found");
    }

    res.status(200).json({
        email: updatedUser.email,
        subscription: updatedUser.subscription,
    });
};

const updateAvatar = async (req, res) => {
    const { path: tempPath, originalname } = req.file;
    const { id } = req.user;

    const ext = path.extname(originalname);
    const filename = `${id}${ext}`;
    const finalPath = path.join(avatarsDir, filename);

    try {
        await fs.rename(tempPath, finalPath);

        const avatarURL = `/avatars/${filename}`;
        await authServices.updateUserAvatar({ id, avatarURL });

        res.status(200).json({ avatarURL });
    } catch (err) {
        await fs.unlink(tempPath);
        throw HttpError(500, "Failed to process image");
    }
};

export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    current: ctrlWrapper(current),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
};

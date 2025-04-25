import gravatar from "gravatar";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import User from "../db/models/user.js";
import sendEmail from "../helpers/sendEmail.js";
import HttpError from "../helpers/HttpError.js";

const { APP_DOMAIN } = process.env;

const createVerifyEmail = (email, verificationToken) => ({
    to: email,
    subject: "Verify email",
    html: `<a href="${APP_DOMAIN}/api/auth/verify/${verificationToken}" target="_blank">Click verify email</a>`,
});

export const findUser = (filter) => User.findOne({ where: filter });

export const saveUser = async (data) => {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const verificationToken = nanoid();
    const avatarURL = gravatar.url(data.email, { s: "250", d: "retro" }, true);

    const newUser = User.create({ ...data, password: hashPassword, avatarURL, verificationToken });

    const verifyEmail = createVerifyEmail(data.email, verificationToken);

    await sendEmail(verifyEmail);

    return newUser;
};

export const saveUserToken = async ({ id, token }) => {
    return User.update({ token }, { where: { id } });
};

export const updateUserSubscription = async ({ id, subscription }) => {
    const user = await findUser({ id });
    if (!user) return null;

    return user.update(
        { subscription },
        {
            returning: true,
        }
    );
};

export const updateUserAvatar = async ({ id, avatarURL }) => {
    const user = await findUser({ id });
    if (!user) return null;

    return user.update(
        { avatarURL },
        {
            returning: true,
        }
    );
};

export const verifyUser = async (verificationToken) => {
    console.log(verificationToken);

    const user = await findUser({ verificationToken });
    console.log(user);
    if (!user) {
        throw HttpError(404, "User not found");
    }

    await user.update({ verificationToken: null, verify: true });
};

export const resendVerifyEmail = async (email) => {
    const user = await findUser({ email });
    if (!user) {
        throw HttpError(404, "User not found");
    }
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }

    if (!user.verificationToken) {
        const verificationToken = nanoid();
        await user.update({ verificationToken: verificationToken });
    }

    const verifyEmail = createVerifyEmail(email, user.verificationToken);

    await sendEmail(verifyEmail);
};

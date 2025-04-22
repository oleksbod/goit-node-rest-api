import gravatar from "gravatar";
import bcrypt from "bcrypt";

import User from "../db/models/user.js";

export const findUser = (filter) => User.findOne({ where: filter });

export const saveUser = async (data) => {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const avatarURL = gravatar.url(data.email, { s: "250", d: "retro" }, true);
    return User.create({ ...data, password: hashPassword, avatarURL });
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

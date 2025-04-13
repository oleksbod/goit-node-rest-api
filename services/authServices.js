import bcrypt from "bcrypt";

import User from "../db/models/user.js";

export const findUser = (filter) => User.findOne({ where: filter });

export const saveUser = async (data) => {
    const hashPassword = await bcrypt.hash(data.password, 10);
    return User.create({ ...data, password: hashPassword });
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

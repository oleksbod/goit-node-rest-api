import User from "../db/models/user.js";

export const listContacts = () => User.findAll();

export const getContactById = (id) => User.findByPk(id);

export const removeContact = (id) =>
    User.destroy({
        where: {
            id,
        },
    });

export const addContact = (data) => User.create(data);

export const updateContact = async (id, data) => {
    const user = await getContactById(id);
    if (!user) return null;

    return user.update(data, {
        returning: true,
    });
};

export const updateStatusContact = async (id, data) => {
    const user = await getContactById(id);
    if (!user) return null;

    return user.update(data, {
        returning: true,
    });
};

export default { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact };

import Contact from "../db/models/сontact.js";

export const listContacts = (query, limit, offset) =>
    Contact.findAndCountAll({
        where: query,
        limit,
        offset,
    });

export const getContact = (query) => Contact.findOne({ where: query });

export const removeContact = (query) => Contact.destroy({ where: query });

export const addContact = (data) => Contact.create(data);

export const updateContact = async (query, data) => {
    const contact = await getContact(query);
    if (!contact) return null;

    return contact.update(data, {
        returning: true,
    });
};

export const updateStatusContact = async (query, data) => {
    const contact = await getContact(query);
    if (!contact) return null;

    return contact.update(data, {
        returning: true,
    });
};

export default { listContacts, getContact, removeContact, addContact, updateContact, updateStatusContact };

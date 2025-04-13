import Contact from "../db/models/contact.js";

export const listContacts = () => Contact.findAll();

export const getContactById = (id) => Contact.findByPk(id);

export const removeContact = (id) =>
    Contact.destroy({
        where: {
            id,
        },
    });

export const addContact = (data) => Contact.create(data);

export const updateContact = async (id, data) => {
    const Contact = await getContactById(id);
    if (!Contact) return null;

    return Contact.update(data, {
        returning: true,
    });
};

export const updateStatusContact = async (id, data) => {
    const Contact = await getContactById(id);
    if (!Contact) return null;

    return Contact.update(data, {
        returning: true,
    });
};

export default { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact };

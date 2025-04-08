import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await contactsService.listContacts();
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await contactsService.getContactById(id);
        if (!contact) {
            throw HttpError(404, "Not found");
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const removedContact = await contactsService.removeContact(id);
        if (!removedContact) {
            throw HttpError(404, "Not found");
        }
        res.json({
            message: "Delete successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const newContact = await contactsService.addContact(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedContact = await contactsService.updateContact(id, req.body);
        if (!updatedContact) {
            throw HttpError(404, "Not found");
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        next(error);
    }
};

export const updateStatusContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { favorite } = req.body;

        const updatedContact = await contactsService.updateStatusContact(contactId, { favorite });

        if (!updatedContact) {
            throw HttpError(404, "Not found");
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        next(error);
    }
};

import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const { id: owner } = req.user;
        //pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        //filter favorites
        const filter = { owner };
        if (req.query.favorite !== undefined) {
            filter.favorite = req.query.favorite === "true";
        }

        const { count, rows: contacts } = await contactsService.listContacts(filter, limit, offset);

        res.status(200).json({
            total: count,
            page,
            limit,
            contacts,
        });
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id: owner } = req.user;
        const contact = await contactsService.getContact({ id, owner });
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
        const { id: owner } = req.user;
        const removedContact = await contactsService.removeContact({ id, owner });
        if (!removedContact) {
            throw HttpError(404, "Not found");
        }
        res.status(200).json(removedContact);
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const { id: owner } = req.user;
        const newContact = await contactsService.addContact({ ...req.body, owner });
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id: owner } = req.user;
        const updatedContact = await contactsService.updateContact({ id, owner }, req.body);
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
        const { contactId: id } = req.params;
        const { favorite } = req.body;
        const { id: owner } = req.user;

        const updatedContact = await contactsService.updateStatusContact({ id, owner }, { favorite });

        if (!updatedContact) {
            throw HttpError(404, "Not found");
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        next(error);
    }
};

export default {
    getAll: ctrlWrapper(getAllContacts),
    getById: ctrlWrapper(getOneContact),
    add: ctrlWrapper(createContact),
    updateById: ctrlWrapper(updateContact),
    deleteById: ctrlWrapper(deleteContact),
    updateStatus: ctrlWrapper(updateStatusContact),
};

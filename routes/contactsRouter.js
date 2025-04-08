import express from "express";
import {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
    updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", isEmptyBody, validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", isEmptyBody, validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:contactId/favorite", isEmptyBody, validateBody(updateFavoriteSchema), updateStatusContact);

export default contactsRouter;

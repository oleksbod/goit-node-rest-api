import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import validateBody from "../decorators/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:id", contactsControllers.getById);

contactsRouter.delete("/:id", contactsControllers.deleteById);

contactsRouter.post("/", isEmptyBody, validateBody(createContactSchema), contactsControllers.add);

contactsRouter.put("/:id", isEmptyBody, validateBody(updateContactSchema), contactsControllers.updateById);

contactsRouter.patch(
    "/:contactId/favorite",
    isEmptyBody,
    validateBody(updateFavoriteSchema),
    contactsControllers.updateStatus
);

export default contactsRouter;

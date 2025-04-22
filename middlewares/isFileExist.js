import HttpError from "../helpers/HttpError.js";

const isFileExist = (req, res, next) => {
    if (!req.file) {
        return next(HttpError(400, "File not exist!"));
    }
    next();
};

export default isFileExist;

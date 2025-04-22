import multer from "multer";
import path from "node:path";
import HttpError from "../helpers/HttpError.js";

const tempDir = path.resolve("temp");

const storage = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, callback) => {
        const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
        const filename = `${uniquePrefix}_${file.originalname}`;
        callback(null, filename);
    },
});

const limits = {
    fileSize: 1024 * 1024 * 5, // 5MB
};

const fileFilter = (req, file, callback) => {
    const extension = path.extname(file.originalname);
    if (extension !== ".png" && extension !== ".jpg" && extension !== ".jpeg") {
        return callback(HttpError(400, "Please upload a valid image file (.png, .jpg, .jpeg)"));
    }
    callback(null, true);
};

const upload = multer({
    storage,
    limits,
    fileFilter,
});

export default upload;

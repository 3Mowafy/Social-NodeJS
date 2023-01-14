const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/");
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLocaleLowerCase();
        if (
            ext !== ".png" &&
            ext !== ".jpg" &&
            ext !== ".gif" &&
            ext !== ".jpeg"
        )
            return cb(new Error("Invalid Extension"), false);
        cb(null, true);
    },
});

module.exports = upload;

const multer = require("multer");
const path = require("path");

const upload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 1024 * 1024 * 2 },
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

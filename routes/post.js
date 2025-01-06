const multer = require("multer");

const express = require("express");

const router = express.Router();

const controller = require("../controllers/post");

const path = require("path");

const MIME_TYPE = {
  "image/jpg": "jpg",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("file format is not an image");
    if (isValid) {
      error = null;
    }
    cb(error, path.join(__dirname, "../", "public/uploads"));
  },

  //  cb(error, "public/uploads");
  //  path.join(__dirname, 'public/uploads')
  filename: (req, file, cb) => {
    const name = `${file.originalname.toLocaleLowerCase().split(".")[0]}`;
    const uniqueSuffix = `${file.fieldname}-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}`;
    const ext = MIME_TYPE[file.mimetype];
    cb(null, `${uniqueSuffix}-${name}.${ext}`);
  },
});

router.get("/getAll", controller.getAll);

router.get("/getOne/:id", controller.getOne);

router.post("/insert", multer({ storage }).single("image"), controller.insert);

router.put(
  "/update/:id",
  multer({ storage }).single("image"),
  controller.update
);

router.delete("/delete/:id", controller.delete);

module.exports = router;

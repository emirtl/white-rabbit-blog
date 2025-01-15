const multer = require("multer");

const express = require("express");

const router = express.Router();

const controller = require("../controllers/post");

const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

router.get("/getAll", controller.getAll);

router.post("/insert", isAuth, isAdmin, controller.insert);

router.delete("/delete/:id", isAuth, isAdmin, controller.delete);

module.exports = router;

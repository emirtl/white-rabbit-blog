const express = require("express");

const router = express.Router();

const controller = require("../controllers/category");

const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

router.get("/getAll", controller.getAll);

router.post("/insert", controller.insert);

router.delete("/delete/:id", controller.delete);

module.exports = router;

const express = require("express");

const router = express.Router();

const controller = require("../controllers/auth");

const {
  userRegistrationValidation,
} = require("../middleware/userRegistrationValidation");

const { userLoginValidation } = require("../middleware/userLoginValidation");

router.post("/register", userRegistrationValidation, controller.register);

router.post("/login", userLoginValidation, controller.login);

module.exports = router;

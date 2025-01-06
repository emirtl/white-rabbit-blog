const { body } = require("express-validator");

exports.userLoginValidation = [
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email cannot be empty")
    .bail()
    .isEmail()
    .withMessage("email is not valid"),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password cannot be empty."),
];

const User = require("../models/user");
const bc = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(401).json({ error: "body is needed" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const hashedPss = await bc.hash(password, 10);

    if (!hashedPss) {
      return res
        .status(500)
        .json({ error: "something went wrong please try later" });
    }

    let user = new User({
      username,
      email,
      password: hashedPss,
    });

    user = await user.save();

    if (!user) {
      return res
        .status(500)
        .json({ error: "something went wrong please try later" });
    }

    return res.status(201).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "something went wrong please try later", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: "body is needed" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const existedUser = await User.findOne({ email }).exec();

    if (!existedUser) {
      return res
        .status(401)
        .json({ error: "user with these credentials does not exist" });
    }

    const isMatch = await bc.compare(password, existedUser.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "user with these credentials does not exist" });
    }

    const token = jwt.sign(
      {
        email: existedUser.email,
        id: existedUser.id,
      },
      process.env.JWT_SECRET,
      { algorithm: "HS256", expiresIn: 18000 }
    );

    if (!token) {
      return res
        .status(401)
        .json({ error: "something went wrong please try later" });
    }
    return res.status(200).json({ token });
  } catch (error) {
    return res
      .status(401)
      .json({ error: "something went wrong please try later", error });
  }
};

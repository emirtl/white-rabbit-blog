const Category = require("../models/category");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find().exec();
    if (!categories) {
      return res.status(500).json({ error: "no categoriess found" });
    }
    return res.status(200).json({ categories });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "something went wrong. please try later", error });
  }
};

exports.insert = async (req, res) => {
  try {
    const title = req.body.title;
    if (!title) {
      return res.status(403).json({ error: "body is needed" });
    }

    let category = new Category({
      title,
    });

    category = await category.save();
    if (!category) {
      return res
        .status(500)
        .json({ error: "something went wrong. please try later" });
    }

    return res.status(201).json({ category });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "something went wrong. please try later", error });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(401).json({ error: "category id is needed" });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(401).json({ error: "category id is not valid" });
    }

    const deletedCategory = await Category.findByIdAndDelete(id).exec();

    if (!deletedCategory) {
      return res
        .status(500)
        .json({ error: "deletion failed. something went wrong" });
    }

    return res.status(200).json({ deletedCategory });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "something went wrong. please try later", error });
  }
};

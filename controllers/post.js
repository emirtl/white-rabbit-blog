const post = require("../models/post");
const Post = require("../models/post");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find().exec();
    if (!posts) {
      return res.status(500).json({ error: "no posts found" });
    }
    return res.status(200).json({ posts });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "something went wrong. please try later", error });
  }
};

exports.getOne = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(403).json({ error: "post id is needed" });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(401).json({ error: "post id is not valid" });
    }

    const post = await Post.findById(id).exec();
    if (!post) {
      return res.status(500).json({ error: "no post found" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "something went wrong. please try later", error });
  }
};

exports.insert = async (req, res) => {
  try {
    const { title, description, richDescription } = req.body;
    if (!title || !description || !richDescription) {
      return res.status(403).json({ error: "body is needed" });
    }

    if (!req.file) {
      return res.status(403).json({ error: "image is needed" });
    }

    const imagePath = `${req.protocol}://${req.get("host")}/public/uploads/${
      req.file.filename
    }`;

    let post = new Post({
      title,
      description,
      richDescription,
      image: imagePath,
    });

    post = await post.save();
    if (!post) {
      return res
        .status(500)
        .json({ error: "something went wrong. please try later" });
    }

    return res.status(201).json({ post });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "something went wrong. please try later", error });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(403).json({ error: "post id is needed" });
    }

    const { title, description, richDescription } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(401).json({ error: "post id is not valid" });
    }

    const existedPost = await Post.findById(id).exec();

    if (!existedPost) {
      return res.status(401).json({ error: "post does not exist" });
    }
    let imagePath;

    if (req.file) {
      imagePath = `${req.protocol}://${req.get("host")}/public/uploads/${
        req.file.filename
      }`;
    } else {
      imagePath = existedPost.image;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, {
      title,
      description,
      richDescription,
      image: imagePath,
    });

    if (!updatedPost) {
      return res
        .status(500)
        .json({ error: "somehing went wrong. please try later" });
    }

    return res.status(200).json({ updatedPost });
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
      return res.status(401).json({ error: "post id is needed" });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(401).json({ error: "post id is not valid" });
    }

    const deletedPost = await Post.findByIdAndDelete(id).exec();
    if (deletedPost) {
      return res
        .status(500)
        .json({ error: "deletion failed. something went wrong" });
    }
    return res.status(200).json({ message: "post deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "something went wrong. please try later", error });
  }
};

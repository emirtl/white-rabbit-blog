const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true, maxLength: 190 },
    richDescription: { type: String, required: true, minLength: 20 },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

postSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

postSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Post", postSchema);

const express = require("express");

require("dotenv").config();

const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 9000;

const morgan = require("morgan");

const helmet = require("helmet");

const cors = require("cors");

const path = require("path");

main()
  .then(() => {
    console.log("connected to mongoDb");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGOOSE_USER}:${process.env.MONGOOSE_PASSWORD}@master.xebze3l.mongodb.net/${process.env.MONGOOSE_DATABSE_NAME}`
  );

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use("/public/uploads", express.static(path.join("public/uploads")));

//routes
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/post");

const errorHandler = require("./middleware/error");

app.use(`${process.env.API}/auth`, authRoutes);
app.use(`${process.env.API}/posts`, postsRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("connected to http://localhost:9000");
});

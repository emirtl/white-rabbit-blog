const errorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json("Unauthorized Error...!");
  } else if (err.name === "ValidationError") {
    return res.status(401).json("Validation Error...!");
  } else if (err.code == 11000) {
    return res.status(401).json("duplicate key error...!");
  } else {
    return res.status(401).json("something went wrong. please try later...!");
  }
};

module.exports = errorHandler;

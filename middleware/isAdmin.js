module.exports = (req, res, next) => {
  if (req.isAdmin) {
    return next();
  } else {
    return res.status(401).json({ error: "user is not admin" });
  }
};

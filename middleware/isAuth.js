const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization Failed" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "not authorized" });
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);

    if (!decodedToken) {
      console.log("decodedToken error", decodedToken);
      return res.status(401).json({ error: "not authorized" });
    } else {
      req.userId = decodedToken.id;
      req.isAdmin = decodedToken.isAdmin;

      return next();
    }
  } catch (error) {
    return res.status(401).json({ error: "authorization failed", error });
  }
};

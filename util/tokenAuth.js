const jwt = require("jsonwebtoken");
const withAuth = function (req, res, next) {
  const token = req.headers?.authorization?.split(" ").pop();
  console.log(token);
  if (!token) {
    return res.status(401).json({ msg: "invalid credentials" });
  }
  try {
    const info = jwt.verify(token, process.env.JWT_SECRET);
    console.log(info);
    req.user= info.userId
    next()
  } catch (err) {
    return res.status(401).json({ msg: "invalid credentials" });
  }
};

module.exports = {
    withAuth
}
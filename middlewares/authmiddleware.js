const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {

  try {

    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = await User.findById(decoded.id);

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });

  }
};

module.exports = protect;
const jwt = require("jsonwebtoken");
// we use this middleware in routes for authorization for some process 
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    // if user has token check is token belong to user
    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = auth;

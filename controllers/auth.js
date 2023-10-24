const Auth = require("../models/auth.js");
const bcrypt = require("bcryptjs"); // crypto
const jwt = require("jsonwebtoken"); // token

const register = async (req, res) => {
  try {
    //destructure req.body
    const { username, email, password } = req.body;
    // check user if it's already in database
    const user = await Auth.findOne({ email });
    if (user) {
      return res
        .status(409) //conflict
        .json({ message: "Bu email hesabı zaten bulunmakta!" });
    }
    if (password && password.length < 6) {
      return res
        .status(401)
        .json({ message: "Parolanız en az 6 karakter olmalıdır." });
    }
    // crypto password
    const passwordHash = await bcrypt.hash(password, 12);
    // create new user
    const newUser = await Auth.create({
      username,
      email,
      password: passwordHash,
    });
    // Encode the JWT token
    // token = jwt.encode(payload, secret_key, algorithm="HS256")
    const userToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      status: "OK",
      newUser,
      userToken,
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Kullanıcı bulunamadı." });
    }

    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame) {
      return res.status(401).json({ message: "Parolanız yanlış" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      status: "OK",
      user,
      token,
    });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};

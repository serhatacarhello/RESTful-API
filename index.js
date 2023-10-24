const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/database.js");
const Auth = require("./routes/auth.js");
const Post = require("./routes/post.js");
const parsedKey = dotenv.config();
const app = express(); // create app
app.use(cors());

// for controllers
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// /register
//routing
app.use("/", Auth);
app.use("/", Post);

// app.get("/", (req, res) => {
//   res.json({ message: "Merhaba Dünya!" });
// });

const PORT = process.env.PORT || 5000;

db();

app.listen(5000, () => {
  console.log(`server is running on port: ${PORT}`);
});

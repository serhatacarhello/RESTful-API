// mongodb congfiguration

const mongoose = require("mongoose");

const db = () => {
  // mongoyu bağlayan url  promise doner

  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongoDB connected");
    })
    .catch((err) => {
      //   throw new Error(err.message);
      console.log("err", err);
    });
};

module.exports = db;

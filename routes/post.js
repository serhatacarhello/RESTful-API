const express = require("express");
const {
  getPosts,
  createPost,
  getDetail,
  updatePost,
  deletePost,
  searchPost,
} = require("../controllers/post.js");
const auth = require("../middleware/auth.js");

const router = express.Router();
// router.http_method("path", controller_func)
router.get("/getPosts", getPosts);
router.post("/createPost", auth, createPost);
router.get("/getDetail/:id", getDetail);
router.patch("/updatePost/:id", auth, updatePost);
router.delete("/deletePost/:id", auth, deletePost);
router.get("/searchPost", searchPost);

module.exports = router;

const Post = require("../models/post.js");

const createPost = async (req, res) => {
  try {
    // take req.body and create a new post according to Post model
    const newPost = await Post.create(req.body);
    console.log("🚀 ~ file: post.js:9 ~ createPost ~ savedData:", newPost);
    // and send it as res
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    // finds all post because no_parameter_in_find_method Post.find()
    const posts = await Post.find();
    // and send it as res
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDetail = async (req, res) => {
  //find post according to post id as sent in req.params
  try {
    const { id } = req.params;
    const postDetail = await Post.findById(id);
    res.status(201).json(postDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    // {new:true} it returns new post after update was applied
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndRemove(id);
    res.status(201).json(deletedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchPost = async (req, res) => {
  try {
    const { search, tag } = req.query;
    const title = new RegExp(search, "i");

    const posts = await Post.find({
      $or: [{ title }],
      tag: { $in: tag.split(",") },
    });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "Sonuc bulunamadı." });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getDetail,
  updatePost,
  deletePost,
  searchPost,
};

const express = require('express');
const Posts = require('../models/passengers');

const router = express.Router();

//save posts
router.post('/passenger/save', async (req, res) => {
    try {
      let newPost = new Posts(req.body);
      await newPost.save();
      return res.status(200).json({
        success: "Post saved successfully",
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  });


//get post 
router.get('/passengers', async (req, res) => {
    try {
      const posts = await Posts.find();
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  });

// get specific post
router.get("/passenger/:id", async (req, res) => {
    try {
      const postId = req.params.id;
      console.log("postId:", postId);
      const post = await Posts.findById(postId).exec();
  
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
  
      return res.status(200).json({
        success: true,
        post
      });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  });
  
  

// delete post
router.delete('/passenger/delete/:id', async (req, res) => {
    try {
      const deletedPost = await Posts.findOneAndDelete({ _id: req.params.id });
      if (!deletedPost) {
        return res.status(404).json({
          message: 'Post not found',
        });
      }
      return res.json({
        message: 'Delete successful',
        deletedPost,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Delete unsuccessful',
        error: error.message,
      });
    }
  });
  
module.exports = router;
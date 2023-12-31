const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middlewares/check-auth");
const extractFile = require("../middlewares/file");
const PostController = require("../controllers/post");

router.post("", checkAuth, extractFile, PostController.createPost);

router.put("/:id", checkAuth, extractFile, PostController.updatePost);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPostById);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;

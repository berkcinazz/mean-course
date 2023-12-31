const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const checkAuth = require("../middlewares/check-auth");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const PostController = require("../controllers/post");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
    const extension = MIME_TYPE_MAP[file.mimetype];
    const createdFileName = `${name}-${Date.now()}.${extension}`;
    cb(null, createdFileName);
  },
});

router.post("", checkAuth, multer({ storage: storage }).single("image"), PostController.createPost);

router.put("/:id", checkAuth, multer({ storage: storage }).single("image"), PostController.updatePost);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPostById);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;

import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import { createPost, getPosts, likePost, likeReply } from "../controllers/postController.js";
import Post from "../models/Post.js";

const router = express.Router();


// ✅ MULTER CONFIG HERE
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ CREATE POST ROUTE
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const post = await Post.create({
      user: req.user._id,
      text: req.body.text,
      isPrivate: req.body.isPrivate,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({ msg: "Error creating post" });
  }
});

router.post("/:id/comment", protect, async (req, res) => {
  const post = await Post.findById(req.params.id);

  const newComment = {
    user: req.user._id,
    text: req.body.text,
    likes: [],
    replies: [],
  };

  post.comments.push(newComment);
  await post.save();

  const updatedPost = await Post.findById(post._id)
    .populate("user comments.user comments.replies.user");

  res.json(updatedPost);
});

router.put("/:postId/comment/:commentId/like", protect, async (req, res) => {
  const post = await Post.findById(req.params.postId);

  const comment = post.comments.id(req.params.commentId);

  const userId = req.user._id;

  if (comment.likes.includes(userId)) {
    comment.likes.pull(userId);
  } else {
    comment.likes.push(userId);
  }

  await post.save();

  const updatedPost = await Post.findById(post._id)
    .populate("user comments.user comments.replies.user");

  res.json(updatedPost);
});

router.post("/:postId/comment/:commentId/reply", protect, async (req, res) => {
  const post = await Post.findById(req.params.postId);

  const comment = post.comments.id(req.params.commentId);

  comment.replies.push({
    user: req.user._id,
    text: req.body.text,
    likes: [],
  });

  await post.save();

  const updatedPost = await Post.findById(post._id)
    .populate("user comments.user comments.replies.user");

  res.json(updatedPost);
});

router.put("/:postId/comment/:commentId/reply/:replyId/like", protect, async (req, res) => {
  const post = await Post.findById(req.params.postId);

  const comment = post.comments.id(req.params.commentId);
  const reply = comment.replies.id(req.params.replyId);

  const userId = req.user._id;

  if (reply.likes.includes(userId)) {
    reply.likes.pull(userId);
  } else {
    reply.likes.push(userId);
  }

  await post.save();

  const updatedPost = await Post.findById(post._id)
    .populate("user comments.user comments.replies.user");

  res.json(updatedPost);
});

router.put("/:postId/comment/:commentId", protect, async (req, res) => {
  const { text } = req.body;

  const post = await Post.findById(req.params.postId);
  const comment = post.comments.id(req.params.commentId);

  if (!comment || !comment.user) {
  return res.status(404).json({ msg: "Comment not found" });
}

if (String(comment.user) !== String(req.user._id)) {
  return res.status(403).json({ msg: "Unauthorized" });
}

  comment.text = text;

  await post.save();

  const updatedPost = await Post.findById(post._id)
    .populate("user comments.user comments.replies.user");

  res.json(updatedPost);
});

router.delete("/:postId/comment/:commentId", protect, async (req, res) => {
  const post = await Post.findById(req.params.postId);
  const comment = post.comments.id(req.params.commentId);

  if (!comment || !comment.user) {
  return res.status(404).json({ msg: "Comment not found" });
}

if (String(comment.user) !== String(req.user._id)) {
  return res.status(403).json({ msg: "Unauthorized" });
}

  comment.deleteOne();

  await post.save();

  const updatedPost = await Post.findById(post._id)
    .populate("user comments.user comments.replies.user");

  res.json(updatedPost);
});

router.put(
  "/:postId/comment/:commentId/reply/:replyId/like",
  protect,
  likeReply
);

router.post("/", protect, createPost);
router.get("/", protect, getPosts);
router.put("/:id/like", protect, likePost);

export default router;
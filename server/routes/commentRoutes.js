import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addComment, replyComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", protect, addComment);
router.post("/:id/reply", protect, replyComment);

router.get("/:postId", protect, async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", "firstName");

  res.json(comments);
});

export default router;
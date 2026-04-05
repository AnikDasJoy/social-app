import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  const comment = await Comment.create({
    post: req.body.postId,
    user: req.user,
    text: req.body.text
  });

  res.json(comment);
};

export const replyComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  comment.replies.push({
    user: req.user,
    text: req.body.text
  });

  await comment.save();
  res.json(comment);
};
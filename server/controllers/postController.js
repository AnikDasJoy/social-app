import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const post = await Post.create({
    user: req.user,
    text: req.body.text,
    image: req.body.image,
    isPrivate: req.body.isPrivate
  });

  res.json(post);
};

export const getPosts = async (req, res) => {
  const userId = req.user._id.toString();

  const posts = await Post.find({
    $or: [
      { isPrivate: false }, // public
      { user: userId }      // only owner
    ]
  })
  .sort({ createdAt: -1 })
  .populate("user", "firstName lastName")
  .populate("likes", "firstName lastName") // ✅ post likes
  .populate("comments.user", "firstName lastName")
  .populate("comments.likes", "firstName lastName") // ✅ comment likes
  .populate("comments.replies.user", "firstName lastName")
  .populate("comments.replies.likes", "firstName lastName"); // ✅ reply likes

  res.json(posts);
};

// export const likePost = async (req, res) => {
//   let post = await Post.findById(req.params.id);

//   if (post.likes.includes(req.user.toString())) {
//     post.likes.pull(req.user);
//   } else {
//     post.likes.push(req.user._id);
//   }

//   await post.save();

//   // ✅ RETURN POPULATED POST
//   post = await Post.findById(post._id)
//     .populate("user", "firstName lastName")
//     .populate("likes", "firstName lastName")
//     .populate("comments.user", "firstName lastName")
//     .populate("comments.likes", "firstName lastName")
//     .populate("comments.replies.user", "firstName lastName")
//     .populate("comments.replies.likes", "firstName lastName");

//   res.json(post);
// };

// export const likeReply = async (req, res) => {

//   const { postId, commentId, replyId } = req.params;

//   const post = await Post.findById(postId);

//   if (!post) return res.status(404).json({ msg: "Post not found" });

//   const comment = post.comments.id(commentId);
//   if (!comment) return res.status(404).json({ msg: "Comment not found" });

//   const reply = comment.replies.id(replyId);
//   if (!reply) return res.status(404).json({ msg: "Reply not found" });

//   const userId = req.user.toString();

//   // ✅ Toggle Like
//   if (reply.likes.includes(userId)) {
//     reply.likes.pull(userId);
//   } else {
//     reply.likes.push(userId);
//   }

//   await post.save();

//   // ✅ Return populated post (VERY IMPORTANT)
//   const updatedPost = await Post.findById(postId)
//     .populate("user", "firstName lastName")
//     .populate("likes", "firstName lastName")
//     .populate("comments.user", "firstName lastName")
//     .populate("comments.likes", "firstName lastName")
//     .populate("comments.replies.user", "firstName lastName")
//     .populate("comments.replies.likes", "firstName lastName");

//   res.json(updatedPost);
// };


export const likeReply = async (req, res) => {
  const post = await Post.findById(req.params.postId);

  const comment = post.comments.id(req.params.commentId);
  const reply = comment.replies.id(req.params.replyId);

  if (reply.likes.includes(req.user._id)) {
    reply.likes.pull(req.user._id);
  } else {
    reply.likes.push(req.user._id);
  }

  await post.save();

  const updatedPost = await Post.findById(post._id)
    .populate("user", "firstName lastName")
    .populate("likes", "firstName lastName")
    .populate("comments.user", "firstName lastName")
    .populate("comments.likes", "firstName lastName")
    .populate("comments.replies.user", "firstName lastName")
    .populate("comments.replies.likes", "firstName lastName");

  res.json(updatedPost);
};

export const likeComment = async (req, res) => {
  const post = await Post.findById(req.params.postId);

  const comment = post.comments.id(req.params.commentId);

  if (comment.likes.includes(req.user._id)) {
    comment.likes.pull(req.user._id);
  } else {
    comment.likes.push(req.user._id);
  }

  await post.save();

  const updatedPost = await Post.findById(post._id)
    .populate("user", "firstName lastName")
    .populate("likes", "firstName lastName")
    .populate("comments.user", "firstName lastName")
    .populate("comments.likes", "firstName lastName")
    .populate("comments.replies.user", "firstName lastName")
    .populate("comments.replies.likes", "firstName lastName");

  res.json(updatedPost);
};

export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.likes.includes(req.user._id)) {
    post.likes.pull(req.user._id);
  } else {
    post.likes.push(req.user._id);
  }

  await post.save();

  const updatedPost = await Post.findById(post._id)
    .populate("user", "firstName lastName")
    .populate("likes", "firstName lastName")
    .populate("comments.user", "firstName lastName")
    .populate("comments.likes", "firstName lastName")
    .populate("comments.replies.user", "firstName lastName")
    .populate("comments.replies.likes", "firstName lastName");

  res.json(updatedPost);
};
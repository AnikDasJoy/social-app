import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  replies: [replySchema]
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);
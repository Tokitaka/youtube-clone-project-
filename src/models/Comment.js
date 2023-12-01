import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
	text: {type: String, required: true },
	owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"User" },
	videoId: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"Video" },
	createdAt: {type: Data, required: true, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
		title: String, 
		description: String,
		hashtags: [{type: String}],  
		createdAt: Date,
		meta: {
			views: Number,
			rating: Number,
		},
});

const Video = mongoose.model("video",videoSchema);

export default Video;
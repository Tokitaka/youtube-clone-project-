import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
		title: {type: String, required: true}, 
		description: String,
		hashtags: [{type: String}],  
		createdAt: {type: Date, required: true},
		meta: {
			views: Number,
			rating: Number,
		},
});

const Video = mongoose.model("video",videoSchema);

export default Video;
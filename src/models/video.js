import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
		title: {type: String, required: true, uppercase: true, trim:true, maxLength:80}, 
		description: {type: String, required: true, lowercase:true, trim:true, minLength:20},
		hashtags: [{type: String, trim:true}],  
		createdAt: {type: Date, required: true, default: Date.now},
		meta: {
			views: {type: Number, required: true, default: 0},
			rating: {type: Number, required: true, default: 0},
		},
});

const Video = mongoose.model("video",videoSchema);

export default Video;
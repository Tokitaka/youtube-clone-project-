import mongoose from "mongoose";

// export const formatHashtags = (hashtags) => 
// 	hashtags.split(",").map(word => word.startsWith("#") ? word : `#${word})`);

const videoSchema = new mongoose.Schema({
		fileUrl: {type: String, required: true},
		title: {type: String, required: true, uppercase: true, trim:true, maxLength:80}, 
		description: {type: String, required: true, lowercase:true, trim:true, minLength:20},
		hashtags: [{type: String, trim:true}],  
		createdAt: {type: Date, required: true, default: Date.now},
		meta: {
			views: {type: Number, required: true, default: 0},
			rating: {type: Number, required: true, default: 0},
		},
});

// videoSchema.pre("save", async function(){
// 	this.hashtags = this.hashtags[0].split(",").map(word => word.startsWith("#") ? word : `#${word})`);
// })

videoSchema.static("formatHashtags", (hashtags) => 
	hashtags.split(",").map(word => word.startsWith("#") ? word : `#${word})`));

const Video = mongoose.model("video",videoSchema);

export default Video;
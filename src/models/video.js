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
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email:{type: String, required: true, unique:true},
    socialOnly: {type:Boolean, default:false}, // github login 여부
    username:{type: String, required: true, unique:true},
    password:{type:String},
    name:{type:String, required: true},
    location:String,
    avatarUrl: String, 
});

userSchema.pre("save", async function(){
	this.password = await bcrypt.hash(this.password, 5);
});
const User = mongoose.model("user", userSchema);
export default User;
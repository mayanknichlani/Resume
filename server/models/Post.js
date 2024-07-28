import mongoose from "mongoose";
const postSchema = mongoose.Schema({
    userID:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:String,
    picturePath:{
        type:String,
        required:true
    },
    userPicturePath:String,
    likes:{
        type:Map,
        of:Boolean
    },
    comments:{
        type:Array,
        default:[],
    }
},{timestamps:true}
);
const Post = mongoose.model("Post",postSchema);
export default Post;
import Post from "../models/Post.js";
import User from "../models/User.js";

//create
export const createPost = async(req,res,)=>{
    try{
        const {userID,description,picturePath} = req.body;
        const user = User.findById(userID);
        const newPost = new Post({
            userID,
            description,
            picturePath,
            userPicturePath:user.picturePath,
            likes:{},
            comments:[]
        })
        await newPost.save();
        const post = await Post.find();
        res.status(201).json(post);
    }
    catch(err){
        res.status(409).json({message:err.message});
    }
}

//Read
export const getFeedPosts = async (req, res) => {
    try {
        // Fetch posts sorted by creation date in descending order and limit the number of posts
        const posts = await Post.find().sort({ createdAt: -1 }).limit(20);
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userID } = req.params;
        // Fetch posts for the specific user
        const posts = await Post.find({ userID }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

//Update
export const likePost = async(req,res)=>{
    try{
        const {id} = req.params;
        const {userID} = req.body;
        const post = await Post.findById(id);
        const isLiked = await post.likes.get(userID);
        if(isLiked){
            post.likes.delete(userID);
        }
        else{
            post.likes.set(userID,true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes:post.likes},
            {new:true}
        );
        res.status(200).json(updatedPost);
    }
    catch(err){
        res.status(408).json({message:err.message});
    }
}
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            min:8
        },
        picturePath:{
            type:String,
            default:"",
        },
        friends:{
            type:Array,
            default:[]
        },
        location:String,
        Occupation:String,
        viewedProfile:Number,
        impressions:Number
    },{
        timestamps:true
    }
);

const User = mongoose.model("User",UserSchema);
export default User;
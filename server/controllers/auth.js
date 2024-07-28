import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, picturePath } = req.body;

        if (!username) {
            return res.status(400).json({ success: false, error: 'Username is required' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            picturePath,
        });

        const savedUser = await newUser.save();
        res.status(201).json({ success: true, user: savedUser });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

//LOGIN IN
export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user)return res.status(400).json({msg:"User does not Exists! "});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)return res.status(400).json({msg:"Invalid Credentials "});
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token,user});
        
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
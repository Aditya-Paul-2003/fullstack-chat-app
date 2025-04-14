
import { generateToken } from "../lib/utils.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";


export const signup = async(req, res) => {
    // res.send ("signup route")
    const { fullName, email, password } = req.body;
    try{

        if(!fullName || !email || !password){

            return res.status(400).json({ message: "All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 charecters"});
        }

        const user = await User.findOne({email});

        if(user)return res.status(400).json({ message: "Email already in use"})

        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser= new User({
            fullName,
            email,
            password: hashedPassword,
        })
        if(newUser){
            //generate JWT token here
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });//significance of 201

        }else {
            res.status(400).jdon({ message: "Invalid user data"}); 
        }

    }catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    } 
};

export const login = (req, res) => {
    res.send ("login route")
};

export const logout = (req, res) => {
    res.send ("logout route")
}; 
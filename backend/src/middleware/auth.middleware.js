import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const protectRoute = async (req, res, next )=>{
    try {
        const token =req.cookies.jwt;

        if(!token){
            return res.status(401).json({message: "Not authorized to access this route - No token Provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("JWT_SECRET:", process.env.JWT_SECRET);
        
        if(!decoded){
            return res.status(401).json({message: "Not authorized to access this route - Invalid Token"});
        }
        
        const user = await User.findById(decoded.userId).select("-password")
        
        
        // console.log('user:', user);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        req.user = user;

        next();



    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({message: "Internal Server Mdware Error"});
    }
};


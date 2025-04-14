import jwt from "jsonwebtoken";
//package that will allow JWT to verify the token


export const generateToken=(userId, res) =>{
    //this will help us to generate a token with the user id

    const token = jwt.sign({userId}, process.env.JWT_SECRECT, {
        
        expiresIn:"7d",

    }); // this will sign the token with the user id and the secret key and it will expire in 7 days

    res.cookie("jwt",token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,  // this helps in setting the cookie with the token and it will expire in 7 days

        httpOnly: true, // this will prevent XSS attack cross-site scripting attacks i.e. prevents the token from being accessed by the client side code
        
        samSite: "strict", //sameSite helps in preventing CSRF attacks cross-site request forgery attacks i.e. prevents the token from being accessed by

        secure: process.env.NODE_ENV !== "development" // this will prevent the token from being accessed by the client side code if the environment is not development
    });   
    //in brief this will set the cookie with the token and it will expire in 7 days and it will prevent XSS, CSRF attacks and it will prevent the token from being accessed by the client side code if the environment is not development.

    return token;
};
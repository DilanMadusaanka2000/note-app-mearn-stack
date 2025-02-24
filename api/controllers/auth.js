import User from '../models/User.js';


import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


//register function

export const register = async (req, res) => {


    try {

        const { name, email, password } = req.body;

        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({message: "User already exists"})
        }

       const hashedPassword = await bcrypt.hash(password, 12); //hashing password
      
        const newUser = new User({name, email, password: hashedPassword}); //create new user

        await newUser.save();

        res.status(200).json({success:true, message: "User created"}) //return success message
    } catch (error) {
       console.log(error); 
    }


};


//login function

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email
        });

        if(!user){

            return res.status(4001).json({message: "User not found"})
        }


        const hashedPassword = await bcrypt.compare(password, user.password);
        if(!hashedPassword){
            return res.status(400).json({message: "Invalid credentials"})  //if password is not matched
        }

        const token = jwt.sign({email: user.email, id: user._id}, "scretkeyofnotepadapp@123#", {expiresIn: "5h"});
        return res.status(200).json({ success:true,token, user:{name:user.name}, message: "Login successful"})  //return token and user name

    } catch (error) {

        return res.status(500).json({message: "Internal server error"})
        
    }

     
}
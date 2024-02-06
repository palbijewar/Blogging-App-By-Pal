import users from '../models/User.mdel.js';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const createUser = async (req,res,next) => {
       try {
         const { username, email, password } = req.body;
         if (!username || !email || !password) {
            next(errorHandler(400,"All fields are required"))
         }
         if(password.length<8){
            next(errorHandler(400,"Password must be of 8 charaters or more"))
         }
         const hashedPassword = bcrypt.hashSync(password,10);
         const newUser = await users.create({ username, email, password:hashedPassword });
         return res.status(201).json(newUser);
       } catch (error) {
        next(error)
       }
};

export const loginUser = async (req, res, next) => {
 try {
     const {email, password} = req.body;
     if (!email || !password) {
      return next(errorHandler(400,"All fields are required"))
     }
     const validUser = await users.findOne({email:email})
     if (!validUser) {
      return next(errorHandler(404,"User not valid!"))
     }
     const validPassword = bcrypt.compareSync(password, validUser.password);
     if (!validPassword) {
      return next(errorHandler(400,"Invalid Email Or Password"))
     }
     const token =  jwt.sign({ id : validUser._id }, process.env.JWT_SECRET,
     { expiresIn : '1h' }
     )
     res.status(200).cookie('access_token', token, {
      httpOnly : true}).json(validUser);
 } catch (error) {
   next(error)
 }
}

export const google = async (req,res,next) => {
  try {
    const {email, name, googlePhotoUrl} = req.body;
    const user = await users.findOne({email});
    if(user){
      const token =  jwt.sign({ id : validUser._id }, process.env.JWT_SECRET,
        { expiresIn : '1h' }
        )
      res.status(200).cookie('access_token', token, {
          httpOnly : true}).json(validUser);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hash(generatedPassword, 10);
    const user = new users({
        username : name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        password : hashedPassword,
        email ,
        profile_picture : googlePhotoUrl
      })
      const token =  jwt.sign({ id : user._id }, process.env.JWT_SECRET,
        { expiresIn : '1h' }
        )
      res.status(200).cookie('access_token', token, {
          httpOnly : true}).json(user);
    }
  } catch (error) {
    next(error)
  }
}
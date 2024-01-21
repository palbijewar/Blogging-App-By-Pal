import users from '../models/User.mdel.js';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js';

const createUsers = async (req,res,next) => {
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



export {
    createUsers
}

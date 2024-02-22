import { errorHandler } from "../utils/error"
import posts from '../models/Post.model.js';

export const createPost = async (req,res,next) => {
 if(!req.user.is_admin){
    return next(errorHandler(403, 'You are not allowed to create a post'))
 }
 if(!req.body.title || !req.body.content){
    return next(errorHandler(400, 'YPlease provide all required fields'))
 }
 const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z-0-9-]/g, '-');
 const newPost = new posts({
    ...req.body,
    slug,
    user_id: req.user.id,
 });
 try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
 } catch (error) {
    next(error)
 }
};
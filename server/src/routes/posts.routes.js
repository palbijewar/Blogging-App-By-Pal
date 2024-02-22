import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {createPost} from '../controllers/post.controllers.js'

const router = express.Router();

router.post('/', verifyToken, createPost);


export default router;
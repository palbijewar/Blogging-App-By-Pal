import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {createComment, getComments} from '../controllers/comments.controllers.js';

const router = express.Router();

router.post('/', verifyToken, createComment);

router.get('/:postId', getComments);

export default router; 
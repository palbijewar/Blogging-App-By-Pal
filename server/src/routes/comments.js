import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {createComment, getComments, likeComment, editComment} from '../controllers/comments.controllers.js';

const router = express.Router();

router.post('/', verifyToken, createComment);

router.get('/:postId', getComments);
;
router.put('/like/:commentId', verifyToken, likeComment);
router.put('/edit/:commentId', verifyToken, editComment);

export default router; 
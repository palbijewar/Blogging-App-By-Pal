import express from 'express';
import { createUser, loginUser, google, updateUserProfile } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.post("/google", google);

router.put("/:id", verifyToken, updateUserProfile);

export default router;

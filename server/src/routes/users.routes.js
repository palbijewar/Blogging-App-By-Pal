import express from 'express';
import { createUser, loginUser, google, updateUserProfile, deleteUser, signoutUser } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.post("/google", google);
router.post("/signout", signoutUser);

router.put("/:id", verifyToken, updateUserProfile);

router.delete("/:id", verifyToken, deleteUser);

export default router;

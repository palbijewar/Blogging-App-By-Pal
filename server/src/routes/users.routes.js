import express from 'express';
import { createUser, loginUser, google } from '../controllers/user.controllers.js';

const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.post("/google", google);

export default router;

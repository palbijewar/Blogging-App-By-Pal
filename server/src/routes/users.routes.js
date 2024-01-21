import express from 'express';
import { createUsers } from '../controllers/user.controllers.js';

const router = express.Router();

router.post("/", createUsers);

export default router;

import express from 'express';
const authRouter = express.Router();

import {
    getCurrentUser,
    login,
    logout,
    register,
} from '../controllers/auth.controller.js';
import requireAuth from '../middlewares/requireAuth.js';

authRouter.get('/', requireAuth, getCurrentUser);
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

export default authRouter;

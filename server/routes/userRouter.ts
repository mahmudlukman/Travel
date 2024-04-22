import { Router } from 'express';
import { getUserInfo, login, logout, register } from '../controllers/user';
import { isAuthenticated } from '../middleware/auth';

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.get('/me', isAuthenticated, getUserInfo);

export default userRouter;

import { Router } from 'express';
import { login, logout, register } from '../controllers/user';

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);

export default userRouter;

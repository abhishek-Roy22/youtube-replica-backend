import express from 'express';
import {
  createUser,
  loginUser,
  logoutUser,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', logoutUser);

export default userRouter;

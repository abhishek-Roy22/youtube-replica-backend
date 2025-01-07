import { Router } from 'express';
import {
  createComment,
  deleteComment,
} from '../controllers/commentController.js';

const commentRouter = Router();

commentRouter.post('/comment', createComment);
commentRouter.delete('/comment', deleteComment);

export default commentRouter;

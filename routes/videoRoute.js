import express from 'express';
import {
  createVideo,
  deleteVideo,
  getVideos,
  updateVideo,
} from '../controllers/videoController.js';

const videoRouter = express.Router();

videoRouter.post('/video', createVideo);
videoRouter.get('/videos', getVideos);
videoRouter.put('/video', updateVideo);
videoRouter.delete('/video', deleteVideo);

export default videoRouter;

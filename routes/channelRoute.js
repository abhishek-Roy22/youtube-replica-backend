import express from 'express';
import {
  createChannel,
  getChannel,
  updateChannel,
  deleteChannel,
} from '../controllers/channelController.js';

const channelRouter = express.Router();

channelRouter.get('/get-channel', getChannel);
channelRouter.post('/create-channel', createChannel);
channelRouter.put('/update-channel', updateChannel);
channelRouter.delete('/delete-channel', deleteChannel);

export default channelRouter;

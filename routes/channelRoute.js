import express from 'express';
import { createChannel } from '../controllers/channelController.js';

const channelRouter = express.Router();

channelRouter.post('/create-channel', createChannel);

export default channelRouter;
